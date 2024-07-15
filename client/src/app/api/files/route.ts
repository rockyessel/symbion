import { uploadFile } from '@/lib/configs/web3-storage';

const jsonResponse = (
  success: boolean,
  message: string,
  payload: any = null,
  status: number = 400
) => {
  return Response.json(
    { success, message, payload },
    { status, headers: { 'Content-Type': 'application/json' } }
  );
};

export const POST = async (request: Request) => {
  try {
    const data = await request.formData();
    const files = data.getAll('files') as File[] | null;

    console.log('files: ', files);

    if (!files) return jsonResponse(false, 'No file provided.', null, 404);
    try {
      const CIDs: string[] = [];
      for (const file of files) {
        const cid = await uploadFile(file);
        const stringifiedCid = cid?.toString();
        CIDs.push(stringifiedCid!);
      }

      console.log('CIDs: ', CIDs);
      return jsonResponse(true, 'File created.', CIDs, 200);
    } catch (error) {
      console.log('error: ', error);
      return jsonResponse(false, 'internal Error.', null, 500);
    }
  } catch (error) {
    console.log('error: ', error);
    return jsonResponse(false, 'internal Error.', null, 500);
  }
};
