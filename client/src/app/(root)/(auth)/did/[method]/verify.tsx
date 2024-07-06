'use client';

import { FileUp } from 'lucide-react';
import { signIn } from 'next-auth/react';
import Wallet from '@/components/wallet';
import { decodeAddress } from '@gear-js/api';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import NativeInput from '@/components/native/input';
import { cn, domainURL, summarizedAddress } from '@/lib/utils/helpers';
import { validateFileAndSigner } from '@/lib/_actions/did';
import { ChangeEvent, Fragment, ReactNode, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const DIDVerify = () => {
  const { account } = useAccount();
  const alter = useAlert();
  const [selectedFile, setSelectedFile] = useState<File | ''>('');
  const [password, setPassword] = useState('');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setSelectedFile(file);
    }
  };

  const handleDIDVerify = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('password', password);
    formData.append('address', String(account?.decodedAddress));

    const response = await validateFileAndSigner(formData);
    const { payload, success, message } = response;

    if (success) {
      alter.success(message);
      await signIn('credentials', {
        ...payload,
        callbackUrl: domainURL('/dashboard'),
        redirect: true,
      });
    } else {
      alter.error(message);
      return;
    }
  };

  return (
    <div>
      <div className='my-2'>
        <h2 className='font-bold text-xl text-zinc-400'>Welcome to back.</h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Please provide your{' '}
          <span className='font-mono bg-lime-600 p-0.5 rounded-[0.3rem] text-black'>
            .did
          </span>{' '}
          file and your signer key, to login into the application.
        </p>
      </div>

      <div className=''>
        <div className='flex items-center justify-center w-full'>
          <label className='flex flex-col items-center justify-center w-full h-28 border-2 border-dashed rounded-lg cursor-pointer border-lime-600/40'>
            <div className='flex flex-col items-center justify-center pt-5 pb-6 pointer-events-none'>
              <FileUp
                className='text-lime-600/50'
                size={20}
                strokeWidth={2.25}
              />
              <p className=''>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
            </div>
            <input
              onChange={handleFileChange}
              type='file'
              className='w-0 h-0 p-0 m-0'
              accept='.did'
            />
          </label>
        </div>
        <div className='flex justify-between mt-2'>
          <p className='text-xs text-gray-900'>
            Supported Formats: SVG, PNG, JPG or GIF
          </p>
          <p className='text-xs text-gray-900'>Max size: 25MB</p>
        </div>

        <div className=''>
          <div className='w-full shadow-sm p-2 rounded-lg border'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
            >
              <rect width='38' height='38' rx='8' fill='#8331A7' />
              <path
                d='M10 14V24C10 25.1046 10.8954 26 12 26H26C27.1046 26 28 25.1046 28 24V16C28 14.8954 27.1046 14 26 14H20L18 12H12C10.8954 12 10 12.8954 10 14Z'
                stroke='white'
                stroke-width='1.5'
                stroke-linecap='round'
                stroke-linejoin='round'
              />
            </svg>
          </div>
        </div>
      </div>

      <fieldset>
        <Label htmlFor='didKey'>
          {account ? <span>Wallet Address</span> : <span></span>}
        </Label>
        <form className='flex gap-0 mt-3'>
          <label className='text-gray-500 text-sm whitespace-nowrap p-2 rounded-md rounded-r-none border-t border-b border-l border-zinc-700/40'>
            did:web:deconnect:
          </label>

          {account ? (
            <Input
              type='text'
              className='w-full rounded-l-none !border-l-none'
              value={summarizedAddress(decodeAddress(account.address), 5, 20)}
              disabled={account ? true : false}
            />
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant='outline'
                  className='bg-lime-300 !text-black text-medium border-zinc-800'
                >
                  Connect
                </Button>
              </DialogTrigger>
              <DialogContent className='w-full h-full flex items-center justify-center bg-transparent border-none shadow-none'>
                <Wallet />
              </DialogContent>
            </Dialog>
          )}
        </form>
      </fieldset>
      <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

      <LabelInputContainer className='mb-8'>
        <Label htmlFor='didKey' className='inline-flex flex-col gap-1.5'>
          <span>Sign Key</span>
          <span className='text-xs text-zinc-400/50'>
            Treat it like your password. Along with the file and singer key, you
            can sign-in.
          </span>
        </Label>
        <fieldset className='mt-2'>
          <NativeInput
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            name='password'
            type='password'
            label='Enter Signer Key'
            placeholder='••••••••'
          />
        </fieldset>
      </LabelInputContainer>

      <button
        onClick={handleDIDVerify}
        className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
        type='submit'
      >
        Sign up &rarr;
        <BottomGradient />
      </button>
    </div>
  );
};

export default DIDVerify;

const BottomGradient = () => {
  return (
    <Fragment>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </Fragment>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};
