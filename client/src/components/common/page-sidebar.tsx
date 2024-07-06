'use client';

import { GlobalState, pageListsItem } from '@/lib/utils/constants';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { cn, createSlug } from '@/lib/utils/helpers';
import { useSnapshot } from 'valtio';
import { IPage } from '@/types';

import { Button } from '@/components/ui/button';

interface Props {
  page: IPage;
  sidebarLists: []
}

const ProjectSidebarDetails = ({ page,sidebarLists }: Props) => {
  const [segment, setSegment] = useState<string>();

  const [isPending, startTransition] = useTransition();
  const snap = useSnapshot(GlobalState);

  const router = useRouter();

  return (
    snap.subNavbarState && (
      <aside className='relative h-full flex  flex-col justify-between px-2 py-2 border border-zinc-700/40 w-[280px]'>
        <div>
          {/* <p className='text-xl font-semibold'>Project Settings</p> */}
          <nav className='flex flex-col justify-between gap-1.5 text-sm text-zinc-500'>
            <TabsList className='w-full flex flex-col gap-2.5'>
              {pageListsItem.map((item, index) => (
                <TabsTrigger
                  
                  value={createSlug(item.name.toLocaleLowerCase())}
                  key={index}
                  className={cn(
                    ' z-[100]',
                    segment === item.name.toLocaleLowerCase()
                      ? 'font-semibold text-primary'
                      : '',
                    'w-full rounded-lg text-sm p-2 inline-flex items-center gap-2'
                  )}
                >
                  <span className='w-full inline-flex items-start gap-2'>
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </nav>
        </div>
        <Button variant='outline'>
          {isPending ? 'Loading...' : 'Delete Project'}
        </Button>
      </aside>
    )
  );
};

export default ProjectSidebarDetails;
