import { ReactNode } from 'react';
import { domainURL } from '@/lib/utils/helpers';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import DashboardHeader from '@/components/common/dashboard-header';
import DashboardSidebar from '@/components/common/dashboard-sidebar';
import { redirect } from 'next/navigation';
interface Props {
  children: ReactNode;
}

const RootLayoutDashboard = async ({ children }: Props) => {
  const session = await getServerUser();

  if (!session) redirect(domainURL('/did/verify'));

  const lang = await getLang();

  return (
    <main className='h-full w-full bg-neutral-900 flex items-start bg-muted/40'>
      <DashboardSidebar />
      <section className='w-full m-0 p-0'>
        <DashboardHeader session={session} lang={lang} />
        {children}
      </section>
    </main>
  );
};

export default RootLayoutDashboard;
