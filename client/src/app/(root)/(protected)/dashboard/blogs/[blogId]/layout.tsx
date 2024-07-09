import { ReactNode } from 'react';
import {
  domainURL,
  subdomainURL,
  symbionURLBuilder,
} from '@/lib/utils/helpers';
import { getServerUser } from '@/lib/_actions/did';
import { getLang } from '@/lib/_actions/helpers';
import DashboardHeader from '@/components/common/dashboard-header';
import DashboardSidebar from '@/components/common/dashboard-sidebar';
import { redirect } from 'next/navigation';
import { AddressType } from '@/types';
import { Metadata } from 'next';
import { getOwnerBlogById } from '@/lib/_actions/gear';
interface Props {
  children: ReactNode;
  params: { blogId: AddressType; articleId: AddressType };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  if (params) {
    const { blogId, articleId } = params;

    if (!blogId || !articleId)
      return {
        title: 'Symbion - Dashboard',
        description: 'Manage all your blogs here.',
      };

    const blog = await getOwnerBlogById(blogId);
    const lang = await getLang();
    return {
      openGraph: {
        type: 'website',
        description: blog.description,
        locale: lang,
        title: blog.title,
        siteName: 'Symbion',
        url: subdomainURL(blog.subdomain),
        images: [blog.favicon],
      },
      keywords: blog.keywords.join(','),
      category: blog.category,
      title: `${blog.title} - ${blog.category}`,
      description: blog.description,
      icons: {
        icon: [
          {
            media: '(prefers-color-scheme: light)',
            url: symbionURLBuilder(blog.favicon),
            href: symbionURLBuilder(blog.favicon),
          },
          {
            media: '(prefers-color-scheme: dark)',
            url: symbionURLBuilder(blog.favicon),
            href: symbionURLBuilder(blog.favicon),
          },
        ],
      },
    };
  }

  return {
    title: 'Symbion - Dashboard',
    description: 'Manage all your blogs here.',
  };
}

const RootLayoutDashboard = async ({ children, params }: Props) => {
  const session = await getServerUser();
  console.log('params: ', params);
  if (!session) return redirect(domainURL('/did/verify'));

  const lang = await getLang();

  return (
    <main className='h-full w-full bg-neutral-900 flex items-start bg-muted/40'>
      <DashboardSidebar blogId={params?.blogId} />
      {children}
    </main>
  );
};

export default RootLayoutDashboard;
