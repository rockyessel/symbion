'use client';

import Link from 'next/link';
import { IUserProps } from '@/types';
import { Locale } from '@/i18n.config';
import NextImage from '../native/image';
import { Input } from '@/components/ui/input';
import WalletProfile from '../wallet/profile';
import LocaleSwitcher from './locale-switcher';
import { Button } from '@/components/ui/button';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import DisconnectLogout from '../actions/disconnect-logout';
import WalletPopoverProfile from '../wallet/popover-profile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn, domainURL, downloadEncryptedToken, summarizedAddress, truncate } from '@/lib/utils/helpers';
import { CircleUser, Copy, Expand, ExternalLink, FileKey, Languages, LayoutDashboard, Menu, Package2, Search, Settings } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface Props {
  session: IUserProps;
  lang: Locale;
}

const DashboardHeader = ({ lang = 'en', session }: Props) => {
  const alert = useAlert();
  const { account } = useAccount();

  const handleDownloadKey = () => {
    if (!session.token) {
      alert.error('No key to download. Contact us');
      return;
    }
    downloadEncryptedToken(session.token);
  };

  return (
    <header className='sticky top-0 z-[2] flex h-16 items-center gap-4 border-b border-zinc-700/40 bg-neutral-900 px-4 md:px-6'>
      <nav className='text-zinc-400 hover:text-zinc-500 hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
        <Link
          href={domainURL()}
          className='flex items-center gap-2 text-lg font-semibold md:text-base'
        >
          <Package2 className='h-6 w-6' />
          <span className='sr-only'>Acme Inc</span>
        </Link>
        <Link href={domainURL('/explore')} className='transition-colors'>
          Explore
        </Link>
        <Link href={domainURL('/articles')} className='transition-colors'>
          Articles
        </Link>
        <Link href={domainURL('/posts')} className='transition-colors'>
          Posts
        </Link>
        <Link href={domainURL('/pages')} className='transition-colors'>
          Pages
        </Link>
        <Link href={domainURL('/events')} className='transition-colors'>
          Events
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='bg-lime-500 border-zinc-500 shrink-0 md:hidden'
          >
            <Menu className='h-5 w-5 text-black' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent className='bg-neutral-900 border-zinc-700/40' side='left'>
          <nav className='text-zinc-400 hover:text-zinc-500 grid gap-6 font-medium'>
            <Link
              href='#'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link href='#' className=''>
              Overview
            </Link>
            <Link href='#' className=''>
              Pages
            </Link>
            <Link href='#' className=''>
              Settings
            </Link>
          </nav>
          <nav className='text-zinc-400 hover:text-zinc-500 grid gap-6 font-medium'>
            <Link
              href='#'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link href='#' className=''>
              Explore
            </Link>
            <Link href='#' className=''>
              Articles
            </Link>
            <Link href='#' className=''>
              Posts
            </Link>
            <Link href='#' className=''>
              Pages
            </Link>
            <Link href='#' className='hover:text-foreground'>
              Events
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className='flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4'>
        <form className='ml-auto flex-1 sm:flex-initial'>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
            />
          </div>
        </form>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className='flex items-center gap-2'>
              <Button
                variant='outline'
                size='icon'
                className={cn(
                  'rounded-full w-10 h-10 border-zinc-500',
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
              {account && <WalletPopoverProfile account={account} />}
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='max-w-3xl w-full bg-neutral-900 border-zinc-700/40 text-zinc-500'
            align='start'
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className='bg-zinc-700/40' />
            <DropdownMenuItem>
              <span className='inline-flex items-center gap-1'>
                <ExternalLink
                  className='w-4 h-4'
                  size={20}
                  strokeWidth={2.25}
                />
                Profile
              </span>
            </DropdownMenuItem>

            <DropdownMenuItem>
              <span className='inline-flex items-center gap-1'>
                <LayoutDashboard
                  className='w-4 h-4'
                  size={20}
                  strokeWidth={2.25}
                />
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
              {account && (
                <div className='w-full flex flex-col'>
                  <div className='px-2 py-1 flex flex-col'>
                    <p className='inline-flex items-center w-full justify-between gap-3 text-zinc-400 text-xs font-medium'>
                      <span className='inline-flex items-center gap-1.5'>
                        <span>
                          {summarizedAddress(account?.address, 25, 4)}
                        </span>
                      </span>
                      <span className='border border-zinc-500 p-1 rounded-lg'>
                        <Copy
                          className='w-4 h-4'
                          size={20}
                          strokeWidth={2.25}
                        />
                      </span>
                    </p>

                    <p className='inline-flex items-center gap-1  text-xs'>
                      <span>{truncate(account?.meta?.name!, 10)}</span>
                      <span className='text-lime-500'>・</span>
                      <span>{account?.meta.source}</span>
                    </p>
                  </div>
                  <DropdownMenuSeparator className='bg-zinc-700/40' />

                  <div className='px-2 py-1 rounded-md  text-zinc-400 flex items-center gap-1.5'>
                    <DisconnectLogout session={session} />
                    <WalletProfile account={account}>
                      <button className='outline-none border-2 border-zinc-500 p-1 rounded-lg'>
                        <Expand
                          size={20}
                          className='w-4 h-4'
                          strokeWidth={2.25}
                        />
                      </button>
                    </WalletProfile>
                  </div>
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;
