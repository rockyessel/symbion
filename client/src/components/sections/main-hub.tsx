'use client';

import { Locale } from '@/i18n.config';
import CommunityMiniCard from '../pages/cards/mini';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useEffect } from 'react';
import { getAllPages } from '@/lib/_actions/gear';

interface Props {
  locale: Locale;
}

const CustomButtonGroupAsArrows = ({
  next,
  previous,
  gotToSlide,
  ...rest
}: any) => {
  return (
    <div>
      <button onClick={() => previous()}>Previous</button>
      <button onClick={() => next()}>Next</button>
    </div>
  );
};

const sub = ['explore', 'articles', 'events', 'collections', 'pages', 'posts'];

const MainHub = () => {
  useEffect(() => {
    const f = async () => {
      const ds = await getAllPages();

      console.log('response: ', ds);
    };

    f();
  }, []);

  return (
    <div className='relative grow p-8 pb-14 flex flex-col overflow-x-hidden'>
      {/* Sub-Header */}
      <ul className='flex items-start text-zinc-300 gap-3.5 text-sm font-bold'>
        <li className='px-2 py-0.5 bg-lime-500 text-black rounded-lg text-center text-sm '>
          Explore
        </li>
        <li className='text-center text-zinc-500 hover:text-zinc-400'>
          Articles
        </li>
        <li className='text-center text-zinc-500 hover:text-zinc-400'>
          Events
        </li>
        <li className='text-center text-zinc-500 hover:text-zinc-400'>
          Collections
        </li>
        <li className='text-center text-zinc-500 hover:text-zinc-400'>
          Community
        </li>
        <li className='text-center text-zinc-500 hover:text-zinc-400'>Posts</li>
      </ul>

      {/* Default Message */}
      <div className='mt-5 w-full py-4 flex-col gap-3 flex'>
        {/* Communities section */}
        <div className=''>
          <div className='mb-5 text-base font-bold uppercase leading-none'>
            Top Communities
          </div>
          <div className='w-full relative h-36 flex'>
            <div className='w-full flex items-start h-full gap-3 relative'>
              <div className='w-20 h-full p-4  rounded-lg bg-gradient-to-tr from-lime-500 via-lime-700 to-lime-900' />
              <div className='!relative w-full'>
                <Carousel
                  additionalTransfrom={0}
                  arrows={false}
                  autoPlaySpeed={3000}
                  className=''
                  customButtonGroup={<CustomButtonGroupAsArrows />}
                  draggable
                  focusOnSelect={false}
                  minimumTouchDrag={80}
                  pauseOnHover
                  renderArrowsWhenDisabled={false}
                  renderButtonGroupOutside
                  responsive={{
                    desktop: {
                      breakpoint: { max: 3000, min: 1024 },
                      items: 1,
                      partialVisibilityGutter: 40,
                    },
                    mobile: {
                      breakpoint: { max: 464, min: 0 },
                      items: 1,
                      partialVisibilityGutter: 30,
                    },
                    tablet: {
                      breakpoint: { max: 1024, min: 464 },
                      items: 2,
                      partialVisibilityGutter: 30,
                    },
                  }}
                  sliderClass='w-full gap-3'
                  swipeable
                >
                  {Array.from({ length: 10 }).map((_, index) => (
                    <CommunityMiniCard className='w-[25rem]' key={index} />
                  ))}
                </Carousel>
              </div>
            </div>
          </div>
        </div>

        {/* Articles section */}
        <div className='mt-10'>
          <div className='mb-5 text-base font-bold uppercase leading-none'>
            Top Articles
          </div>
          <div className='w-full flex'>
            <div className='w-full grid grid-cols-8 grid-rows-7 gap-5'>
              <div className='bg-gradient-to-r from-violet-600 to-indigo-600 col-span-6 row-span-3'>
                1
              </div>
              <div className='bg-gradient-to-r from-violet-600 to-indigo-600 col-span-3 row-span-2 row-start-4'>
                2
              </div>
              <div className='bg-gradient-to-r from-violet-600 to-indigo-600 col-span-3 row-span-2 col-start-4 row-start-4'>
                3
              </div>
              <div className='bg-gradient-to-r from-violet-600 to-indigo-600 col-span-3 row-span-2 row-start-6'>
                4
              </div>
              <div className='bg-gradient-to-r from-violet-600 to-indigo-600 col-span-3 row-span-2 col-start-4 row-start-6'>
                5
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHub;
