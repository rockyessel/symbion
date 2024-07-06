import { IPage } from '@/types';
import { redirect } from 'next/navigation';
import { Tabs } from '@/components/ui/tabs';
import { domainURL } from '@/lib/utils/helpers';
import { pageInit } from '@/lib/utils/constants';
import PageEditor from '@/components/pages/editor';
import { getServerUser } from '@/lib/_actions/did';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import ProjectSidebarDetails from '@/components/common/page-sidebar';

interface Props {
  params: { id: string };
}

const DashboardPage = async ({ params: { id } }: Props) => {
  const session = await getServerUser();

  const path = domainURL(`/did/verify?redirect=/dashboard/pages/${id}`);

  const page = {} as IPage;

  if (!session) return redirect(path);

  return (
    <div className='w-full h-[93vh] overflow-hidden'>
      <Tabs className='w-full h-full !border-none' defaultValue='basic'>
        <div className='transition duration-200 ease-in-out w-full h-full flex items-start gap-1.5'>
          <ProjectSidebarDetails page={page} sidebarLists={[]} />
          <div className='w-full h-full rounded-lg border border-zinc-700/40 !overflow-y-auto'>
            <ScrollArea className=''>
              <PageEditor session={session} page={pageInit} />
              <ScrollBar />
            </ScrollArea>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default DashboardPage;
