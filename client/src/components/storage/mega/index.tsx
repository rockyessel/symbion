'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Content from './content';
import { ReactNode, useState } from 'react';

import StorageLayout from './layout';

interface Props {
  allowMultiple?: boolean;
  accept?: string;
  retrieveFileUrls: (fileUrls: string[]) => void;
  children: ReactNode;
  showDocuments?: boolean;
  showUploadMedium?: boolean;
  defaultSelection?: StringSelection;
  selectOnly?: boolean;
}

export type StringSelection =
  | 'recent-uploads'
  | 'files'
  | 'folders'
  | 'enter-url'
  | 'locally-from-device';

const StorageManagement = ({ ...props }: Props) => {
  const { children, retrieveFileUrls, accept, allowMultiple, ...rest } = props;
  const [selectItem, setSelectItem] = useState<StringSelection>(
    'locally-from-device'
  );

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        // @ts-ignore
        hideCloseIcon={false}
        className='max-w-[60rem] h-[40rem] p-0 border-zinc-700/40'
      >
        <StorageLayout
          {...rest}
          retrieveFileUrls={retrieveFileUrls}
          setSelectItem={setSelectItem}
        >
          <Content
            showUploadMedium={rest.showUploadMedium}
            accept={accept}
            allowMultiple={allowMultiple}
            selectItem={selectItem}
          />
        </StorageLayout>
      </DialogContent>
    </Dialog>
  );
};

export default StorageManagement;
