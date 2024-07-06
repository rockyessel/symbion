'use client';

import { cn } from '@/lib/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const DashboardSidebar = () => {
  const [segment, setSegment] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    console.log('lastSegment: ', lastSegment);
    if (lastSegment) setSegment(lastSegment);
  }, [pathname]);

  console.log('segment: ', segment);
  const top = ['overview', 'pages', 'articles'];
  const down = ['settings'];

  return (
    <div className='!w-[280px] hidden md:flex bg-neutral-900 flex-col justify-between h-screen py-5 sticky top-0 border-r border-zinc-700/40'>
      <ul className='space-y-1 px-1'>
        {top.map((item, index) => (
          <li key={index}>
            {item === 'overview' ? (
              <Link
                href='/dashboard'
                className={cn(
                  'block rounded-md px-4 py-3 text-sm font-medium text-gray-700 capitalize',
                  'dashboard' === segment
                    ? 'bg-lime-500 font-bold'
                    : 'text-zinc-400 hover:text-zinc-500'
                )}
              >
                {item}
              </Link>
            ) : (
              <Link
                href={`/dashboard/${item}`}
                className={cn(
                  'block rounded-md px-4 py-3 text-sm font-medium text-gray-700 capitalize hover:',
                  item === segment
                    ? 'bg-lime-500 font-bold'
                    : 'text-zinc-400 hover:text-zinc-500'
                )}
              >
                {item}
              </Link>
            )}
          </li>
        ))}
      </ul>
      <ul className='space-y-1 px-4'>
        {down.map((item, index) => (
          <li key={index}>
            <Link
              href={`/dashboard/${item}`}
              className={cn(
                'block rounded-md px-4 py-3 text-sm font-medium text-gray-700 capitalize hover:',
                item === segment
                  ? 'bg-lime-500 font-bold'
                  : 'text-zinc-400 hover:text-zinc-500'
              )}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebar;
