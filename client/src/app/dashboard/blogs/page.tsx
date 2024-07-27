import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { domainURL } from '@/lib/utils/helpers';
import NativeImage from '@/components/native/image';
import CreateBlog from '@/components/actions/create-blog';
import OptionSelector from '@/components/common/option-selector';
import { BlogInit, blogOptions, statusOptions } from '@/lib/utils/constants';
import KeyCard from '@/components/dashboard/blog/key-card';

const BlogsPage = () => {
  return (
    <section className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='w-full flex items-center justify-between'>
        <div className='w-full flex-1'>
          <form>
            <div className='relative'>
              <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />
              <Input
                type='search'
                placeholder='Search through your blogs...'
                className='w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3'
              />
            </div>
          </form>
        </div>

        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <OptionSelector
              defaultOptionName={BlogInit.visibility}
              options={blogOptions}
            />
            <OptionSelector
              defaultOptionName={BlogInit.status}
              options={statusOptions}
            />
          </div>

          <CreateBlog />
        </div>
      </div>

      <div className=''>
        <p>Recent Generated Key</p>
        <div>
          <KeyCard />
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default BlogsPage;
