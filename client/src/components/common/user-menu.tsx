'use client';

import {
  CircleUser,
  Copy,
  Expand,
  ExternalLink,
  FileKey,
  Languages,
  LayoutDashboard,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { IUserProps } from '@/types';
import { Locale } from '@/i18n.config';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import {
  cn,
  downloadEncryptedToken,
  summarizedAddress,
  truncate,
  domainURL,
} from '@/lib/utils/helpers';
import NextImage from '@/components/native/image';
import LocaleSwitcher from '@/components/common/locale-switcher';
import DisconnectLogout from '@/components/actions/disconnect-logout';
import WalletProfile from '@/components/wallet/profile';
import WalletPopoverProfile from '@/components/wallet/popover-profile';

interface Props {
  session: IUserProps | null;
  lang: Locale;
}

const UserMenu = ({ session, lang }: Props) => {
  const alert = useAlert();
  const { account } = useAccount();

  const handleDownloadKey = () => {
    if (!session) return;

    if (!session.token) {
      alert.error('No key to download. Contact us');
      return;
    }
    downloadEncryptedToken(session.token);
  };

  return session ? (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='icon'
            className={cn(
              'rounded-full object-center object-cover w-12 h-10 border-zinc-500',
              session && session.image ? '' : 'bg-lime-600'
            )}
          >
            {session && session.image ? (
              <NextImage
                src={session.image}
                alt={session.name}
                width={500}
                height={500}
                className='w-full h-full rounded-full'
              />
            ) : (
              <CircleUser className='h-5 w-5 text-black' />
            )}

            <span className='sr-only'>Toggle user menu</span>
          </Button>
          <WalletPopoverProfile account={account} session={session} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='max-w-xl w-full bg-neutral-900 border-zinc-700/40 text-zinc-500'
        align='start'
      >
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className='bg-zinc-700/40' />
        <DropdownMenuItem>
          <span className='inline-flex items-center gap-1'>
            <ExternalLink className='w-4 h-4' size={20} strokeWidth={2.25} />
            Profile
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span className='inline-flex items-center gap-1'>
            <LayoutDashboard className='w-4 h-4' size={20} strokeWidth={2.25} />
            Dashboard
          </span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <span className='inline-flex items-center gap-1'>
            <Settings className='w-4 h-4' size={20} strokeWidth={2.25} />
            Settings
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-700/40' />
        <DropdownMenuItem>
          <span className='inline-flex items-center gap-1'>
            <Languages className='w-4 h-4' size={20} strokeWidth={2.25} />
            <LocaleSwitcher lang={lang} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-700/40' />
        <DropdownMenuItem onClick={handleDownloadKey}>
          <span className='inline-flex items-center gap-1'>
            <FileKey className='w-4 h-4' size={20} strokeWidth={2.25} />
            Download Sign-in file
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator className='bg-zinc-700/40' />
        <div>
          <div className='w-full flex flex-col'>
            <div className='px-2 py-1 flex flex-col'>
              <p className='inline-flex items-center w-full justify-between gap-3 text-zinc-400 text-xs font-medium'>
                <span className='inline-flex items-center gap-1.5'>
                  <span>{summarizedAddress(session.address, 25, 4)}</span>
                </span>
                <span className='border border-zinc-500 p-1 rounded-lg'>
                  <Copy className='w-4 h-4' size={20} strokeWidth={2.25} />
                </span>
              </p>

              <p className='inline-flex items-center gap-1  text-xs'>
                <span>{truncate(account?.meta?.name!, 20)}</span>
                <span className='text-lime-500'>・</span>
                <span>{account?.meta.source}</span>
              </p>
            </div>
            <DropdownMenuSeparator className='bg-zinc-700/40' />

            <div className='px-2 py-1 rounded-md  text-zinc-400 flex items-center gap-1.5'>
              <DisconnectLogout session={session} />
              <WalletProfile account={account}>
                <button className='outline-none border-2 border-zinc-500 p-1 rounded-lg'>
                  <Expand size={20} className='w-4 h-4' strokeWidth={2.25} />
                </button>
              </WalletProfile>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <Link href={domainURL('/auth/did/verify')}>
      <Button
      // className='bg-lime-300 !text-black text-medium border-zinc-800'
      >
        Sign-in & Connect
      </Button>
    </Link>
  );
};

export default UserMenu;
