'use client';

import { StringSelection } from '.';
import StorageHeaderMenu from './header-menu';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import StorageSidebar from './sidebar';

interface Props {
  children: ReactNode;
  setSelectItem: Dispatch<SetStateAction<StringSelection>>;
  retrieveFileUrls: (fileUrls: string[]) => void;
  showDocuments?: boolean;
  showUploadMedium?: boolean;
  defaultSelection?: StringSelection;
  selectOnly?: boolean;
}

const StorageLayout = ({ ...props }: Props) => {
  const { children, setSelectItem, retrieveFileUrls,selectOnly, ...rest } = props;

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <div className='w-full h-full flex items-start bg-neutral-900 border-zinc-700/40'>
      <div className='pb-12 w-[250px] h-full sticky top-16 border-r border-zinc-700/40'>
        <StorageSidebar {...rest} setSelectItem={setSelectItem} />
      </div>
      <div className='w-full h-full'>
        <StorageHeaderMenu
          selectOnly={selectOnly}
          retrieveFileUrls={retrieveFileUrls}
        />
        <section className='p-4 h-full'>{children}</section>
      </div>
    </div>
  ) : (
    'laoding...'
  );
};

export default StorageLayout;
