import { Database, Globe, MoreHorizontal, Settings } from 'lucide-react';
import Link from 'next/link';
import { IBlog } from '@/types';
import { domainURL, subdomainURL } from '@/lib/utils/helpers';
import TransferBlog from '../actions/transfer-blog';
import BlogDropdownMenu from './menu';

interface Props {
  blog: IBlog;
}

const BlogCard = ({ blog }: Props) => {
  return (
    <div className='flex flex-col gap-4 rounded-lg border border-zinc-700/40 p-2 bg-zinc-800'>
      <div className='flex justify-between'>
        <div className='flex items-start gap-3'>
          <div className='inline-flex items-center justify-center w-12 h-12 p-2 rounded-full border'>
            <Globe size={20} strokeWidth={1} />
          </div>
          <p className='flex grow basis-[0%] flex-col'>
            <span className='text-gray-200 font-medium leading-6 whitespace-nowrap'>
              {blog.title}
            </span>
            <span className='text-neutral-400 text-sm leading-5 whitespace-nowrap'>
              {subdomainURL(blog.subdomain)}
            </span>
          </p>
        </div>
        <div className='items-stretch self-center flex gap-4 my-auto'>
          <Link href={domainURL(`/dashboard/blogs/${blog.id}`)}>
            <Settings size={20} strokeWidth={1} />
          </Link>
          <BlogDropdownMenu blogId={blog.id} />
        </div>
      </div>

      <div className='flex items-start justify-between'>
        <p className='font-medium'>{blog.subdomain}</p>

        <div className='inline-flex text-sm items-center gap-1'>
          <Link
            className='border border-neutral-900/40 rounded-md px-2 py-1'
            href={domainURL(`/dashboard/blogs/${blog.id}`)}
          >
            Manage
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
