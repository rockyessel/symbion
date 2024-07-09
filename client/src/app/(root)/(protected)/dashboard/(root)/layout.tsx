import { ReactNode } from 'react';
import { domainURL } from '@/lib/utils/helpers';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import DashboardSidebar from '@/components/common/dashboard-sidebar';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface Props {
  children: ReactNode;
}

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Symbion - Dashboard',
    description: 'Manage all your blogs here.',
  };
}

const RootLayoutDashboard = async ({ children }: Props) => {
  const session = await getServerUser();

  if (!session) return redirect(domainURL('/did/verify'));

  const lang = await getLang();

  return (
    <main className='h-full w-full bg-neutral-900 flex items-start bg-muted/40'>
      <DashboardSidebar />
      {children}
    </main>
  );
};

export default RootLayoutDashboard;
