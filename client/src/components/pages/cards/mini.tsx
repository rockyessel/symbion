'use client';

import { cn, domainURL, truncate } from '@/lib/utils/helpers';
import { MoreHorizontal, Plus, Puzzle, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

interface Props {
  className?: string;
}

const CommunityMiniCard = ({ className }: Props) => {
  return (
    <div
      className={cn(
        'bg-zinc-700 h-full rounded-lg shadow border border-zinc-600 border-opacity-40 flex-col flex',
        className
      )}
    >
      <div className=' p-2 flex-col justify-start items-start gap-1 flex'>
        <div className='w-full flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Image
              alt=''
              width={100}
              height={100}
              className='w-6 h-6 relative rounded'
              src={domainURL('/wallets/nova.svg')}
            />
            <div className='flex-col justify-start items-start inline-flex'>
              <p className='inline-flex items-center text-lime-500'>
                <span className=' font-normal'>kGkq4</span>/
                <span className='font-bold'>Meta-Llama-3-8B</span>
                <div className='ml-2 rounded-md text-xs border-none outline-none bg-lime-600 text-neutral-900 font-medium'>
                  <Plus size={20} strokeWidth={2.25} className='w-4 h-4' />
                </div>
              </p>
            </div>
          </div>

          <div className='flex items-center'>
            <MoreHorizontal size={20} strokeWidth={2.25} className='w-4 h-4' />
          </div>
        </div>

        <p className='my-2 text-sm text-gray-300'>
          {truncate(
            `Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Optio distinctio tempore molestias qui fugit aperiam obcaecati
                  doloremque sapiente voluptatem temporibus quibusdam aspernatur
                  ea perspiciatis unde fugiat accusamus itaque, pariatur earum?`,
            128
          )}
        </p>

        <div className='w-full flex justify-between items-center'>
          <div className='flex items-center gap-3'>
            <p className='text-gray-400 text-sm font-normal inline-flex items-center gap-1'>
              <Puzzle strokeWidth={2.25} size={20} className='w-4 h-4' />
              <span className='text-gray-300 text-xs font-normal'>•</span>
              <span>Blockchain</span>
            </p>
            <p className='text-gray-400 text-sm font-normal inline-flex items-center gap-1'>
              <Users strokeWidth={2.25} size={20} className='w-4 h-4' />
              <span className='text-gray-300 text-xs font-normal'>•</span>
              <span>1.07M</span>
            </p>
          </div>

          <div className='text-gray-400 text-sm font-normal border border-neutral-900/40 rounded-md p-1'>
            <TrendingUp
              strokeWidth={2.25}
              size={20}
              className='w-4 h-4 text-lime-600'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityMiniCard;
