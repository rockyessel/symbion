import CreateBlog from '@/components/actions/create-blog';
import BlogCard from '@/components/blogs/card';
import { getServerUser } from '@/lib/_actions/did';
import { getAllOwnerBlogs } from '@/lib/_actions/gear';
import { domainURL } from '@/lib/utils/helpers';
import { redirect } from 'next/navigation';

const BlogPage = async () => {
  const session = await getServerUser();

  if (!session) return redirect(domainURL('/did/verify'));

  const blogs = (await getAllOwnerBlogs(session.address)) || [];

  const isBlogEmpty = blogs.length === 0;

  console.log('blogs: ', blogs);

  return (
    <div className='w-full p-10 flex flex-col gap-10'>
      <nav className='inline-flex items-center justify-between'>
        <CreateBlog />
      </nav>

      <div className='w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-10'>
        {isBlogEmpty ? (
          <div></div>
        ) : (
          <div>
            {blogs.map((blog, index) => (
              <BlogCard blog={blog} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
