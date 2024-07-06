'use client';

import DIDCreate from './create';
import DIDVerify from './verify';

interface Props {
  method: 'create' | 'verify';
}

const SignupFormDemo = ({ method }: Props) => {
  return (
    <div className='max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input border border-zinc-700/40 dark:bg-black'>
      {method === 'create' ? <DIDCreate /> : <DIDVerify />}
    </div>
  );
};

export default SignupFormDemo;
