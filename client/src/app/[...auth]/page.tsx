import { BentoGridThirdDemo } from '@/components/common/bento-grid';
import DIDCreate from '@/components/did/create';
import DIDVerify from '@/components/did/verify';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type AuthPathType = 'create' | 'verify';

interface Props {
  params: { auth: ['auth', 'did', AuthPathType] };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { auth } = params;

  // console.log('params: ', params);

  //   const type = auth === 'create' ? 'Create' : 'Verify';

  const createMsg = `Create a DID with the provided Oauth.`;
  const verifyMsg = `Verify your DID continue.`;

  return {
    title: `Decentralized Identifier - ${`type`}`,
    description: createMsg,
  };
}

const DecentralizedIdentifierPage = ({ params }: Props) => {
  const { auth } = params;

  if (auth.length < 3) {
    return notFound();
  }

  const path = auth[auth.length - 1];

  // console.log('path: ', path);

  if (path !== 'create' && path !== 'verify') {
    return notFound();
  }

  return (
    <div className='px-14 container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex'>
        <BentoGridThirdDemo />
      </div>

      <div className='relative h-full p-10'>
        <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border border-zinc-700/40 dark:bg-black'>
          {path === 'create' ? <DIDCreate /> : <DIDVerify />}
        </div>
      </div>
    </div>
  );
};

export default DecentralizedIdentifierPage;
