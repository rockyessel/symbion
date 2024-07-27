import UserMenu from '@/components/common/user-menu';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';

export default async function Home() {
  const lang = await getLang();
  const session = await getServerUser();

  return (
    <main className=''>
      <div className='w-full border-b border-zinc-700 border-opacity-40 h-16 px-4 py-3.5 flex items-center'>
        <div className='px-24 w-full flex items-center justify-between'>
          <p className='text-lg font-bold  leading-7'>symbion</p>
          <UserMenu session={session} lang={lang} />
        </div>
      </div>
    </main>
  );
}
