'use client';

import { Descendant } from 'slate';
import { Locale } from '@/i18n.config';
import { Label } from '@/components/ui/label';
import { useAlert } from '@gear-js/react-hooks';
import { TextEditor } from '@/components/editor';
import NativeInput from '@/components/native/input';
import { LoaderCircle, Upload } from 'lucide-react';
import { IArticle, InputEventType, IUserProps } from '@/types';
import { ChangeEvent, Fragment, useState, useTransition } from 'react';
import { createSlug, fileUpload, returnDescendant, symbionURLBuilder } from '@/lib/utils/helpers';
import NextImage from '@/components/native/image';


interface Props {
  updateArticle: (key: string, values: undefined | string | string[]) => void;
  handleChange: (event: InputEventType) => void;
  article: IArticle;
  lang: Locale;
  session: IUserProps;
}

const ArticleContent = ({ ...props }: Props) => {
  const { article, handleChange, updateArticle, lang, session } = props;
  const [isCoverPending, startCoverTransition] = useTransition();
const [content, setContent] = useState(returnDescendant(article.content));
  const [cover, setCover] = useState(article.cover);
  const alert = useAlert();

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
        updateArticle('cover', payload[0]);
        setCover(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };

  const onChange = (value: Descendant[]) => {
    updateArticle('content', JSON.stringify(value));
    console.log('value: ', value);
  };
  return (
    <div className='px-28 flex flex-col gap-10 mt-5'>
      <div className=''></div>

      {/*  */}
      <div className='flex flex-col py-4 gap-2.5'>
        <fieldset className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Title
            <span className='text-xs text-gray-500 block'>
              Provide a an SEO title for your article.
            </span>
          </Label>
          <fieldset className='mt-1'>
            <NativeInput
              value={article.title}
              onChange={handleChange}
              label='Enter article title'
              type='text'
              name='title'
              placeholder=''
            />
          </fieldset>
        </fieldset>
        <fieldset className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Slug
            <span className='text-xs text-gray-500 block'>
              Provide a an SEO title for your article.
            </span>
          </Label>
          <fieldset className='mt-1'>
            <NativeInput
              value={createSlug(article.title)}
              onChange={handleChange}
              label='Enter article title'
              type='text'
              name='slug'
              placeholder={createSlug(
                'How to self-improve and stop procrastination'
              )}
            />
          </fieldset>
        </fieldset>

        <fieldset>
          <div className=''>
            <p className='font-medium'>Article Image</p>
            <span className='text-xs mt-2 text-gray-500 block'>
              Upload a cover and profile image for your page.
            </span>
          </div>

          {cover && (
            <NextImage
              width={100}
              height={100}
              alt={article.title}
              src={symbionURLBuilder(cover)}
              className='rounded-lg border border-zinc-700/40 object-cover object-center max-w-full w-full h-40'
            />
          )}

          {!cover?.length && (
            <label className='inline-flex flex-col items-center justify-center border border-dashed bg-neutral-900 rounded-lg w-full h-40 border-zinc-700 max-w-full'>
              {!isCoverPending && (
                <input
                  accept='.png, .jpg, .jpeg'
                  type='file'
                  onChange={handleCoverChange}
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
        </fieldset>
      </div>

      <div className='border border-zinc-700/40 rounded-lg p-2'>
        <TextEditor initialValue={content} onChange={onChange} locale={lang} />
      </div>
    </div>
  );
};

export default ArticleContent;
