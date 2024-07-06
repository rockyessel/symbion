'use client';

import {
  Bold,
  Code,
  Italic,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
} from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { Editor, Range } from 'slate';
import { MarkButton } from './buttons';

const FloatingToolbar = () => {
  const editor = useSlate();
  const [isOpen, setIsOpen] = useState(false);
  const toolbarRef = useRef<HTMLDivElement | null>(null);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const { selection } = editor;
  const selectionStr = JSON.stringify(selection);

  useEffect(() => {
    if (
      selection &&
      ReactEditor.isFocused(editor) &&
      !Range.isCollapsed(selection) &&
      Editor.string(editor, selection) !== ''
    ) {
      const domRange = ReactEditor.toDOMRange(editor, selection);
      const rect = domRange.getBoundingClientRect();

      // Calculate the position of the toolbar
      const toolbarTop =
        rect.top - (toolbarRef.current?.offsetHeight || 40) - 10;
      const toolbarLeft =
        rect.left +
        rect.width / 2 -
        (toolbarRef.current?.offsetWidth || 100) / 2;

      setToolbarPosition({ top: toolbarTop, left: toolbarLeft });

      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  }, [selection, selectionStr, editor]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      ref={toolbarRef}
      className='w-[20rem] absolute z-10 flex bg-white border rounded p-2 shadow'
      style={{
        top: `${toolbarPosition.top}px`,
        left: `${toolbarPosition.left}px`,
      }}
    >
      <MarkButton format='bold'>
        <Bold
          size={32}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='italic'>
        <Italic
          size={32}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='underline'>
        <Underline
          size={35}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='code'>
        <Code
          size={35}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='superscript'>
        <Superscript
          size={37}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='subscript'>
        <Subscript
          size={37}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
      <MarkButton format='strikethrough'>
        <Strikethrough
          size={35}
          strokeWidth={2.25}
          className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
        />
      </MarkButton>
    </div>
  );
};

export default FloatingToolbar;
