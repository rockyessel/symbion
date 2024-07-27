'use client';

import { Account, IUserProps } from '@/types';
import WalletProfile from './profile';
import { Separator } from '../ui/separator';
import { Copy, Expand, LogOut } from 'lucide-react';
import {
  summarizedAddress,
  truncate,
  copyToClipboard,
  cn,
} from '@/lib/utils/helpers';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAccount } from '@gear-js/react-hooks';
import { supportedWallets } from '@/lib/utils/constants';
import NextImage from '../native/image';
import { useTransition,useState } from 'react';

interface Props {
  account?: Account;
  session: IUserProps;
}

const WalletPopoverProfile = ({ account, session }: Props) => {
  const { logout, isAccountReady } = useAccount();
  const [isPending, startTransition] = useTransition();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (copiedText: string) => {
    if (!session) return;

    if (!copiedText) return;

    startTransition(async () => {
      const isCopied_ = await copyToClipboard(copiedText);
      setIsCopied(isCopied_);
      return;
    });
  };

  const handleLogout = () => {
    logout();
  };

  const wallet = supportedWallets.find(
    (wallet) => wallet.value === session?.wallet
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
                  {summarizedAddress(session.address, 19, 4)}
                </span>
              </span>
            </div>

            <p className='gap-[3.18px] inline-flex justify-between'>
              <span className=''>
                <span className='font-bold'>{session.balance}</span>
                <span className=''>TVARA</span>
              </span>

              <span className='text-[0.5rem]'>
                {isAccountReady
                  ? account
                    ? 'connected'
                    : 'Failed. Refresh page.'
                  : 'connecting...'}
              </span>
            </p>
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className='p-1 -900 w-full border-zinc-700/40 max-w-xs bg-neutral-900 rounded-lg text-zinc-500'>
        <div className='w-full flex flex-col gap-1.5'>
          <div className='p-2 flex flex-col'>
            <p className='inline-flex items-center w-full justify-between gap-3 text-zinc-200 text-xs font-medium'>
              <span className='inline-flex items-center gap-1.5'>
                <span>{summarizedAddress(session.address, 25, 4)}</span>
              </span>
              <span
                onClick={() => handleCopy(session.address)}
                className='border border-zinc-500 p-1 rounded-lg'
              >
                <Copy
                  className={cn('w-4 h-4', isCopied ? 'text-lime-600' : '')}
                  strokeWidth={2.25}
                />
              </span>
            </p>

            <p className='inline-flex items-center gap-1  text-xs'>
              <span>{truncate(session.walletName, 10)}</span>
              <span className='text-lime-500'>・</span>
              <span>{session.wallet}</span>
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
