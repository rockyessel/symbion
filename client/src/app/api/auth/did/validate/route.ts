import { cookieSetter } from '@/lib/_actions/helpers';
import { decrypt } from '@/lib/utils/helpers';
import { decodeJWT } from 'did-jwt';

/**
 * Creates a JSON response.
 * @param {boolean} success - Indicates the success status of the response.
 * @param {string} message - The message to be included in the response.
 * @param {any} [payload=null] - The payload to be included in the response.
 * @param {number} [status=400] - The HTTP status code for the response.
 * @returns {Response} - The constructed response object.
 */
export const jsonResponse = (
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

/**
 * Handles POST requests for validating a DID.
 * @param {Request} request - The incoming request object.
 * @returns {Promise<Response>} - The response object.
 */
export const POST = async (request: Request): Promise<Response> => {
  try {
    // Parse JSON body from the request
    const body = await request.json();

    // console.log('body: ', body);

    const { password, address, e_token } = body;

    // Validate the presence of required fields
    if (!e_token)
      return jsonResponse(false, 'No e_token was found.', null, 404);
    if (!password)
      return jsonResponse(false, 'No SignerKey was provided.', null, 404);
    if (!address)
      return jsonResponse(
        false,
        'No address was provided. Please connect to a wallet.',
        null,
        404
      );

    // Temporarily store the `e_token` in a cookie
    try {
      await cookieSetter('etx', e_token);
    } catch (cookieError) {
      console.error('Error setting cookie:', cookieError);
      return jsonResponse(
        false,
        'Failed to set authentication cookie.',
        null,
        500
      );
    }

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

    // Decrypt the token using the provided password
    let jwtVp;
    try {
      // console.log('decodePassword-jwtVp: ', decodePassword);
      jwtVp = decrypt(e_token, decodePassword);
    } catch (decryptError) {
      console.error('Error decrypting token:', decryptError);
      return jsonResponse(
        false,
        'Failed to decrypt the token. Invalid SignerKey.',
        null,
        400
      );
    }

    if (!jwtVp) {
      return jsonResponse(
        false,
        'DID verification failed. Make sure you are using the right file and SignerKey.',
        null,
        400
      );
    }

    // Decode the JWT to verify its payload
    let decodedVp, jwtVc, decodedVc, userId, userAddress;
    try {
      decodedVp = decodeJWT(jwtVp);
      jwtVc = decodedVp.payload.vp.verifiableCredential[0];
      decodedVc = decodeJWT(jwtVc);
      userId = decodedVc.payload.vc.credentialSubject.id;
      userAddress = userId.split(':').pop();
    } catch (decodeError) {
      console.error('Error decoding JWT:', decodeError);
      return jsonResponse(false, 'Failed to decode the JWT.', null, 400);
    }

    // Check if the address in the JWT matches the provided address
    if (userAddress !== address) {
      return jsonResponse(
        false,
        'DID verification failed. Invalid address.',
        null,
        400
      );
    }

    // Successful validation response
    return jsonResponse(
      true,
      'Validation was successful.',
      { jwtVc, jwtVp, etx: e_token },
      200
    );
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
