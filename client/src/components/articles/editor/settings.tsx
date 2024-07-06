'use client';

import { Locale } from '@/i18n.config';
import { Copyright, Info } from 'lucide-react';
import NativeInput from '@/components/native/input';
import ListSelector from '@/components/common/list-selector';
import {
  IArticle,
  InputEventType,
  IUserProps,
  StatusType,
  VisibilityType,
} from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import InfoHoverCard from '@/components/common/info-card';
import NativeTextarea from '@/components/native/textarea';
import { truncate } from '@/lib/utils/helpers';

interface Props {
  updateArticle: (key: string, values: undefined | string | string[]) => void;
  handleChange: (event: InputEventType) => void;
  article: IArticle;
  lang: Locale;
  session: IUserProps;
}

interface Option {
  name: VisibilityType | StatusType;
  info: string;
}

const getInitialOption = (
  options: Option[],
  pageOptionName: string
): Option => {
  return options.find((option) => option.name === pageOptionName) || options[0];
};

const ArticleSettings = ({ ...props }: Props) => {
  const { article, handleChange, lang, session, updateArticle } = props;

  const [visibility, setVisibility] = useState<Option>(() =>
    getInitialOption(visibilityOptions, article.visibility)
  );

  const [status, setStatus] = useState<Option>(() =>
    getInitialOption(statusOptions, article.status)
  );

  const handleVisibilityChange = (value: string) => {
    const foundVisibility = visibilityOptions.find(
      (option) => option.name === value
    );
    if (foundVisibility) {
      setVisibility(foundVisibility);
      updateArticle('visibility', foundVisibility.name);
    }
  };

  const statusChange = (value: string) => {
    const foundStatus = statusOptions.find((option) => option.name === value);
    if (foundStatus) {
      setStatus(foundStatus);
      updateArticle('status', foundStatus.name);
    }
  };

  return (
    <div className='max-w-2xl flex flex-col pl-10'>
      <div className='flex gap-2 py-1 pr-2 pl-3 text-sm leading-5 text-center'>
        <p>Metadata UI</p>
        <Info className='w-4 h-4' size={20} strokeWidth={2.25} />
      </div>

      <div className='flex flex-col'>
        <div className='flex gap-2.5 p-2.5 whitespace-nowrap'>
          <p className='inline-flex items-center gap-1.5 text-sm leading-5'>
            <Copyright className='w-4 h-4' size={20} strokeWidth={2.25} />
            <span>License</span>
          </p>

          <Select>
            <SelectTrigger className='w-full p-1 text-sm'>
              <SelectValue placeholder='Choose you license' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value='apple'>Apple</SelectItem>
                <SelectItem value='banana'>Banana</SelectItem>
                <SelectItem value='blueberry'>Blueberry</SelectItem>
                <SelectItem value='grapes'>Grapes</SelectItem>
                <SelectItem value='pineapple'>Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className='flex gap-2.5 p-2.5 whitespace-nowrap'>
          <p className='inline-flex items-center gap-1.5 text-sm leading-5'>
            <Copyright className='w-4 h-4' size={20} strokeWidth={2.25} />
            <span>Language</span>
          </p>
          <NativeInput label='Content written in?' value={lang} disabled />
        </div>
        <fieldset className='flex flex-col gap-2.5 p-2.5 whitespace-nowrap'>
          <fieldset className='inline-flex flex-col gap-1'>
            <Label className='font-medium'>Tags</Label>
            <span className='text-gray-500 text-xs'>
              The Title is used in place of your Title on search engine results
              pages, such as a Google search.
            </span>
          </fieldset>
          <ListSelector
            placeholderText='Type something...'
            label='Enter a any tags specific to your category'
            onTagsChange={(values) => updateArticle('tags', values)}
            initialTags={article.tags}
          />
        </fieldset>
      </div>

      <fieldset className='flex flex-col gap-2'>
        <Label className='font-medium h-10 inline-flex flex-col gap-1'>
          Category
          <span className='text-xs text-gray-500 block'>
            Provide and claim unique username for the page before someone does.
            (eg. mrbeast, vara-network)
          </span>
        </Label>
        <fieldset className=''>
          <NativeInput
            label='Enter a category'
            type='text'
            name='category'
            value={article.category}
            onChange={handleChange}
            placeholder='Web Development'
          />
        </fieldset>
      </fieldset>

      <fieldset className='flex flex-col gap-2'>
        <Label className='font-medium h-10 inline-flex flex-col gap-1'>
          Sub-Category
          <span className='text-xs text-gray-500 block'>
            Provide and claim unique username for the page before someone does.
            (eg. mrbeast, vara-network)
          </span>
        </Label>
        <fieldset className=''>
          <NativeInput
            label={`Enter a sub-category under ${article.category}`}
            type='text'
            name='subCategory'
            value={article.subCategory}
            onChange={handleChange}
            placeholder='JavaScript'
          />
        </fieldset>
      </fieldset>

      <fieldset className='flex flex-col gap-3'>
        <div className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Visibility
            <span className='text-xs text-gray-500 block'>
              The name you want to call your page. (e.g., Mr.Beast, Vara
              Network)
            </span>
          </Label>
          <div className='mt-1'>
            <Select onValueChange={handleVisibilityChange}>
              <SelectTrigger className='text-sm text-lime-600 font-medium w-full p-2'>
                {visibility ? (
                  <div className='flex items-center gap-2.5'>
                    <span>{visibility.name}</span>
                    <InfoHoverCard className='w-full max-w-md p-2'>
                      {visibility.info}
                    </InfoHoverCard>
                  </div>
                ) : (
                  <SelectValue placeholder='Set your page visibility' />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Page visibility</SelectLabel>
                  {visibilityOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      className='w-full'
                      value={option.name}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Status
            <span className='text-xs text-gray-500 block'>
              Provide and claim a unique username for the page before someone
              else does. (e.g., mrbeast, vara-network)
            </span>
          </Label>
          <div className='mt-1'>
            <Select onValueChange={statusChange}>
              <SelectTrigger className='text-sm text-lime-600 font-medium w-full p-2'>
                {status ? (
                  <div className='flex items-center gap-2.5'>
                    <span>{status.name}</span>
                    <InfoHoverCard className='w-full max-w-md p-2'>
                      {status.info}
                    </InfoHoverCard>
                  </div>
                ) : (
                  <SelectValue placeholder='Set your page status' />
                )}
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Page status</SelectLabel>
                  {statusOptions.map((option, index) => (
                    <SelectItem
                      key={index}
                      className='w-full'
                      value={option.name}
                    >
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      <div className='pb-12 border-b border-zinc-100 flex-col inline-flex'>
        <div className='flex-col gap-8 flex'>
          <div className='h-6 flex-col flex'>
            <div className=' text-lg font-medium leading-normal'>
              Settings - SEO
            </div>
          </div>
          <div className='flex-col gap-8 flex'>
            <fieldset className='flex-col gap-3 flex'>
              <fieldset className='inline-flex flex-col gap-1'>
                <Label className='font-medium'>Title</Label>
                <span className='text-gray-500 text-xs'>
                  The Title is used in place of your Title on search engine
                  results pages, such as a Google search. titles over 60
                  characters will be truncated. SEO titles between 40 and 50
                  characters with commonly searched words have the best
                  click-through-rates.
                </span>
              </fieldset>
              <span className=''>Title preview 114</span>
              {article.title?.length > 0 && (
                <span className='text-zinc-100 text-sm font-normal px-3 py-2 border border-zinc-700/40 bg-zinc-500 rounded justify-center inline-flex'>
                  {article.title} | by {session.name} | Symbion
                </span>
              )}
              <NativeInput
                label='Enter a short yet informative title'
                type='text'
                name='seoTitle'
                value={article.seoTitle}
                onChange={handleChange}
                placeholder={`${article.title ?? 'Title'} | by ${
                  session.name
                } | Symbion`}
              />
            </fieldset>
            <fieldset className='flex flex-col gap-2.5 p-2.5 whitespace-nowrap'>
              <fieldset className='inline-flex flex-col gap-1'>
                <Label className='font-medium'>Tags</Label>
                <span className='text-gray-500 text-xs'>
                  The Title is used in place of your Title on search engine
                  results pages, such as a Google search.
                </span>
              </fieldset>
              <ListSelector
                placeholderText='Type something...'
                label='Enter a any tags specific to your category'
                onTagsChange={(values) => updateArticle('keywords', values)}
                initialTags={article.keywords}
              />
            </fieldset>
            <fieldset className='w-full flex flex-col gap-2'>
              <fieldset>
                <Label className=''>SEO Description</Label>

                <span className='text-neutral-500 text-xs font-normal leading-tight'>
                  The SEO Description is used in place of your Subtitle on
                  search engine results pages. Good SEO descriptions utilize
                  keywords, summarize the story and are between 140-156
                  characters long.
                </span>
              </fieldset>
              <fieldset className='flex flex-col gap-1'>
                {article.description &&
                  article.description.length > 0 &&
                  article.description.length > 156 && (
                    <span className='text-black/opacity-80 text-base font-normal'>
                      Just great, you are trying to sabotage this article. Just
                      make sure your description falls between 140-156. But you
                      can still publish.
                    </span>
                  )}
                <div className='mt-2'>
                  <NativeTextarea
                    className='w-full'
                    label={`Enter a description - (${
                      article?.description?.length ?? 0
                    })`}
                    name='description'
                    value={truncate(article.description, 156)}
                    onChange={handleChange}
                    placeholder='Web Development'
                  />
                </div>
              </fieldset>
            </fieldset>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleSettings;

export const visibilityOptions: Option[] = [
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
