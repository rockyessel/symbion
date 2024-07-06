'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { IUserProps } from '@/types';
import { domainURL, downloadEncryptedToken } from '@/lib/utils/helpers';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { signOut } from 'next-auth/react';

interface Props {
  session: IUserProps;
}

const DisconnectLogout = ({ session }: Props) => {
  const alert = useAlert();

  const { logout } = useAccount();

  const handleLogout = () => {
    logout();
    signOut({ callbackUrl: domainURL('/did/verify'), redirect: true });
  };

  const handleDownloadKey = () => {
    if (!session.token) {
      alert.error('No key to download. Contact us');
      return;
    }
    downloadEncryptedToken(session.token);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='border-none outline-none inline-flex items-center gap-1.5 grow'>
          <LogOut strokeWidth={2.25} className='w-4 h-4 ' />
          <span className='text-sm'>Disconnect</span>
        </button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md bg-neutral-900 border-zinc-700/40'>
        <DialogHeader>
          <DialogTitle className='text-lime-600'>
            Disconnect & Sign-out
          </DialogTitle>
          <DialogDescription>
            Before you disconnect & sign-out, make sure to download your key
            file for your next sign-in.{' '}
            <span
              onClick={handleDownloadKey}
              className='text-lime-600 font-medium underline underline-offset-1 cursor-pointer'
            >
              Download
            </span>
            .
          </DialogDescription>
        </DialogHeader>
        <div className='flex items-center space-x-2'></div>
        <DialogFooter className='flex items-center sm:justify-between'>
          <DialogClose asChild>
            <Button
              type='button'
              className='border-lime-600/40 bg-transparent text-rose-500 hover:border-rose-600/40'
            >
              Close
            </Button>
          </DialogClose>
          <Button
            onClick={handleLogout}
            type='button'
            className='bg-lime-600 text-black hover:bg-lime-700'
          >
            Disconnect & Sign-out
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DisconnectLogout;
