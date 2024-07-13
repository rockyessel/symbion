import { getServerUser } from '@/lib/_actions/did';
import { getOwnerBlogById } from '@/lib/_actions/gear';
import { domainURL } from '@/lib/utils/helpers';
import { AddressType } from '@/types';
import { notFound, redirect } from 'next/navigation';

interface Props {
  params: { blogId: AddressType };
}

const BlogPageDashboard = async ({ params: { blogId } }: Props) => {
  const session = await getServerUser();
  const blog = await getOwnerBlogById(blogId);

  if (!blog) return notFound();
  if (!session) return redirect(domainURL('/did/verify'));

  return <div>BlogIdPageDashboard:{blog.title}</div>;
};

export default BlogPageDashboard;
