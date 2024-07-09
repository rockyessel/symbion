'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSendBlogMessage } from '@/hooks/gear/blogs/useSendMessage';
import { getClientUser } from '@/hooks/useGetClientUser';
import { BlogInit } from '@/lib/utils/constants';
import { InputEventType, Option } from '@/types';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { LibraryBig, LoaderCircle, Upload } from 'lucide-react';
import { ChangeEvent, Fragment, useState, useTransition } from 'react';
import OptionSelector from '../common/option-selector';
import NativeInput from '../native/input';
import NextImage from '../native/image';
import {
  createSlug,
  fileUpload,
  symbionURLBuilder,
  truncate,
} from '@/lib/utils/helpers';
import NativeTextarea from '../native/textarea';

const CreateBlog = () => {
  const [blog, setBlog] = useState(BlogInit);
  const [file, setFile] = useState<File>();
  const [favicon, setFavicon] = useState<string>('');
  const [isFaviconPending, startFaviconTransition] = useTransition();

  console.log('blog :', blog);
  const alert = useAlert();
  const { account } = useAccount();
  const handleOnChange = (event: InputEventType) => {
    const { target } = event;
    setBlog((previousBlog) => ({
      ...previousBlog,
      [target.name]: target.value,
    }));
  };

  const updateBlog = (key: string, values: undefined | string | string[]) => {
    setBlog((prevBlog) => ({
      ...prevBlog,
      [key]: values,
    }));
  };

  const handleFaviconChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO fix type error later
    // @ts-ignore
    const files = Array.from(event.target.files);
    if (!files) return;
    startFaviconTransition(async () => {
      const response = await fileUpload(files);
      const { success, payload, msg } = response;
      if (success) {
        alert.success('Successfully upload');
        updateBlog('favicon', payload[0]);
        setFavicon(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };

  const currentUser = getClientUser();
  console.log('currentUser: ', currentUser);
  const sendMessage = useSendBlogMessage();

  const handleCreateBlog = async () => {
    if (!currentUser) {
      alert.error('Sign-in please. To perform this action');
      return;
    }

    if (!account) {
      alert.error('Please connect your wallet.');
      return;
    }

    const { id, ...props } = blog;

    const payload = {
      Create: {
        ...props,
        owner: currentUser.address,
        createdBy: currentUser.address,
      },
    };

    sendMessage({
      payload,
      value: 2000000000000,
      keepAlive: true,
      onSuccess(messageId) {
        console.log('messageId: ', messageId);
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className='bg-gray-950 text-white border p-2 rounded-lg text-md font-medium inline-flex items-start gap-1'>
          <LibraryBig size={20} color='#409158' strokeWidth={1} /> Create Blog
        </button>
      </DialogTrigger>
      <DialogContent className='max-w-2xl'>
        <DialogHeader>
          <DialogTitle>Create your blog.</DialogTitle>
          <DialogDescription>
            {`Don't worry you can make changes to it later. So let's start with name and subdomain.`}
          </DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-4'>
          <fieldset className='w-full flex items-center gap-2 mt-1'>
            <div className=''>
              {favicon ? (
                <NextImage
                  alt={favicon}
                  width={100}
                  height={100}
                  src={symbionURLBuilder(favicon)}
                  className='object-cover w-14 h-14 p-1 rounded-full border border-lime-300/40'
                />
              ) : (
                <label className='inline-flex flex-col items-center justify-center rounded-full border border-dashed bg-neutral-900 w-14 border-zinc-700 h-14'>
                  {!isFaviconPending && (
                    <input
                      accept='.png, .jpg, .jpeg'
                      onChange={handleFaviconChange}
                      type='file'
                      className='m-0 p-0 w-0 h-0'
                    />
                  )}

                  {isFaviconPending ? (
                    <Fragment>
                      <LoaderCircle
                        className='w-4 h-4 animate-spin'
                        size={20}
                        strokeWidth={2.25}
                      />
                    </Fragment>
                  ) : (
                    <Upload className='w-4 h-4' size={20} strokeWidth={2.25} />
                  )}
                </label>
              )}
            </div>
            <NativeInput
              value={blog.title}
              name='title'
              label='Enter blog name'
              onChange={handleOnChange}
              placeholder="What's your blogs name. eg. RockyEssel"
              className=''
            />
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <fieldset className='grid grid-cols-2 gap-2'>
              <fieldset>
                <Label className='mb-4 font-medium h-10 inline-flex flex-col gap-1'>
                  Niche
                  <span className='text-xs text-gray-500 block'>
                    The name you want to call your page. (e.g., Mr.Beast, Vara
                    Network)
                  </span>
                </Label>
                <NativeInput
                  value={blog.niche}
                  name='niche'
                  label='Enter your focused niche'
                  onChange={handleOnChange}
                  placeholder='Enter your blog niche.'
                  className='mt-2'
                />
              </fieldset>
              <fieldset>
                <Label className='mb-4 font-medium h-10 inline-flex flex-col gap-1'>
                  Category
                  <span className='text-xs text-gray-500 block'>
                    The name you want to call your page. (e.g., Mr.Beast, Vara
                    Network)
                  </span>
                </Label>
                <NativeInput
                  value={blog.category}
                  name='category'
                  label='Enter your focused category'
                  onChange={handleOnChange}
                  placeholder='Enter your blog category.'
                  className='mt-2'
                />
              </fieldset>
            </fieldset>
            <span className='text-xs text-blue-500'>Learn more</span>
          </fieldset>
          <fieldset className='grid grid-cols-2 gap-2'>
            <OptionSelector
              defaultOptionName={BlogInit.visibility}
              options={blogOptions}
              optionTitle='Visibility'
              subDescription='The name you want to call your page. (e.g., Mr.Beast, Vara Network)'
              onChange={(visibility) => updateBlog('visibility: ', visibility)}
            />

            <OptionSelector
              defaultOptionName={BlogInit.status}
              options={statusOptions}
              optionTitle='Status'
              subDescription='The name you want to call your page. (e.g., Mr.Beast, Vara Network)'
              onChange={(status) => updateBlog('status: ', status)}
            />
          </fieldset>

          <fieldset className='flex flex-col gap-2'>
            <Label>Subdomain name</Label>

            <fieldset className='inline-flex items-start'>
              <Input
                name='subdomain'
                value={createSlug(blog.subdomain)}
                onChange={handleOnChange}
                placeholder='Get your own unique subdomain name.'
                className='!border-r-none outline-none rounded-md rounded-r-none'
              />
              <label className='flex-1 h-10 text-gray-500 text-sm whitespace-nowrap px-3.5 py-2 rounded-md rounded-l-none'>
                .symbion.blog
              </label>
            </fieldset>
          </fieldset>

          <fieldset className='w-full flex flex-col gap-2'>
            <fieldset>
              <Label className=''>Description</Label>

              <span className='text-neutral-500 text-xs font-normal leading-tight'>
                The SEO Description is used in place of your Subtitle on search
                engine results pages. Good SEO descriptions utilize keywords,
                summarize the story and are between 140-156 characters long.
              </span>
            </fieldset>
            <fieldset className='flex flex-col gap-1'>
              <div className='mt-2'>
                <NativeTextarea
                  className='w-full'
                  label={`Enter a description - (${
                    blog.description?.length ?? 0
                  })`}
                  name='description'
                  value={truncate(blog.description, 156)}
                  onChange={handleOnChange}
                  placeholder='Web Development'
                />
              </div>
            </fieldset>
          </fieldset>
        </form>
        <DialogFooter>
          <Button
            onClick={() => {
              handleCreateBlog();
            }}
            type='submit'
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateBlog;

export const blogOptions: Option[] = [
  {
    name: 'Public',
    info: 'Public pages appear on the feeds, and outside the platform, and anyone can join.',
  },
  {
    name: 'Private',
    info: 'Private pages appear on feeds and outside the platform. But members can only be added by the owner or admins.',
  },
  {
    name: 'Restricted',
    info: 'Restricted pages are private and can only be found with links, which use addresses and not slugs.',
  },
];

export const statusOptions: Option[] = [
  {
    name: 'Active',
    info: 'Active pages are accessible and visible to the intended audience.',
  },
  {
    name: 'Inactive',
    info: 'Inactive pages are hidden and not accessible to the audience.',
  },
  {
    name: 'Archived',
    info: 'Archived pages are saved for future reference and are not active.',
  },
];
