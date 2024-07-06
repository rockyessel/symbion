'use client';

import { InputEventType, IPage, IUserProps } from '@/types';
import { Label } from '@/components/ui/label';
import { domainURL, fileUpload, symbionURLBuilder } from '@/lib/utils/helpers';
import NextImage from '@/components/native/image';
import NativeInput from '@/components/native/input';
import { Textarea } from '@/components/ui/textarea';
import ListSelector from '@/components/common/list-selector';
import { LoaderCircle, Upload } from 'lucide-react';
import { ChangeEvent, Fragment, useState, useTransition } from 'react';
import { useAlert } from '@gear-js/react-hooks';

interface Props {
  page: IPage;
  session: IUserProps;
  handlePageChange: (event: InputEventType) => void;
  updatePage: (key: string, values: undefined | string | string[]) => void;
}

const BasicPageInformation = ({ ...props }: Props) => {
  const { page, session, handlePageChange, updatePage } = props;
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isCoverPending, startCoverTransition] = useTransition();
  const [isFaviconPending, startFaviconTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const alert = useAlert();
  const [profile, setProfile] = useState<string>(page.profile);
  const [cover, setCover] = useState<string>(page.cover);
  const [favicon, setFavicon] = useState<string>(page.favicon);

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO fix type error later
    // @ts-ignore
    const files = Array.from(event.target.files);
    if (!files) return;
    startProfileTransition(async () => {
      const response = await fileUpload(files);
      const { success, payload, msg } = response;
      if (success) {
        alert.success('Successfully upload');
        updatePage('profile', payload[0]);
        setProfile(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };
  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO fix type error later
    // @ts-ignore
    const files = Array.from(event.target.files);
    if (!files) return;
    startCoverTransition(async () => {
      const response = await fileUpload(files);
      const { success, payload, msg } = response;
      if (success) {
        alert.success('Successfully upload');
        updatePage('cover', payload[0]);
        setCover(payload[0]);
      } else {
        alert.error(msg);
      }
    });
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
        updatePage('favicon', payload[0]);
        setFavicon(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };

  // const

  return (
    <div className=''>
      <div className='max-w-2xl flex flex-col gap-1.5 px-4'>
        <div className=''>
          <p className='text-lg font-bold'>Page Branding</p>
          <span className='text-xs text-gray-500 block'>
            Upload a cover and profile image for your page.
          </span>
        </div>
        <div className='relative'>
          {cover ? (
            <div
              style={{
                backgroundRepeat: 'no-repeat',
                backgroundImage: `url(${symbionURLBuilder(cover)})`,
                backgroundPosition: 'center',
                backgroundOrigin: 'content-box',
              }}
              className='w-full rounded-lg h-40'
            >
              <input type='file' className='m-0 p-0 w-0 h-0' />
            </div>
          ) : (
            <label className='inline-flex flex-col items-center justify-center border border-dashed bg-neutral-900 rounded-lg w-full h-40 border-zinc-700 max-w-full'>
              {!isCoverPending && (
                <input
                  accept='.png, .jpg, .jpeg'
                  onChange={handleCoverChange}
                  type='file'
                  className='m-0 p-0 w-0 h-0'
                />
              )}
              {isCoverPending ? (
                <Fragment>
                  <LoaderCircle
                    className='w-4 h-4 animate-spin'
                    size={20}
                    strokeWidth={2.25}
                  />
                </Fragment>
              ) : (
                <Fragment>
                  <Upload className='w-4 h-4' size={20} strokeWidth={2.25} />
                  <span className='text-lime-600 text-sm text-center font-medium'>
                    Click to upload a cover image
                    <br />
                    (.png, .jpg, .jpeg)
                  </span>
                </Fragment>
              )}
            </label>
          )}
          <div className='p-2 absolute bottom-0'>
            {profile ? (
              <NextImage
                alt={profile}
                width={100}
                height={100}
                src={symbionURLBuilder(profile)}
                className='rounded-lg border border-zinc-700/40 max-w-full w-20 h-20'
              />
            ) : (
              <label className='inline-flex flex-col items-center justify-center rounded-lg border border-dashed bg-neutral-900 w-20 border-zinc-700 h-20'>
                {!isProfilePending && (
                  <input
                    accept='.png, .jpg, .jpeg'
                    onChange={handleProfileChange}
                    type='file'
                    className='m-0 p-0 w-0 h-0'
                  />
                )}
                {isProfilePending ? (
                  <Fragment>
                    <LoaderCircle
                      className='w-4 h-4 animate-spin'
                      size={20}
                      strokeWidth={2.25}
                    />
                  </Fragment>
                ) : (
                  <Fragment>
                    <Upload className='w-4 h-4' size={20} strokeWidth={2.25} />
                    <span className='text-lime-600 text-[0.5rem] font-medium'>
                      .png, .jpg, .jpeg
                    </span>
                  </Fragment>
                )}
              </label>
            )}
          </div>
        </div>
      </div>

      <form className='max-w-2xl grid grid-cols-1 px-4'>
        <fieldset className='w-full mt-3 flex flex-col gap-5'>
          <fieldset>
            <div className='mb-5'>
              <p className='text-lg font-bold'>Page Metadata</p>
              <span className='text-xs text-gray-500 block'>
                Complete your page metadata for better and optimized discovery.
              </span>
            </div>

            <fieldset className='max-w-2xl flex flex-col gap-5'>
              <fieldset className='grid grid-cols-2 gap-3'>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Name
                    <span className='text-xs text-gray-500 block'>
                      The name you want to call your page. (eg. Mr.Beast, Vara
                      Network)
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <NativeInput
                      label='Enter your page name'
                      type='text'
                      name='name'
                      value={page.name}
                      onChange={handlePageChange}
                      placeholder='lleryo'
                    />
                  </fieldset>
                </fieldset>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Username
                    <span className='text-xs text-gray-500 block'>
                      Provide and claim unique username for the page before
                      someone does. (eg. mrbeast, vara-network)
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <NativeInput
                      label='Enter your page username '
                      type='text'
                      name='username'
                      value={page.username}
                      onChange={handlePageChange}
                      placeholder='lleryo
                  '
                    />
                  </fieldset>
                </fieldset>
              </fieldset>

              <fieldset className='grid grid-cols-2 gap-3'>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Type
                    <span className='text-xs text-gray-500 block'>
                      The type or category of your page (e.g., Community,
                      Business, Blog).
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <NativeInput
                      label='What is your page type'
                      type='text'
                      name='pageType'
                      value={page.pageType}
                      onChange={handlePageChange}
                      placeholder='community'
                    />
                  </fieldset>
                </fieldset>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Page Tags.
                    <span className='text-xs text-gray-500 block'>
                      Tags that describe the specific focus or niche of your
                      page (e.g., JavaScript, Startups).
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <ListSelector
                      placeholderText='Type something...'
                      label='Enter focused tags'
                      onTagsChange={(values) =>
                        updatePage('focusedTags', values)
                      }
                      initialTags={page.focusedTags}
                      // fixedTags={['page.focusedTags','cat','dofg']}
                    />
                  </fieldset>
                </fieldset>
              </fieldset>

              <fieldset className='grid grid-cols-2 gap-3'>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Category
                    <span className='text-xs text-gray-500 block'>
                      The broader category your page falls under (e.g.,
                      Technology, Education).
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <NativeInput
                      label='Enter a category for your page.'
                      type='text'
                      name='category'
                      value={page.category}
                      onChange={handlePageChange}
                      placeholder='eg. Software Development'
                    />
                  </fieldset>
                </fieldset>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    General Tags.
                    <span className='text-xs text-gray-500 block'>
                      General tags related to the overall category of your page
                      (e.g., React Developers, Rust Development).
                    </span>
                  </Label>

                  <fieldset className='mt-2'>
                    <ListSelector
                      placeholderText='Type something...'
                      label='Enter a general tags for your page'
                      onTagsChange={(values) => updatePage('tags', values)}
                      initialTags={page.tags}
                    />
                  </fieldset>
                </fieldset>
              </fieldset>

              <fieldset className='grid grid-cols-2 gap-3'>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Page Email
                    <span className='text-xs text-gray-500 block'>
                      The broader category your page falls under (e.g.,
                      Technology, Education).
                    </span>
                  </Label>
                  <fieldset className='mt-2'>
                    <NativeInput
                      label='Enter a reachable email for your page.'
                      type='text'
                      name='contactEmail'
                      value={page.contactEmail}
                      onChange={handlePageChange}
                      placeholder='eg. Software Development'
                    />
                  </fieldset>
                </fieldset>
                <fieldset className='flex flex-col gap-4'>
                  <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                    Page Website.
                    <span className='text-xs text-gray-500 block'>
                      Show users your page website. (e.g.,
                      https://comapny.domain).
                    </span>
                  </Label>

                  <fieldset className='mt-2'>
                    <NativeInput
                      label='Enter your page website'
                      type='text'
                      name='website'
                      value={page.website}
                      onChange={handlePageChange}
                      placeholder='eg. https://mrbeast.com'
                    />
                  </fieldset>
                </fieldset>
              </fieldset>
            </fieldset>
          </fieldset>

          <fieldset className='pb-8'>
            <div className='mb-5'>
              <p className='text-lg font-bold'>Page SEO</p>
              <span className='text-xs text-gray-500 block'>
                Complete your page metadata for better and optimized discovery.
              </span>
            </div>

            <fieldset className='flex flex-col gap-4'>
              <fieldset>
                <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                  Favicon & Title.
                  <span className='text-xs text-gray-500 block'>
                    Add your brand icon and title to improve presence and
                    consistence cross the platform and your members.
                  </span>
                </Label>
                <div className='w-full flex items-center gap-2 mt-1'>
                  {/* // className='object-cover w-14 h-14 p-1 rounded-full border border-lime-300/40' */}
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
                          <Upload
                            className='w-4 h-4'
                            size={20}
                            strokeWidth={2.25}
                          />
                        )}
                      </label>
                    )}
                  </div>
                  <NativeInput
                    label='Enter your page title'
                    name='title'
                    value={page.title}
                    onChange={handlePageChange}
                    type='text'
                    placeholder='eg. Lleryo - Software'
                  />
                </div>
              </fieldset>

              <fieldset className='flex flex-col gap-4'>
                <Label className='font-medium h-10 inline-flex flex-col gap-1'>
                  Description.
                  <span className='text-xs text-gray-500 block'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Animi, blanditiis rem nesciunt ipsa repudiandae ipsam non id
                    ducimus quis aut! Iusto quo consequatur fugiat ab obcaecati
                    ducimus omnis, aspernatur nisi!
                  </span>
                </Label>

                <fieldset className=''>
                  <Textarea
                    name='description'
                    value={page.description}
                    onChange={handlePageChange}
                    placeholder='eg. https://mrbeast.com'
                  />
                </fieldset>
              </fieldset>
            </fieldset>
          </fieldset>
        </fieldset>
      </form>
    </div>
  );
};

export default BasicPageInformation;
