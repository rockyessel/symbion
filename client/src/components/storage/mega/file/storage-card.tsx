'use client';

import FileIcon from './icon';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { useWeb3Storage } from '@/context/storage';
import Image from 'next/image';
import { cn, getFileExtensionNType, truncate } from '@/lib/utils/helpers';
// import { IFileProps } from '@/types';
// import NextImage from '@/components/native/next-image';

interface Props {
  file: any;
}

const StorageFileCard = ({ file }: Props) => {
  //   // console.log('storage-file: ', file);
  const { isInCheckState, handleStorageFileSelection, selectedStorageFiles } =
    useWeb3Storage();
  const [isChecked, setChecked] = useState(false);
  // console.log('isChecked: ', isChecked);
  useEffect(() => {
    // Update isChecked state based on whether the file is in selectedFiles
    setChecked(
      selectedStorageFiles.some((selectedFile) => selectedFile === file.fileUrl)
    );
  }, [selectedStorageFiles, file]);

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      // console.log('isChecked: ', checked);
      handleStorageFileSelection(file.fileUrl, 'select');
    } else {
      handleStorageFileSelection(file.fileUrl, 'deselect');
    }
  };

  return (
    <div className='group flex flex-col w-40 h-32 relative'>
      <span className='inline-flex w-full p-1.5 absolute top-0 items-start justify-between'>
        <span className={cn(isInCheckState ? '' : 'hidden group-hover:block')}>
          <Checkbox
            className='z-[90]'
            checked={isChecked}
            onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
          />
        </span>
      </span>
      <div
        className={`grow bg-transparent overflow-hidden rounded-lg flex items-center justify-center border-[1px]`}
      >
        <div className='w-full h-full inline-flex items-center justify-center'>
          {file && (
            <FileIcon
              extension={getFileExtensionNType(file.name, file.mimeType)}
            />
          )}
        </div>
      </div>
      <p className='text-center'>{`${truncate(
        file?.name!,
        5
      )}.${getFileExtensionNType(file.name!, file.mimeType)
        .split(' ')
        .pop()!}`}</p>
    </div>
  );
};

export default StorageFileCard;
