'use client';

import Link from 'next/link';
import {
  Bell,
  CircleUser,
  Copy,
  Expand,
  ExternalLink,
  FileKey,
  Home,
  Languages,
  LayoutDashboard,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { IUserProps } from '@/types';
import { Locale } from '@/i18n.config';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import {
  cn,
  downloadEncryptedToken,
  summarizedAddress,
  truncate,
} from '@/lib/utils/helpers';
import NextImage from '@/components/native/image';
import LocaleSwitcher from '@/components/common/locale-switcher';
import DisconnectLogout from '@/components/actions/disconnect-logout';
import WalletProfile from '@/components/wallet/profile';
import WalletPopoverProfile from '@/components/wallet/popover-profile';

interface Props {
  session: IUserProps;
  lang: Locale;
}

const Header = ({ session, lang }: Props) => {
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
    <header className='flex h-14 items-center gap-4 border-b border-zinc-700/40 px-4 lg:h-[60px] lg:px-6'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='shrink-0 md:hidden'>
            <Menu className='h-5 w-5' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side='left' className='flex flex-col'>
          <nav className='grid gap-2 text-lg font-medium'>
            <Link
              href='#'
              className='flex items-center gap-2 text-lg font-semibold'
            >
              <Package2 className='h-6 w-6' />
              <span className='sr-only'>Acme Inc</span>
            </Link>
            <Link
              href='#'
              className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
            >
              <Home className='h-5 w-5' />
              Dashboard
            </Link>
            <Link
              href='#'
              className='mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground'
            >
              <ShoppingCart className='h-5 w-5' />
              Orders
              <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                6
              </Badge>
            </Link>
            <Link
              href='#'
              className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
            >
              <Package className='h-5 w-5' />
              Products
            </Link>
            <Link
              href='#'
              className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
            >
              <Users className='h-5 w-5' />
              Customers
            </Link>
            <Link
              href='#'
              className='mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground'
            >
              <LineChart className='h-5 w-5' />
              Analytics
            </Link>
          </nav>
          <div className='mt-auto'>
            <Card>
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
                <CardDescription>
                  Unlock all features and get unlimited access to our support
                  team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button size='sm' className='w-full'>
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
      <div className='w-full flex-1'>
        <form>
          <div className='relative'>
            <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input
              type='search'
              placeholder='Search products...'
              className='w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3'
            />
          </div>
        </form>
      </div>
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
          className='max-w-2xl w-full bg-neutral-900 border-zinc-700/40 text-zinc-500'
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
                      <span>{summarizedAddress(account?.address, 25, 4)}</span>
                    </span>
                    <span className='border border-zinc-500 p-1 rounded-lg'>
                      <Copy className='w-4 h-4' size={20} strokeWidth={2.25} />
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
    </header>
  );
};

export default Header;
