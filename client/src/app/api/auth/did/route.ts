import { ES256KSigner, hexToBytes } from 'did-jwt';
import { cookieGetter } from '@/lib/_actions/helpers';
import {
  decrypt,
  encrypt,
  getCredentialSubject,
  getExpirationTime,
  getIssuer,
} from '@/lib/utils/helpers';
import {
  createVerifiableCredentialJwt,
  createVerifiablePresentationJwt,
  JwtPresentationPayload,
} from 'did-jwt-vc';
import { jsonResponse } from './validate/route';

export const POST = async (request: Request) => {
  try {
    const credentials = await request.json();
    // console.log('credentials: ', credentials);
    const locale = await cookieGetter('locale');
    const { password, authType } = credentials;

    let decodePassword: string | null;
    try {
      // Decrypt the password using the system secret
      decodePassword = decrypt(password, String(process.env.SYSTEM_SECRET));
      // console.log('decodePassword: ', decodePassword);
      if (!decodePassword) {
        return jsonResponse(
          false,
          'Failed to decrypt the password. Something went wrong.',
          null,
          400
        );
      }
    } catch (decryptError) {
      console.error('Error decrypting token:', decryptError);
      return jsonResponse(
        false,
        'Failed to decrypt the password. Invalid System Key.',
        null,
        400
      );
    }

    const credentialSubject = getCredentialSubject(credentials);
    const expirationTime = getExpirationTime(7); // 1 week in seconds

    const vcPayload = {
      sub: 'did:web:deconnect.vercel.app',
      nbf: Number(process.env.DID_NBF),
      vc: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiableCredential'],
        credentialSubject,
      },
      exp: expirationTime,
    };

    const issuer = getIssuer();
    const vcJwt = await createVerifiableCredentialJwt(vcPayload, issuer);

    const vpPayload: JwtPresentationPayload = {
      nbf: Number(process.env.DID_NBF),
      exp: expirationTime,
      vp: {
        '@context': ['https://www.w3.org/2018/credentials/v1'],
        type: ['VerifiablePresentation'],
        verifiableCredential: [vcJwt],
        purpose: 'authentication',
        timestamp: Date.now(),
        role: 'user',
        expirationTime,
        language: locale?.value ?? 'en',
        accountType: 'regular',
        signupSource: authType,
        lastLogin: new Date().toISOString(),
        registrationDate: new Date().toISOString(),
      },
    };

    const vpJwt = await createVerifiablePresentationJwt(vpPayload, issuer);
    const encryptedToken = encrypt(vpJwt, decodePassword);

    return new Response(JSON.stringify({ payload: encryptedToken }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: 'Something went wrong. Internal error. ',
        success: false,
        payload: null,
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};
