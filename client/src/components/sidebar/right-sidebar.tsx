'use client';

import { domainURL } from '@/lib/utils/helpers';
import Image from 'next/image';

const RightSidebar = () => {
  return (
    <div className='w-[30rem] h-[94vh] px-4 pt-8 pb-14 bg-muted-500 border-l border-zinc-600 border-opacity-40 flex-col gap-4 flex'>
      <div className='justify-start items-center inline-flex'>
        <p className='text-gray-400 text-sm font-normal'>
          <span className='text-lime-500 font-semibold'>Trending </span>
          Last 7 days
        </p>
      </div>
      <div className='flex items-center text-zinc-500 text-sm font-normal gap-3.5'>
        <div className='px-2 bg-lime-500 rounded-lg text-center text-black text-sm font-normal'>
          All
        </div>
        <div className='text-center'>Models</div>
        <div className='text-center'>Datasets</div>
        <div className='text-center'>Spaces</div>
      </div>
      <div className='flex flex-col pt-3 gap-3'>
        {/*  */}
        <div className='bg-zinc-700 rounded-lg shadow border border-zinc-600 border-opacity-40 flex-col flex'>
          <div className=' p-2 flex-col justify-start items-start gap-1 flex'>
            <div className=' justify-start items-center inline-flex'>
              <div className='pr-1.5 flex-col justify-start items-start inline-flex'>
                <Image
                  alt=''
                  width={100}
                  height={100}
                  className='w-3 h-3 relative rounded'
                  src={domainURL('/vercel.svg')}
                />
              </div>
              <div className='flex-col justify-start items-start inline-flex'>
                <div className="text-black text-sm font-normal font-['IBM Plex Mono']">
                  meta-llama/Meta-Llama-3-8B
                </div>
              </div>
            </div>
            <div className='pr-[3.61px] justify-center items-center inline-flex'>
              <div className='pr-1.5 flex-col justify-start items-start inline-flex'>
                <div className='flex-col justify-center items-start flex'>
                  <div className='relative'></div>
                </div>
              </div>
              <div className='text-gray-400 text-sm font-normal'>
                Text Generation
              </div>
              <div className='px-1.5 pb-[0.75px] flex-col justify-start items-start inline-flex'>
                <div className='text-gray-300 text-sm font-normal'>•</div>
              </div>
              <div className='pr-[13.83px] justify-start items-center inline-flex'>
                <div className='text-gray-400 text-sm font-normal'>
                  Updated 8 da
                </div>
              </div>
              <div className='self-stretch px-1.5 pb-[0.75px] flex-col justify-start items-start inline-flex'>
                <div className='text-gray-300 text-sm font-normal'>•</div>
              </div>
              <div className='w-3.5 self-stretch pr-0.5 flex-col justify-start items-start inline-flex'>
                <div className='w-3 h-3.5 flex-col justify-center items-start flex'>
                  <div className='w-3 h-3.5 px-[1.50px] py-[1.75px] flex-col justify-center items-center flex'></div>
                </div>
              </div>
              <div className='text-gray-400 text-sm font-normal'>1.07M</div>
              <div className='self-stretch px-1.5 pb-[0.75px] flex-col justify-start items-start inline-flex'>
                <div className='text-gray-300 text-sm font-normal'>•</div>
              </div>
              <div className='w-4 self-stretch pr-1 flex-col justify-start items-start inline-flex'>
                <div className='w-3 h-3.5 flex-col justify-center items-start flex'>
                  <div className='w-3 h-3.5 px-[0.75px] pt-[2.50px] pb-[2.12px] flex-col justify-center items-center flex'></div>
                </div>
              </div>
              <div className='text-gray-400 text-sm font-normal'>4.05k</div>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default RightSidebar;
