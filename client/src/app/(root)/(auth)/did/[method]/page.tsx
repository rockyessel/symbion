import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { BentoGridThirdDemo } from '.';
import SignupFormDemo from './sign';

interface Props {
  params: { method: 'create' | 'verify' };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { method } = params;

  const type = method === 'create' ? 'Create' : 'Verify';

  const createMsg = `Create a DID with the provided Oauth.`;
  const verifyMsg = `Verify your DID continue.`;

  return {
    title: `Decentralized Identifier - ${type}`,
    description: method === 'create' ? createMsg : verifyMsg,
  };
}

const DecentralizedIdentifierPage = ({ params }: Props) => {
  const { method } = params;

  if (method !== 'create' && method !== 'verify') {
    return notFound();
  }

  return (
    <div className='px-14 container relative h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0'>
      <div className='relative hidden h-full flex-col p-10 text-white dark:border-r lg:flex'>
        <BentoGridThirdDemo />
      </div>

      <div className='relative h-full p-10'>
        <SignupFormDemo method={method} />
      </div>
    </div>
  );
};

export default DecentralizedIdentifierPage;
