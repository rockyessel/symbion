import { cookieSetter } from '@/lib/_actions/helpers';
import { decrypt } from '@/lib/utils/helpers';
import { decodeJWT } from 'did-jwt';

const jsonResponse = (
  success: boolean,
  message: string,
  payload: any = null,
  status: number = 400
) => {
  return Response.json(
    { success, message, payload },
    {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    const file = data.get('file') as File | null;
    const password = data.get('password') as string | null;
    const address = data.get('address') as string | null;

    if (!file) return jsonResponse(false, 'No file was provided.', null, 404);
    if (!password)
      return jsonResponse(false, 'No SignerKey was provided.', null, 404);
    if (!address)
      return jsonResponse(
        false,
        'No address was provided. Please connect to a wallet.',
        null,
        404
      );

    const encryptedToken = await file.text();

    // Temporary store the `encryptedToken` to the cookie
    await cookieSetter('etx', encryptedToken);

    // Getting the actual token.
    const jwtVp = decrypt(encryptedToken, password);

    if (!jwtVp) {
      return jsonResponse(
        false,
        'DID verification failed. Make sure you are using the right file and SignerKey'
      );
    }

    const decodedVp = decodeJWT(jwtVp);

    const jwtVc = decodedVp.payload.vp.verifiableCredential[0];

    const decodedVc = decodeJWT(jwtVc);

    // `did:address:0x${string}`
    const userId = decodedVc.payload.vc.credentialSubject.id;

    const userAddress = userId.split(':').pop();

    if (userAddress !== address) {
      return jsonResponse(false, 'DID verification failed. Invalid address.');
    }

    return jsonResponse(
      true,
      'Validation was successful.',
      { jwtVc, jwtVp, etx: encryptedToken },
      200
    );
  } catch (error) {
    console.log('error', error);
    return jsonResponse(
      false,
      'Something went wrong. Internal error.',
      null,
      500
    );
  }
};
