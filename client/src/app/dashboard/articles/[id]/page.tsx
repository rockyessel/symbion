import ArticleEditor from '@/components/articles/editor';
import ArticleSidebar from '@/components/common/article-sidebar';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Tabs } from '@/components/ui/tabs';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import { domainURL } from '@/lib/utils/helpers';
import { IArticle } from '@/types';
import { redirect } from 'next/navigation';

interface Props {
  params: { id: `0x${string}` };
}

const ArticleEditorPage = async ({ params: { id } }: Props) => {
  const lang = await getLang();

  const session = await getServerUser();

  if (!session) return redirect(domainURL('/did/verify'));

  const article = {} as IArticle;

  return (
    <div className='w-full h-[93vh] overflow-hidden'>
      <Tabs className='w-full h-full !border-none' defaultValue='content'>
        <div className='transition duration-200 ease-in-out w-full h-full flex items-start gap-1.5'>
          <ArticleSidebar article={article} />
          <div className='w-full h-full rounded-lg !overflow-y-auto'>
            <ScrollArea className=''>
              <ArticleEditor session={session} article={article} lang={lang} />
              <ScrollBar />
            </ScrollArea>
          </div>
        </div>
      </Tabs>
    </div>
  );
};

export default ArticleEditorPage;
