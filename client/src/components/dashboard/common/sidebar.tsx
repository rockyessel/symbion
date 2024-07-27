'use client';

import Link from 'next/link';
import {
  Bell,
  Home,
  Package2,
  Mailbox,
  Settings,
  BetweenHorizontalEnd,
  Rss,
  Globe,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { domainURL, cn } from '@/lib/utils/helpers';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const [segment, setSegment] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    if (lastSegment) setSegment(lastSegment);
  }, [pathname]);

  console.log('segment: ', segment);

  return (
    <div className='hidden border-r border-zinc-700/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b border-zinc-700/40 px-4 lg:h-[60px] lg:px-6'>
          <Link href='/' className='flex items-center gap-2 font-semibold'>
            <Package2 className='h-6 w-6' />
            <span className=''>Acme Inc</span>
          </Link>
          <Button variant='outline' size='icon' className='ml-auto h-8 w-8'>
            <Bell className='h-4 w-4' />
            <span className='sr-only'>Toggle notifications</span>
          </Button>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              href={domainURL('/dashboard')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'dashboard' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <Home className='h-4 w-4' />
              Dashboard
            </Link>
            <Link
              href={domainURL('/dashboard/blogs')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'blogs' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <Rss className='h-4 w-4' />
              Blogs
              <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
                6
              </Badge>
            </Link>
            <Link
              href={domainURL('/dashboard/domains')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'domains' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <Globe className='h-4 w-4' />
              Domains{' '}
            </Link>
            <Link
              href={domainURL('/dashboard/newsletters')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'newsletters' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <Mailbox className='h-4 w-4' />
              Newsletters
            </Link>
            <Link
              href={domainURL('/dashboard/data')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'data' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <BetweenHorizontalEnd className='h-4 w-4' />
              Data
            </Link>
          </nav>
        </div>
        <div className='mt-auto'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              href={domainURL('/dashboard/settings')}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2  transition-all',
                'settings' === segment
                  ? 'bg-zinc-700/40 text-lime-600'
                  : 'text-muted-foreground hover:text-lime-600'
              )}
            >
              <Settings className='h-4 w-4' />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
