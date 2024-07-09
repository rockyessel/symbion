import { Button } from '@/components/ui/button';
import NextImage from '@/components/native/image';
import { BookmarkPlus, MoreVertical, TimerIcon } from 'lucide-react';
import { domainURL } from '@/lib/utils/helpers';
import { TextEditor as RenderEditor } from '@/components/editor';
import { getLang } from '@/lib/_actions/helpers';
import { content } from './d';
import { Descendant } from 'slate';

interface Props {
  params: { id: string | `0x${string}` };
}

const ArticleDetailedPage = async ({}: Props) => {
  const lang = await getLang();
  return (
    <article className='mx-auto lg:w-[60rem] mt-10'>
      <header>
        <div>
          <div className='flex flex-col sm:flex-row sm:justify-between items-start'>
            <div className='sm:flex-1'>
              <h1 className='text-5xl font-extrabold capitalize mb-0'>
                How To Persist And Access Data In Next.Js Using LocalStorage
                (TypeScript)
              </h1>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                title='Social Account'
                variant='outline'
                className='w-8 h-8 p-1 flex items-center justify-center shadow-lg rounded-lg px-2 py-2.5'
                aria-label='Bookmarks icon'
                type='button'
              >
                <BookmarkPlus />
              </Button>
              <Button
                title='Social Account'
                variant='outline'
                className='w-8 h-8 p-1 flex items-center justify-center shadow-lg rounded-lg px-2 py-2.5'
                aria-label='More options icon'
                type='button'
              >
                <MoreVertical />
              </Button>
            </div>
          </div>

          <div className='flex flex-col sm:flex-row sm:justify-between my-4 p-0'>
            <div className='flex items-center gap-2'>
              <NextImage
                src={domainURL('/token-icon.svg')}
                className='rounded-lg border border-zinc-700/40 m-0 p-0 transition-all duration-200 ease-in-out w-8 h-8'
                title='Rocky Essel'
                width={500}
                height={500}
                aria-label='User Profile: Rocky Essel'
                alt='Rocky Essel'
              />

              <div className='text-xs'>
                <p className='flex items-center m-0 p-0'>
                  <span className='inline-flex flex-col'>
                    <span>Rocky Essel</span>
                    <span>@rockyessel</span>
                  </span>
                  <span>{`・`}</span>
                  <span className='inline-flex flex-col'>
                    <span className='inline-flex items-center'>
                      <TimerIcon
                        size={20}
                        strokeWidth={2.25}
                        className='w-4 h-4'
                      />{' '}
                      20:12
                    </span>
                    <span>Dec 2, 2024</span>
                  </span>
                </p>
              </div>
            </div>

            <div className='flex items-center gap-2 text-xs sm:m-0'>
              <p className='text-rose-500 m-0 p-0'>Web Development</p>
              <span>{`・`}</span>
              <p className='m-0 p-0'> 10 Min Read</p>
            </div>
          </div>
        </div>

        <div className='w-full m-0 p-0'>
          <NextImage
            src={domainURL(
              '/3d3a3a8bb8292dee42164866ce4a6817e775296f-1280x800.png'
            )}
            className='w-full h-[25rem] m-0 p-0 rounded-lg'
            title='Article Title'
            width={500}
            height={500}
            aria-label='Article Image'
            alt='Article Title'
          />
          <i className='text-xs text-center my-0 mt-1 text-gray-500'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </i>
        </div>
      </header>

      <main>
        <RenderEditor
          readOnly
          locale={lang}
          content={content as Descendant[]}
        />
      </main>
    </article>
  );
};

export default ArticleDetailedPage;
