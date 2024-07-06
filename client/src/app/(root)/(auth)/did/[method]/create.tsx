'use client';
import {
  cn,
  delay,
  domainURL,
  encrypt,
  fileUpload,
  summarizedAddress,
  symbionURLBuilder,
} from '@/lib/utils/helpers';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { IconBrandGithub, IconBrandGoogle } from '@tabler/icons-react';
import NativeInput from '@/components/native/input';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Wallet from '@/components/wallet';
import { Button } from '@/components/ui/button';
import { decodeAddress } from '@gear-js/api';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { cookieSetter } from '@/lib/_actions/helpers';
import { signIn } from 'next-auth/react';
import { CheckCircle, Upload } from 'lucide-react';
import {
  BottomGradient,
  LabelInputContainer,
} from '@/components/common/utilities';
import { createNValidate } from '@/lib/_actions/did';
import StorageManagement from '@/components/storage/mega';
import { useWeb3Storage } from '@/context/storage';
import NextImage from '@/components/native/image';

// deoc

const socialDID = [
  {
    name: 'github',
    icon: <IconBrandGithub className='h-4 w-4 text-lime-600' />,
  },
  {
    name: 'google',
    icon: <IconBrandGoogle className='h-4 w-4 text-lime-600' />,
  },
];

const DIDCreate = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const [selectedSocial, setSelectedSocial] = useState('');

  const handleSocialDIDChange = (social: string) => {
    setSelectedSocial(social);
  };

  const { account } = useAccount();
  const alert = useAlert();

  const formInit = { name: '', email: '', password: '', image: '' };
  const { CIDs, files } = useWeb3Storage();
  const [formInput, setFormInput] = useState(formInit);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setFormInput((previousInputValue) => ({
      ...previousInputValue,
      [target.name]: target.value,
    }));
  };

  const handleCreateSocialDID = async () => {
    if (!selectedSocial) {
      alert.error('Please selected one of the providers.');
      return;
    }
    if (!account || !account?.decodedAddress) {
      alert.error('Connect your wallet to continue.');
      return;
    }

    if (!formInput.password) {
      alert.error('Please provide key.');
      return;
    }

    const passwordEncrypted = encrypt(
      formInput.password,
      String(process.env.NEXT_PUBLIC_SYSTEM_SECRET)
    );

    await cookieSetter('ptx', passwordEncrypted);

    await signIn(selectedSocial, {
      callbackUrl: domainURL('/dashboard'),
      redirect: true,
    });
  };

  const handleSubmission = async (event: SyntheticEvent) => {
    event.preventDefault();
    if (!account || !account?.decodedAddress) {
      alert.error('No wallet connected.');
      return;
    }

    if (files.length > 0) {
      const response = await fileUpload(files);
      formInput.image = symbionURLBuilder(response.payload[0]);
      console.log('-----------added image');

      console.log('formInput: ', formInput);
    }

    const { decodedAddress } = account;
    const payload = await createNValidate({
      ...formInput,
      address: decodedAddress!,
    });

    alert.success('Signer registered.');
    await delay(200);
    alert.loading('Redirecting...');
    signIn('credentials', {
      ...payload,
      redirect: true,
      callbackUrl: domainURL('/dashboard'),
    });
  };

  return (
    <Tabs defaultValue='credentials' className='w-[400px]'>
      <div>
        <h2 className='font-bold text-xl text-zinc-400'>Welcome to DeNect</h2>
        <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
          Login to aceternity if you can because we don&apos;t have a login flow
          yet
        </p>
      </div>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='credentials'>DID Credential</TabsTrigger>
        <TabsTrigger value='social'>DID Social</TabsTrigger>
      </TabsList>
      <form className='my-8' onSubmit={handleSubmit}>
        <TabsContent value='credentials'>
          <div className='flex flex-col gap-2'>
            <div className='w-full flex items-center gap-2'>
              <StorageManagement
                selectOnly
                accept='image/*'
                showUploadMedium
                retrieveFileUrls={(values) => {}}
              >
                {files.length > 0 ? (
                  <NextImage
                    src={URL.createObjectURL(files[0])}
                    width={500}
                    height={500}
                    alt={files[0].name}
                    className='object-cover w-14 h-14 p-1 rounded-full border border-lime-300/40'
                  />
                ) : (
                  <Upload className='w-4 h-4' size={20} strokeWidth={2.25} />
                )}
              </StorageManagement>

              <NativeInput
                onChange={handleOnChange}
                name='name'
                value={formInput.name}
                type='text'
                label='Enter your name'
                placeholder='John Doe'
              />
            </div>

            <NativeInput
              onChange={handleOnChange}
              name='email'
              value={formInput.email}
              type='text'
              label='Your email address'
              placeholder='mail@company.com'
            />
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
                  value={summarizedAddress(
                    decodeAddress(account.address),
                    5,
                    20
                  )}
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
                Treat it like your password. Along with the file and singer key,
                you can sign-in.
              </span>
            </Label>
            <fieldset className='mt-2'>
              <NativeInput
                onChange={handleOnChange}
                name='password'
                value={formInput.password}
                type='password'
                label='Enter Signer Key'
                placeholder='••••••••'
              />
            </fieldset>
          </LabelInputContainer>

          <button
            onClick={handleSubmission}
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Sign up &rarr;
            <BottomGradient />
          </button>
          <div className='bg-gradient-to-r from-transparent via-lime-300 to-transparent my-8 h-[1px] w-full' />
        </TabsContent>
        <TabsContent value='social'>
          <div className='flex flex-col space-y-4'>
            {socialDID.map((social, index) => (
              <button
                onClick={() => handleSocialDIDChange(social.name)}
                key={index}
                className='border border-zinc-700/40 text-sm relative group/btn flex space-x-2 items-center justify-start px-4 w-full rounded-md h-10 font-medium shadow-input'
                type='submit'
              >
                <span className='w-full inline-flex items-center justify-between '>
                  <span className='inline-flex items-center gap-2.5'>
                    {social.icon}
                    <span>
                      Create your DID with{' '}
                      <span className='text-lime-300 capitalize'>
                        {social.name}
                      </span>
                    </span>
                  </span>
                  {selectedSocial && selectedSocial === social.name && (
                    <CheckCircle
                      size={20}
                      strokeWidth={2.25}
                      className='w-4 h-4 text-lime-600'
                    />
                  )}
                </span>
                <BottomGradient />
              </button>
            ))}
          </div>
          <div className='bg-gradient-to-r from-transparent via-lime-300 to-transparent my-8 h-[1px] w-full' />

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
                  value={summarizedAddress(
                    decodeAddress(account.address),
                    5,
                    20
                  )}
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
          <div className='bg-gradient-to-r from-transparent via-lime-300 to-transparent my-8 h-[1px] w-full' />

          <LabelInputContainer className='mb-8'>
            <Label htmlFor='didKey' className='inline-flex flex-col gap-1.5'>
              <span>Sign Key</span>
              <span className='text-xs text-zinc-400/50'>
                Treat it like your password. Along with the file and singer key,
                you can sign-in.
              </span>
            </Label>
            <fieldset className='mt-2'>
              <NativeInput
                onChange={handleOnChange}
                name='password'
                value={formInput.password}
                type='password'
                label='Enter Signer Key'
                placeholder='••••••••'
              />
            </fieldset>
          </LabelInputContainer>

          <button
            onClick={handleCreateSocialDID}
            className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
          >
            Create Decentralized Identity &rarr;
            <BottomGradient />
          </button>
        </TabsContent>
      </form>
    </Tabs>
  );
};

export default DIDCreate;
