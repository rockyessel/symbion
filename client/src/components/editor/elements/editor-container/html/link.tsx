'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { cn, truncate } from '@/lib/utils/helpers';
import { useFocused, useSelected, useSlate } from 'slate-react';
import { LinkType, RenderProps } from '@/components/editor/types';
import { ExternalLink, Pencil, Repeat2, Unlink } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Editor, Element, Transforms } from 'slate';

const HtmlLinkElement = (props: RenderProps<LinkType>) => {
  const { attributes, children, element } = props;
  const editor = useSlate();
  const { props: props_ } = element;
  const { href, rel, target } = props_;
  const selected = useSelected();
  const focused = useFocused();
  const [isInEditMode, setIsInEditMode] = useState(false);

  const [linkUrl, setLinkUrl] = useState<string>(href);

  const handleEditMode = () =>
    setIsInEditMode((previousState) => !previousState);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Link
          target={target}
          rel={rel}
          {...attributes}
          href={href}
          className={cn('text-lime-500 underline', {
            'text-lime-600': selected && focused,
          })}
        >
          {children}
        </Link>
      </PopoverTrigger>

      <PopoverContent
        contentEditable={false}
        className='flex items-center gap-4 px-4 py-2 border rounded-lg'
      >
        <span>
          {isInEditMode ? (
            <Input
              className='w-52'
              value={linkUrl}
              onChange={(event) => setLinkUrl(event.target.value)}
              type='text'
            />
          ) : (
            <a
              className='inline-flex items-center gap-1'
              href={href}
              rel='noreferrer'
              target='_blank'
            >
              <ExternalLink size={16} strokeWidth={1.75} />
              <span>{truncate(href, 19)}</span>
            </a>
          )}
        </span>

        <span className='inline-flex items-center gap-2 px-2'>
          {isInEditMode ? (
            <button
              className='m-0 p-0'
              onClick={() => changeLinkUrl(editor, linkUrl)}
            >
              <Repeat2 size={20} strokeWidth={1.25} />
            </button>
          ) : (
            <button className='m-0 p-0' type='button' onClick={handleEditMode}>
              <Pencil size={16} strokeWidth={0.75} />
            </button>
          )}
          <button className='m-0 p-0' onClick={() => removeLink(editor)}>
            <Unlink size={16} strokeWidth={1.75} />
          </button>
        </span>
      </PopoverContent>
    </Popover>
  );
};

export default HtmlLinkElement;

export const removeLink = (editor: Editor, opts = {}) => {
  Transforms.unwrapNodes(editor, {
    ...opts,
    match: (n) =>
      !Editor.isEditor(n) && Element.isElement(n) && n.type === 'link',
  });
};

export const changeLinkUrl = (editor: Editor, href: string) => {
  Transforms.setNodes(
    editor,
    { props: { href, rel: 'onopener', target: '_blank' } },
    { match: (n) => Element.isElement(n) && n.type === 'link' }
  );
};

export const unlink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) => Element.isElement(n) && n.type === 'link',
    split: true,
  });
};
