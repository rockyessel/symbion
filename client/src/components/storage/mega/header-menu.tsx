'use client';

import { useWeb3Storage } from '@/context/storage';
import { useAlert } from '@gear-js/react-hooks';
import { Button } from '../../ui/button';
import { DialogClose } from '../../ui/dialog';

interface Props {
  retrieveFileUrls: (fileUrls: string[]) => void;
  selectOnly?: boolean;
}

const StorageHeaderMenu = ({ retrieveFileUrls, selectOnly = false }: Props) => {
  const {
    selectedFiles,
    handleRemoveSelectedFiles,
    handleSubmission,
    handleInsetFilesUrls,
    CIDs,
    files,
  } = useWeb3Storage();

  const alert = useAlert();

  const isUserLocalFileUploaded = files.length > 0;
  const isSelected = selectedFiles.length === 0;

  const handleRemoveFiles = () => {
    if (selectedFiles.length === 0) {
      alert.error('Cannot remove selection, since it does not exist.');
      return;
    }
    const names = selectedFiles.map((file) => file.name);
    handleRemoveSelectedFiles(names);
  };

  const isFileUploaded =
    !isSelected && !isUserLocalFileUploaded && CIDs.length > 0;

  const isUploadable = isSelected && isUserLocalFileUploaded;

  console.log('isFileUploaded: ', isFileUploaded);

  const handlee = () => {
    const urls = handleInsetFilesUrls();
    console.log('urls: ', urls);
    retrieveFileUrls(urls);
  };

  return (
    <div className='!max-w-full flex items-center justify-between border-b border-zinc-700/40 p-2'>
      <div>
        <button
          disabled={isSelected}
          className='text-sm font-medium border-none outline-none text-rose-600 disabled:text-rose-700/40 disabled:cursor-not-allowed'
          onClick={handleRemoveFiles}
        >
          delete
        </button>
      </div>
      <div className='flex items-center gap-2'>
        <Button
          variant='outline'
          disabled={!isFileUploaded}
          onClick={handlee}
          className='disabled:cursor-not-allowed'
        >
          use
        </Button>
        {selectOnly ? (
          <Button
            disabled={!isUploadable}
            variant='outline'
            className='disabled:cursor-not-allowed'
          >
            <DialogClose className='w-full h-full'>upload</DialogClose>
          </Button>
        ) : (
          <Button
            disabled={!isUploadable}
            variant='outline'
            onClick={handleSubmission}
            className='disabled:cursor-not-allowed'
          >
            <DialogClose className='w-full h-full'>upload</DialogClose>
          </Button>
        )}
      </div>
    </div>
  );
};

export default StorageHeaderMenu;
