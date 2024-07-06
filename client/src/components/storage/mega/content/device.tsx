'use client';

import { ImagePlus } from 'lucide-react';
import LocalFileCard from '../file/local-card';
import { cn } from '@/lib/utils/helpers';
import { useWeb3Storage } from '@/context/storage';
import { useState } from 'react';

interface Props {
  allowMultiple?: boolean;
  accept?: string;
  showUploadMedium?: boolean;
  
}

const DeviceUpload = ({
  accept,
  allowMultiple,
  showUploadMedium = false,
}: Props) => {
  const { files, handleUpload, handleSubmission } = useWeb3Storage();

  return (
    <div
      className={cn(
        'w-full h-full ',
        files.length === 0 ? 'flex items-center justify-center' : ''
      )}
    >
      {files.length === 0 && (
        <form onSubmit={handleSubmission}>
          <fieldset>
            <label>
              <fieldset className='w-full border-dashed border-2 p-10 inline-flex flex-col items-center justify-center border-zinc-700/40 bg-zinc-500 rounded-lg'>
                <ImagePlus />
                <p>{`Drag 'n' drop some images here, or click to select images`}</p>
              </fieldset>
              <input
                multiple={allowMultiple}
                accept={accept}
                onChange={handleUpload}
                type='file'
                className='m-0 p-0 w-0 h-0'
              />
            </label>
          </fieldset>
        </form>
      )}

      {files.length > 0 && (
        <div className='flex items-center flex-wrap gap-2'>
          {files.map((file, index) => (
            <LocalFileCard file={file} key={index} />
          ))}
          {/* <button onClick={handleSubmission}>Upload</button> */}
        </div>
      )}
    </div>
  );
};

export default DeviceUpload;
