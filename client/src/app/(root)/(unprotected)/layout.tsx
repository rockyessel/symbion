import { IRootLayout } from '@/types';
import Header from '@/components/header';
import Footer from '@/components/common/footer';

const RootLayout = async ({ children }: IRootLayout) => {
  return (
    <main className='w-screen h-screen'>
      <Header />
      <div className='px-24'>{children}</div>
    </main>
  );
};

export default RootLayout;
