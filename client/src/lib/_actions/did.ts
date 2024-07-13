'use server';

import bcrypt from 'bcrypt';
import { verifyCredential, verifyPresentation } from 'did-jwt-vc';
import { Resolver } from 'did-resolver';
import { getResolver } from 'web-did-resolver';
import { IDIDCredentials, IUserProps } from '@/types';
import { authOptions } from '../auth/options';
import { getServerSession } from 'next-auth';
import { cookieGetter, cookieRemover, cookieSetter } from './helpers';
import { AdapterUser } from 'next-auth/adapters';
import { Account, Profile, Session, User } from 'next-auth';
import { decrypt, domainURL, generatedValues } from '../utils/helpers';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';

/**
 * Retrieves the user from the server session.
 * @returns A promise that resolves to the user properties or null if the user is not found.
 */
export const getServerUser = async (): Promise<IUserProps | null> => {
  // Retrieve the session using auth options
  const session = (await getServerSession(authOptions)) as {
    expires: string;
    user: IUserProps;
  };

  if (!session) return null;

  // Extract user from the session
  const user = { ...session.user };

  // Return the user
  return user;
};

/**
 * Generates a hashed string using bcrypt.
 * @param value - The string to be hashed.
 * @returns A promise that resolves to the hashed string.
 */
export const salt = async (value: string): Promise<string> => {
  try {
    // Generate a salt
    const saltRounds = Number(process.env.SALT_ROUNDS);
    const salt = await bcrypt.genSalt(saltRounds);

    // Generate the hash using the salt and input string
    const hash = await bcrypt.hash(value, salt);

    return hash;
  } catch (error) {
    // Handle error if bcrypt operation fails
    console.error('Error generating hash:', error);
    throw error;
  }
};

/**
 * Validates a file and its signer by uploading it to the API.
 * @param formData - Form data containing the file to be uploaded.
 * @returns A promise that resolves to the uploaded file data or error response data.
 */
