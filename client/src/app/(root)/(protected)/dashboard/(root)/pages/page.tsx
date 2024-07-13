import { getServerUser } from '@/lib/_actions/did';
import { redirect } from 'next/navigation';
import { domainURL } from '@/lib/utils/helpers';
import { DataTable } from './table';
import axios from 'axios';
import { getAllPages } from '@/lib/_actions/gear';

const DashboardPagesLists = async () => {
  const session = await getServerUser();

  const path = domainURL(
    `/did/verify?redirect=${domainURL('/dashboard/pages')}`
  );

  if (!session) return redirect(path);

  const pages = await getAllPages()

  console.log('pages: ', pages);

  return (
    <div className='px-10'>
      <div className=''>
        <p className='text-lg font-bold'>Pages</p>
        <span className='text-xs text-gray-500 block'>
          Upload a cover and profile image for your page.
        </span>
      </div>
      <DataTable data={pages.payload} pageId='0xfj' />
    </div>
  );
};

export default DashboardPagesLists;
