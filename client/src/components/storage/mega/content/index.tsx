'use client';

import { StringSelection } from '..';
import DeviceUpload from './device';
import RecentUploads from './recent-uploads';
import UploadByFileURL from './url';

interface Props {
  selectItem: StringSelection;
  allowMultiple?: boolean;
  accept?: string;
  showUploadMedium?: boolean;

}

const Content = ({...props}: Props) => {
  const { selectItem, accept, allowMultiple} = props;
  switch (selectItem) {
    case 'recent-uploads':
      return <RecentUploads />;

    case 'files':
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <p className='text-2xl font-medium'>Under Construction</p>
        </div>
      );

    case 'folders':
      return (
        <div className='w-full h-full flex items-center justify-center'>
          <p className='text-2xl font-medium'>Under Construction</p>
        </div>
      );

    case 'enter-url':
      return <UploadByFileURL />;

    case 'locally-from-device':
      return (
        <DeviceUpload
          accept={accept}
          allowMultiple={allowMultiple}
        />
      );

    default:
      return <>{`Shit! Happens that's life.`}</>;
  }
};

export default Content;