export const validateFileAndSigner = async (formData: FormData) => {
  try {
    // Construct the API path
    const path = domainURL('/api/auth/did/validate');
    const response = await axios.post(path, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('response: ', response);

    // Return response data if the status code is 200
    if (response.status === 200) {
      return response.data;
    }

    // Return the response data for non-200 status codes (e.g., validation errors)
    return response.data;
  } catch (error) {
    // Check if error is an AxiosError
    if (axios.isAxiosError(error)) {
      // Extract the response data from the Axios error object
      if (error.response) {
        console.log('Error response data:', error.response.data);
        return error.response.data;
      } else if (error.request) {
        // The request was made but no response was received
        console.log('No response received:', error.request);
        return { error: 'No response received from server.' };
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log('Error setting up request:', error.message);
        return { error: error.message };
      }
    } else {
      // If error is not an AxiosError, handle it as a generic error
      console.log('Unknown error:', error);
      return { error: 'An unknown error occurred.' };
    }
  }
};

/**
 * Verifies the given Verifiable Credential (VC) and Verifiable Presentation (VP).
 * @param jwtVc - JWT of the Verifiable Credential.
 * @param jwtVp - JWT of the Verifiable Presentation.
 * @param etx - An external token to be included in the response.
 * @returns A promise that resolves to the verification result.
 */
export const verifyVcNVp = async (
  jwtVc: string,
  jwtVp: string,
  etx: string
) => {
  // Initialize the resolver
  const resolver = new Resolver(getResolver());

  // Verify the credential and presentation
  const verifiedVC = await verifyCredential(jwtVc, resolver);
  const verifiedVP = await verifyPresentation(jwtVp, resolver);

  // Check if both the VC and VP are verified
  if (!verifiedVC.verified || !verifiedVP.verified) {
    return { payload: null, success: false, msg: 'Token Verification failed.' };
  }

  // Extract the credential subject from the verified VC
  const credentialSubject = verifiedVC.payload.vc.credentialSubject;

  console.log('credentialSubject: ', credentialSubject);

  // Create a user object including the external token
  const user = { ...credentialSubject, token: etx };

  return user;
};

/**
 * Creates a Decentralized Identifier (DID).
 * @param props - Partial properties of IDIDCredentials.
 * @returns A promise that resolves to the encrypted payload.
 */
export const createDID = async (props: Partial<IDIDCredentials>) => {
  // Construct the API path
  const path = domainURL(`/api/auth/did`);
  const response = await axios.post(path, { ...props });
  const encryptedPayload = response.data.payload;

  console.log('encryptedPayload" ', encryptedPayload);
  return encryptedPayload;
};

/**
 * Creates and validates a credential handle.
 * @param props - Partial properties of IDIDCredentials.
 * @returns A promise that resolves to an object containing JWTs and external token.
 */
export const createNValidate = async (props: Partial<IDIDCredentials>) => {
  const { address, password } = props;
  const encryptedPayload = await createDID({ ...props });

  console.log('encryptedPayload" ', encryptedPayload);

  // Create a file with the encrypted payload
  const file = new File([encryptedPayload], `${generatedValues()}.did`, {
    type: 'application/octet-stream',
  });
  const formData = new FormData();
  formData.set('file', file);
  formData.set('password', password!);
  formData.set('address', address!);

  console.log('formData: ', formData);

  // Validate the file and signer
  const validatedResponse = await validateFileAndSigner(formData);
  console.log('validatedResponse: ', validatedResponse);

  const { jwtVc, jwtVp, etx } = validatedResponse.payload;
  return { jwtVc, jwtVp, etx };
};

/**
 * Handles user profile updates for GitHub OAuth.
 * @param profile - User profile from GitHub.
 * @param user - User object from next-auth.
 * @returns A promise that resolves to the updated user object.
 */
const githubUserHandler = async (profile: Profile, user: User) => {
  if ('login' in profile && 'location' in profile && 'bio' in profile) {
    const { email, image, name } = user;
    const updateUser: any = {
      bio: String(profile.bio),
      name: name!,
      email: email!,
      image: image!,
      source: 'Github',
    };
    return updateUser;
  }
};

/**
 * Handles default user profile updates.
 * @param user - User object from next-auth.
 * @returns A promise that resolves to the updated user object.
 */
const defaultUserHandler = async (user: User) => {
  const { email, image, name } = user;
  const updatedUser: any = {
    name: name!,
    email: email!,
    image: image!,
  };
  return updatedUser;
};

/**
 * Handles user profile updates for Twitter OAuth.
 * @param profile - User profile from Twitter.
 * @param user - User object from next-auth.
 * @returns A promise that resolves to the updated user object.
 */
const twitterUserHandler = async (profile: any, user: any) => {
  const { name, email, image } = user;
  const { description } = profile;
  const updatedUser: any = {
    name,
    email,
    image,
    bio: description,
    source: 'X(formerly Twitter)',
  };
  return updatedUser;
};

/**
 * Handles OAuth sign-in and user profile updates.
 * @param user - User object from next-auth.
 * @param profile - User profile from OAuth provider.
 * @param account - Account object from OAuth provider.
 * @returns A promise that resolves to true upon successful handling.
 */
export const oauthHandle = async (
  user: User | AdapterUser,
  profile: Profile,
  account: Account
) => {
  let userProviderObject: any;
  switch (account.provider) {
    case 'github':
      userProviderObject = await githubUserHandler(profile, user);
      break;
    case 'twitter':
      userProviderObject = await twitterUserHandler(profile, user);
      break;
    default:
      userProviderObject = await defaultUserHandler(user);
      userProviderObject.source = account.provider;
      break;
  }

  const getPassword = await cookieGetter('ptx');

  const decryptedPassword = decrypt(
    String(getPassword?.value),
    String(process.env.SYSTEM_SECRET)
  );

  const getAddress = await cookieGetter('account');
  const encryptedToken = await createDID({
    address: getAddress?.value! as `0x${string}`,
    id: `did:address:${getAddress?.value! as `0x${string}`}`,
    authType: userProviderObject.source,
    password: decryptedPassword,
    ...userProviderObject,
  });

  await cookieSetter('etx', encryptedToken);
  await cookieRemover('ptx');

  return true;
};

/**
 * Modifies the sign-in process to handle different authentication types.
 * @param user - User object from next-auth.
 * @param profile - User profile from OAuth provider.
 * @param account - Account object from OAuth provider.
 * @returns A promise that resolves to true if sign-in is successful.
 */
export const signInModification = async (
  user: User | AdapterUser,
  profile: Profile | undefined,
  account: Account | null
) => {
  // Initial sign-in/login
  if (account) {
    // OAuth Sign-in
    if (profile) {
      await oauthHandle(user, profile, account);
    }
    return true;
  }
  // No Account, then deny access.
  return false;
};

/**
 * Modifies the JWT token with user and account details.
 * @param account - Account object from next-auth.
 * @param token - JWT object from next-auth.
 * @param user - User object from next-auth.
 * @returns A promise that resolves to the modified JWT token.
 */
export const modifyUserJWTToken = async (
  account: Account | null,
  token: JWT,
  user: User | AdapterUser
) => {
  const getAddress = await cookieGetter('account');
  const getEncryptedToken = await cookieGetter('etx');

  // Initial signin
  if (account) {
    const { type } = account;
    if (type === 'oauth') {
      if (getAddress && getEncryptedToken) {
        const updatedToken = {
          ...token,
          id: `did:address:${getAddress.value!}`,
          address: getAddress.value,
          token: getEncryptedToken.value,
        };
        token = { ...updatedToken };
        await cookieRemover('etx');
        return token;
      }
      return token;
    }

    if (type === 'credentials' && getAddress) {
      console.log('user: ', user);
      const updatedToken = {
        ...user,
        picture: user?.image,
        address: getAddress.value,
      };
      await cookieRemover('etx');
      return { ...updatedToken };
    }
  }

  return token;
};

/**
 * Modifies the user session with JWT token details.
 * @param session - Session object from next-auth.
 * @param token - JWT object from next-auth.
 * @returns A promise that resolves to the modified session object.
 */
export const modifyUserSession = async (session: Session, token: JWT) => {
  const { user } = session;

  const { iat, exp, jti, ...props } = token;
  const updatedUserField = { ...props, image: props.picture };

  const updatedSession = { ...updatedUserField };
  session.user = { ...updatedSession };
  return session;
};
