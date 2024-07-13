import { ReactNode } from 'react';
import { domainURL } from '@/lib/utils/helpers';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import { redirect } from 'next/navigation';
import { AddressType } from '@/types';
import { Metadata } from 'next';
import Sidebar from '@/components/dashboard/common/sidebar';
import Header from '@/components/dashboard/common/header';

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
    <main className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <Sidebar />
      <div className='flex flex-col'>
        <Header lang={lang} session={session} />
        {children}
      </div>
    </main>
  );
};

export default RootLayoutDashboard;
