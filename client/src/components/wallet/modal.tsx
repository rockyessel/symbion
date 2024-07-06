'use client';

import Wallet from '.';
import { Button } from '../ui/button';
import { useAccount } from '@gear-js/react-hooks';
import WalletPopoverProfile from './popover-profile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const WalletModal = () => {
  const { account } = useAccount();
  return (
    <Dialog>
      <DialogTrigger asChild>
        {account ? (
          <WalletPopoverProfile account={account} />
        ) : (
          <Button
            variant='outline'
            className='bg-lime-300 !text-black text-medium border-zinc-800'
          >
            Connect
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='flex items-center justify-center bg-transparent border-none shadow-none'>
        <Wallet />
      </DialogContent>
    </Dialog>
  );
};

export default WalletModal;
