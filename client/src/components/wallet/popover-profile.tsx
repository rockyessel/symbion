'use client';

import { Account } from '@/types';
import WalletProfile from './profile';
import { Separator } from '../ui/separator';
import { Copy, Expand, LogOut } from 'lucide-react';
import { summarizedAddress, truncate } from '@/lib/utils/helpers';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAccount } from '@gear-js/react-hooks';
import { supportedWallets } from '@/lib/utils/constants';
import NextImage from '../native/image';

interface Props {
  account: Account;
}

const WalletPopoverProfile = ({ account }: Props) => {
  const { logout } = useAccount();

  const handleLogout = () => {
    logout();
  };

  const wallet = supportedWallets.find(
    (wallet) => wallet.value === account.meta.source
  );

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className='px-2 w-full py-1.5 -900 rounded-xl border border-zinc-800 justify-start items-center gap-2 inline-flex'>
          {wallet ? (
            <NextImage
              src={wallet.props.logo}
              alt={wallet.name}
              width={500}
              height={500}
              className='w-9 h-9 rounded-full border border-zinc-700/30'
            />
          ) : (
            <div className='address__profile w-9 h-9 rounded-full' />
          )}

          <div className='text-xs flex-col gap-0 flex'>
            <div className='flex-col flex'>
              <span className='inline-flex items-center gap-1.5'>
                <span className='text-zinc-300'>
                  {summarizedAddress(account?.address, 19, 4)}
                </span>
              </span>
            </div>
            <div className='gap-[3.18px] inline-flex'>
              <span className=''>
                <span className='font-bold'>6.704 </span>
                <span className=''>TVARA</span>
              </span>
            </div>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='p-1 -900 w-full border-zinc-700/40 max-w-xs bg-neutral-900 rounded-lg text-zinc-500'>
        <div className='w-full flex flex-col gap-1.5'>
          <div className='p-2 flex flex-col'>
            <p className='inline-flex items-center w-full justify-between gap-3 text-zinc-200 text-xs font-medium'>
              <span className='inline-flex items-center gap-1.5'>
                <span>{summarizedAddress(account?.address, 25, 4)}</span>
              </span>
              <span className='border border-zinc-500 p-1 rounded-lg'>
                <Copy className='w-4 h-4' strokeWidth={2.25} />
              </span>
            </p>

            <p className='inline-flex items-center gap-1  text-xs'>
              <span>{truncate(account?.meta?.name!, 10)}</span>
              <span className='text-lime-500'>・</span>
              <span>{account?.meta.source}</span>
            </p>
          </div>
          <div>
            <Separator className='bg-zinc-800/40' />
            <div className='p-2 rounded-md  text-zinc-200 flex items-center gap-1.5'>
              <button
                onClick={handleLogout}
                className='border-none outline-none inline-flex items-center gap-1.5 grow'
              >
                <LogOut strokeWidth={2.25} className='w-4 h-4 ' />
                <span className='text-sm'>Disconnect</span>
              </button>

              <WalletProfile account={account}>
                <button className='outline-none border border-zinc-500 p-1 rounded-lg'>
                  <Expand size={18} className=' w-4 h-4' strokeWidth={2.25} />
                </button>
              </WalletProfile>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default WalletPopoverProfile;
