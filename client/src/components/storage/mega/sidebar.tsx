import { Dispatch, SetStateAction, useState } from 'react';
import { StringSelection } from '.';
import { Button, buttonVariants } from '@/components/ui/button';
import { FileText, Folder, FolderUp, Link, MonitorUp } from 'lucide-react';
import { cn, createSlug } from '@/lib/utils/helpers';

interface Props {
  setSelectItem: Dispatch<SetStateAction<StringSelection>>;
  defaultSelection?: StringSelection;
  showDocuments?: boolean;
  showUploadMedium?: boolean;
}

const StorageSidebar = ({
  setSelectItem,
  defaultSelection = 'recent-uploads',
  showDocuments = false,
  showUploadMedium = false,
}: Props) => {
  const [selected, setSelected] = useState(defaultSelection);

  const handleSelect = (value: StringSelection) => setSelectItem(value);

  const hold = 'bg-lime-600';

  const uploadMedium = ['Enter URL', 'Locally from Device'];

  return (
    <div className='space-y-4 py-4 rounded-l-lg'>
      {showDocuments && (
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-2 font-semibold tracking-tight text-lime-600'>
            Documents
          </h2>
          <div className='space-y-1'>
            <Button
              onClick={() => handleSelect('recent-uploads')}
              className={cn(
                'w-full justify-start',
                selected === 'recent-uploads' ? hold : ''
              )}
            >
              <FolderUp strokeWidth={0.5} />
              Recent Uploads
            </Button>
            <Button
              onClick={() => handleSelect('files')}
              className={cn(
                'w-full justify-start',
                selected === 'files' ? hold : ''
              )}
            >
              <FileText strokeWidth={0.5} />
              Files
            </Button>
            <Button
              onClick={() => handleSelect('folders')}
              className={cn(
                'w-full justify-start',
                selected === 'folders' ? hold : ''
              )}
            >
              <Folder strokeWidth={0.5} />
              Folder
            </Button>
          </div>
        </div>
      )}
      {showUploadMedium && (
        <div className='px-3 py-2'>
          <h2 className='mb-2 px-4 font-semibold tracking-tight text-lime-600'>
            Upload Medium
          </h2>
          <div className='space-y-1'>
            {uploadMedium.map((medium, index) => (
              <button
                key={index}
                onClick={() =>
                  handleSelect(createSlug(medium) as StringSelection)
                }
                className={cn(
                  'w-full justify-start text-sm inline-flex items-start',
                  selected === createSlug(medium)
                    ? buttonVariants({ variant: 'default' })
                    : ''
                )}
              >
                <Link strokeWidth={2.25} size={20} className='w-4 h-4' />
                {medium}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StorageSidebar;
