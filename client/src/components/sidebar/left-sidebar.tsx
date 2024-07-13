'use client';

import { domainURL } from '@/lib/utils/helpers';
import {
  BrainCircuit,
  Component,
  FileStack,
  Inbox,
  Settings2,
  User,
} from 'lucide-react';
import Link from 'next/link';

const LeftSidebar = () => {
  return (
    <section className='w-[15rem] flex flex-col items-center text-lime-500 border-r border-zinc-600 border-opacity-40 pt-10'>
      <div className='w-full flex flex-col gap-8 px-10'>
        {/* User */}
        <div>
          <div className='font-semibold'>rockyessel</div>

          <div className='w-full mt-3 text-sm font-normal text-zinc-300'>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <User className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Profile</span>
            </Link>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <Inbox className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Inbox</span>
            </Link>
            <Link
              href={domainURL('/settings')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <Settings2 className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Settings</span>
            </Link>
          </div>
        </div>

        <div>
          <div className='font-semibold'>Community</div>

          <div className='w-full mt-3 text-sm font-normal text-zinc-300'>
            <Link
              href={domainURL('/community/lleryo')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <User className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Lleryo</span>
            </Link>

            <button className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'>
              <Component className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Create</span>
            </button>
          </div>
        </div>

        <div>
          <div className='font-semibold'>Explore</div>
          <div className='w-full mt-3 text-sm font-normal text-zinc-300'>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <BrainCircuit className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Articles</span>
            </Link>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <BrainCircuit className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Events</span>
            </Link>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <BrainCircuit className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Discussion</span>
            </Link>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <BrainCircuit className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Articles</span>
            </Link>
          </div>
        </div>

        <div>
          <div className='font-semibold'>Resources</div>
          <div className='w-full mt-3 text-sm font-normal text-zinc-300'>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <User className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Help Center</span>
            </Link>
            <Link
              href={domainURL('/')}
              className='w-full inline-flex items-center gap-2.5 hover:underline outline-none border-none'
            >
              <FileStack className='w-4 h-4' strokeWidth={2.25} />
              <span className='font-normal leading-snug'>Docs</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeftSidebar;
