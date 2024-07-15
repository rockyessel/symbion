import UserMenu from '@/components/common/user-menu';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';

export default async function Home() {
  const lang = await getLang();
  const session = await getServerUser();

  return (
    <main className=''>
      <div className='w-full border-b border-zinc-700 border-opacity-40 h-16 px-4 py-3.5 flex items-center'>
        <div className='px-24 w-full flex items-center'>
          <div className='grow shrink basis-0 h-9 justify-start items-center flex'>
            <div className='pr-6 flex-col justify-start items-start inline-flex'>
              <div className='text-lg font-bold  leading-7'>symbion</div>
            </div>
          </div>
          <div className='flex-col justify-start items-start inline-flex'>
            <div className='self-stretch justify-start items-center inline-flex'>
              <div className='pl-2 text-base font-normal leading-normal p-2'>
                <UserMenu session={session} lang={lang} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
