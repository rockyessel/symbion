import { cookieSetter } from '@/lib/_actions/helpers';
import { decrypt } from '@/lib/utils/helpers';
import { decodeJWT } from 'did-jwt';

const jsonResponse = (
  success: boolean,
  message: string,
  payload: any = null,
  status: number = 400
) => {
  return new Response(JSON.stringify({ success, message, payload }), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const POST = async (request: Request) => {
  try {
    // Parse form data from the request
    const formData = await request.formData();
    // const file = formData.get('file') as File | null;
    // const password = formData.get('password') as string | null;
    // const address = formData.get('address') as string | null;

    console.log('FormData received:', formData);
    // console.log('file:', file);
    // console.log('password:', password);
    // console.log('address:', address);

    // Successful validation response
    return jsonResponse(
      true,
      'Validation was successful.',
      { good: 'data' },
      200
    );

    // // Validate the presence of required form data
    // if (!file) return jsonResponse(false, 'No file was provided.', null, 404);
    // if (!password) return jsonResponse(false, 'No SignerKey was provided.', null, 404);
    // if (!address) return jsonResponse(false, 'No address was provided. Please connect to a wallet.', null, 404);

    // // Read text from the file
    // let encryptedToken;
    // try {
    //   encryptedToken = await file.text();
    // } catch (readError) {
    //   console.error('Error reading file:', readError);
    //   return jsonResponse(false, 'Failed to read the provided file.', null, 400);
    // }
    // console.log('encryptedToken:', encryptedToken);

    // // Temporarily store the `encryptedToken` in a cookie
    // try {
    //   await cookieSetter('etx', encryptedToken);
    // } catch (cookieError) {
    //   console.error('Error setting cookie:', cookieError);
    //   return jsonResponse(false, 'Failed to set authentication cookie.', null, 500);
    // }

    // // Decrypt the token using the provided password
    // let jwtVp;
    // try {
    //   jwtVp = decrypt(encryptedToken, password);
    // } catch (decryptError) {
    //   console.error('Error decrypting token:', decryptError);
    //   return jsonResponse(false, 'Failed to decrypt the token. Invalid SignerKey.', null, 400);
    // }

    // if (!jwtVp) {
    //   return jsonResponse(false, 'DID verification failed. Make sure you are using the right file and SignerKey.', null, 400);
    // }

    // // Decode the JWT to verify its payload
    // let decodedVp, jwtVc, decodedVc, userId, userAddress;
    // try {
    //   decodedVp = decodeJWT(jwtVp);
    //   jwtVc = decodedVp.payload.vp.verifiableCredential[0];
    //   decodedVc = decodeJWT(jwtVc);
    //   userId = decodedVc.payload.vc.credentialSubject.id;
    //   userAddress = userId.split(':').pop();
    // } catch (decodeError) {
    //   console.error('Error decoding JWT:', decodeError);
    //   return jsonResponse(false, 'Failed to decode the JWT.', null, 400);
    // }

    // if (userAddress !== address) {
    //   return jsonResponse(false, 'DID verification failed. Invalid address.', null, 400);
    // }

    // // Successful validation response
    // return jsonResponse(
    //   true,
    //   'Validation was successful.',
    //   { jwtVc, jwtVp, etx: encryptedToken },
    //   200
    // );
  } catch (error) {
    console.error('Unexpected error:', error);
    return jsonResponse(
      false,
      'Something went wrong. Internal error.',
      null,
      500
    );
  }
};
