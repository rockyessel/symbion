'use client';

import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useAlert } from '@gear-js/react-hooks';
import { Cloudy, Plus, Trash } from 'lucide-react';
import { cn, truncate } from '@/lib/utils/helpers';
import { CaretSortIcon } from '@radix-ui/react-icons';
import { Fragment, useEffect, useState } from 'react';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

interface Props {
  fixedTags?: string[];
  allowCustomTags?: boolean;
  onTagsChange: (tags: string[]) => void;
  maxTags?: number;
  label: string;
  initialTags?: string[];
  placeholderText: string;
}

const ListSelector = ({
  fixedTags = [],
  allowCustomTags = false,
  onTagsChange,
  maxTags,
  label,
  initialTags = [],
  placeholderText,
}: Props) => {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [popoverOpen, setPopoverOpen] = useState(false);
  const alert = useAlert();

  useEffect(() => {
    if (typeof window !== 'undefined' && initialTags.length > 0) {
      setTags([...initialTags]);
    }
    return;
  }, [initialTags]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      onTagsChange(tags);
    }
    return;
    // @ts-ignore
  }, [tags]);

  const addTag = (tag: string) => {
    if (!tag.trim()) {
      alert.error('Cannot add an empty value.');
      return;
    }
    if (tags.includes(tag)) {
      alert.error(`Tag "${tag}" is already added.`);
      return;
    }
    if (maxTags && tags.length >= maxTags) {
      alert.error(`Cannot add more than ${maxTags} tags.`);
      return;
    }
    setTags([...tags, tag]);
    alert.success(`Tag "${tag}" added.`);
    setInputValue('');
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
    alert.info(`Tag "${tag}" removed.`);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (
      value.endsWith(',') ||
      (event.nativeEvent instanceof KeyboardEvent &&
        event.nativeEvent.key === 'Enter')
    ) {
      const newTag = value.slice(0, -1).trim();
      if (
        fixedTags.length === 0 ||
        allowCustomTags ||
        fixedTags.includes(newTag)
      ) {
        addTag(newTag);
      } else {
        alert.error(`Tag "${newTag}" is not allowed.`);
      }
    } else {
      setInputValue(value);
    }
  };

  const filteredTags = inputValue
    ? fixedTags.filter((tag) =>
        tag.toLowerCase().includes(inputValue.toLowerCase())
      )
    : fixedTags;

  return (
    <div className='relative !w-full'>
      <div className='w-full'>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild className='!w-full'>
            <Button
              type='button'
              variant='outline'
              role='combobox'
              aria-label='Select a tag'
              className={cn('w-full justify-between')}
            >
              {truncate(tags.join(', '), 30) || label}
              <CaretSortIcon className='ml-auto h-4 w-4 shrink-0 opacity-50' />
            </Button>
          </PopoverTrigger>
          <div className='relative w-full'>
            <PopoverContent align='start' className='w-full max-w-2xl p-0'>
              <input
                value={inputValue}
                className='w-full bg-transparent text-sm h-10 rounded-t-lg px-2 border-b border-zinc-700/40 ring-0 focus:ring-0 focus:outline-none'
                type='text'
                onChange={handleInputChange}
                placeholder={placeholderText}
              />
              <div className='w-full'>
                {inputValue.length > 0 && (
                  <Button
                    variant='outline'
                    className='w-full inline-flex items-center justify-between p-2 border-none'
                    type='button'
                    onClick={() => addTag(inputValue)}
                  >
                    <span className='inline-flex items-center gap-1.5'>
                      <Cloudy size={16} strokeWidth={1} />
                      {inputValue.length > 0 && `"${truncate(inputValue, 15)}"`}
                    </span>
                    <span className='inline-flex items-center gap-1.5 capitalize font-medium border border-zinc-700/40 p-[0.3rem] rounded-[0.3rem]'>
                      <Plus size={16} strokeWidth={1} />
                    </span>
                  </Button>
                )}
                <Separator className='bg-zinc-700/40' />
                <p className='font-medium px-2 text-sm text-zinc-500 py-2'>
                  {tags.length > 0
                    ? `List of added tags (${tags.length})`
                    : 'Type something to appear below'}
                </p>
                <Separator className='bg-zinc-700/40' />
                <ScrollArea
                  className={cn(tags.length > 6 ? 'h-40' : '', 'w-full')}
                >
                  <div className='!w-full flex flex-col'>
                    {filteredTags.length > 0 &&
                      filteredTags.map((tag, index) => (
                        <Fragment key={index}>
                          <Separator />
                          <Button
                            onDoubleClick={() => removeTag(tag)}
                            onClick={() => addTag(tag)}
                            variant='outline'
                            className='w-full inline-flex items-center justify-between p-2 border-none'
                          >
                            <span className='inline-flex items-center gap-2'>
                              <Cloudy size={16} strokeWidth={1} />
                              {truncate(tag, 15)}
                            </span>
                            {tags.includes(tag) ? (
                              <span
                                onClick={() => removeTag(tag)}
                                className='p-1 rounded-full'
                              >
                                <Trash
                                  className='text-rose-700'
                                  size={16}
                                  strokeWidth={1}
                                />
                              </span>
                            ) : (
                              <Plus size={16} strokeWidth={1} />
                            )}
                          </Button>
                        </Fragment>
                      ))}
                    {filteredTags.length === 0 &&
                      tags.map((tag, index) => (
                        <Fragment key={index}>
                          <Separator />
                          <Button
                            onDoubleClick={() => removeTag(tag)}
                            variant='outline'
                            className='w-full inline-flex items-center justify-between p-2 border-none'
                          >
                            <span className='inline-flex items-center gap-2'>
                              <Cloudy size={16} strokeWidth={1} />
                              {truncate(tag, 15)}
                            </span>
                            <span
                              onClick={() => removeTag(tag)}
                              className='p-1 rounded-full'
                            >
                              <Trash
                                className='text-rose-700'
                                size={16}
                                strokeWidth={1}
                              />
                            </span>
                          </Button>
                        </Fragment>
                      ))}
                  </div>
                  <ScrollBar />
                </ScrollArea>
              </div>
            </PopoverContent>
          </div>
        </Popover>
      </div>
    </div>
  );
};

export default ListSelector;
