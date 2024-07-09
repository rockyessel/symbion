import { ReactNode } from 'react';
import { domainURL } from '@/lib/utils/helpers';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import DashboardHeader from '@/components/common/dashboard-header';
import { redirect } from 'next/navigation';
import { AddressType } from '@/types';
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
    <main className='w-full m-0 p-0'>
      <DashboardHeader session={session} lang={lang} />
      {children}
    </main>
  );
};

export default RootLayoutDashboard;
