'use client';

import FileIcon from './icon';
import { useEffect, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

import Image from 'next/image';
import { useWeb3Storage } from '@/context/storage';
import { cn, getFileExtensionNType, truncate } from '@/lib/utils/helpers';

interface Props {
  file?: File;
}

const LocalFileCard = ({ file }: Props) => {
  const { isInCheckState, handleSelection, selectedFiles } = useWeb3Storage();
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    // Update isChecked state based on whether the file is in selectedFiles
    setChecked(
      selectedFiles.some((selectedFile) => selectedFile.name === file?.name)
    );
  }, [selectedFiles, file]);

  const handleCheckboxChange = (checked: boolean) => {
    if (checked) {
      handleSelection(file!, 'select');
    } else {
      handleSelection(file!, 'deselect');
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
        className={`grow bg-transparent overflow-hidden rounded-lg flex items-center justify-center border-[1px] border-zinc-700/40`}
      >
        <div className='w-full h-full inline-flex items-center justify-center'>
          {file && (
            <FileIcon extension={getFileExtensionNType(file.name, file.type)} />
          )}
        </div>
      </div>
      <p className='text-center'>{`${truncate(
        file?.name!,
        5
      )}.${getFileExtensionNType(file?.name!, file?.type)
        .split(' ')
        .pop()!}`}</p>
    </div>
  );
};

export default LocalFileCard;
