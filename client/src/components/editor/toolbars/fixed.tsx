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
import {
  MarkButton,
  InsertBlockQuoteButton,
  InsertChecklistButton,
  InsertCodeBlockButton,
  InsertImageButton,
  RedoButton,
  UndoButton,
  InsertNumberedListButton,
  InsertBulletedListButton,
  ClearSelectedMarkButton,
  ClearAllMarksButton,
} from './buttons';

const FixedToolbar = () => {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center gap-1'>
        <UndoButton />
        <RedoButton />
      </div>

      <div className='flex items-center gap-1.5'>
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

      <div className='flex items-center gap-1.5'>
        <InsertCodeBlockButton />
        <InsertBlockQuoteButton />
        <InsertChecklistButton />
        <InsertImageButton />
        <InsertBulletedListButton />
        <InsertNumberedListButton />
      </div>

      <div>
        <ClearSelectedMarkButton />
        <ClearAllMarksButton />
      </div>
    </div>
  );
};

export default FixedToolbar;
