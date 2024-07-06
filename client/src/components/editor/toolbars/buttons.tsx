'use client';

import { useSlate } from 'slate-react';
import { cn } from '@/lib/utils/helpers';
import { Alignment, CodeProps, CustomText } from '../types';
import { isBlockActive, markEvents, toggleBlock } from '../lib/helpers';
import {
  BlockQuoteNode,
  CheckListNode,
  CodeBlockNode,
  ImageNode,
  ParagraphNode,
} from '../nodes';
import {
  Braces,
  Image as ImageIcon,
  LayoutList,
  List,
  ListOrdered,
  Redo2,
  RemoveFormatting,
  TextQuote,
  Undo2,
  ListTodo,
  CircleSlash2,
} from 'lucide-react';
import { ReactNode } from 'react';
import { Text, Transforms } from 'slate';
import { Node } from 'slate';

export const DEFAULT_CODE: CodeProps = {
  code: '',
  language: 'plain',
  theme: 'dracula',
  isShowLins: false,
};

export const InsertCodeBlockButton = () => {
  const editor = useSlate();

  const handleInsertCodeBlock = () => {
    const codeBlockNode = CodeBlockNode('', { ...DEFAULT_CODE });
    editor.insertNode(codeBlockNode);
  };
  const isActive = isBlockActive(editor, 'code-block');

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertCodeBlock}
      className={cn(
        'outline-none border-none',
        isActive ? 'bg-white text-black' : ''
      )}
    >
      <Braces
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const InsertBlockQuoteButton = () => {
  const editor = useSlate();
  const handleInsertBlockQuote = () => {
    const text = prompt('Enter block quote text:') || '';
    const blockquoteNode = BlockQuoteNode([{ text }]);
    editor.insertNode(blockquoteNode);
  };

  const isActive = isBlockActive(editor, 'block-quote');
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertBlockQuote}
      className={cn(
        'outline-none border-none',
        isActive ? 'bg-white text-black' : ''
      )}
    >
      <TextQuote
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const InsertChecklistButton = () => {
  const editor = useSlate();

  const handleInsertChecklist = () => {
    const text = prompt('Enter checklist item text:') || '';
    const checklistNode = CheckListNode(false);
    checklistNode.children = [{ text }];
    editor.insertNode(checklistNode);
  };

  const isActive = isBlockActive(editor, 'check-list');
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertChecklist}
      className={cn(
        'outline-none border-none',
        isActive ? 'bg-white text-black' : ''
      )}
    >
      <ListTodo
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const InsertImageButton = () => {
  const editor = useSlate();

  const handleInsertImage = () => {
    const src = prompt('Enter the image URL:') || '';
    const alt = prompt('Enter the image description:') || '';
    const imageNode = ImageNode(src, alt);
    if (src && alt) {
      editor.insertNode(imageNode);
      const paragraph = ParagraphNode();
      editor.insertNode(paragraph);
      editor.move();
    }
  };
  const isActive = isBlockActive(editor, 'image');

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertImage}
      className={cn(
        'outline-none border-none',
        isActive ? 'bg-white text-black' : ''
      )}
    >
      <ImageIcon
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const UndoButton = () => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => editor.undo()}
      className='outline-none border-none'
    >
      <Undo2
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const RedoButton = () => {
  const editor = useSlate();
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={() => editor.redo()}
      className='outline-none border-none'
    >
      <Redo2
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const InsertBulletedListButton = () => {
  const editor = useSlate();

  const handleInsertBulletedList = () => {
    const align =
      (prompt(
        'Enter alignment (left, center, right, justify):'
      ) as Alignment) || 'left';
    toggleBlock(editor, 'bulleted-lists', align);
  };

  const isActive = isBlockActive(editor, 'bulleted-lists');

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertBulletedList}
      className={cn('outline-none border-none', isActive ? 'active' : '')}
    >
      <List
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

export const InsertNumberedListButton = () => {
  const editor = useSlate();

  const handleInsertNumberedList = () => {
    const align =
      (prompt(
        'Enter alignment (left, center, right, justify):'
      ) as Alignment) || 'left';
    toggleBlock(editor, 'numbered-lists', align);
  };

  const isActive = isBlockActive(editor, 'numbered-lists');

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleInsertNumberedList}
      className={cn('outline-none border-none', isActive ? 'active' : '')}
    >
      <ListOrdered
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

interface IFormatButton {
  format: keyof CustomText;
  children: ReactNode;
  className?: string;
}

export const MarkButton = ({ format, children, className }: IFormatButton) => {
  const editor = useSlate();
  const { isFormatActive, toggleFormat } = markEvents(editor);
  const isActive = isFormatActive(format);

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();
    toggleFormat(format);
  };

  return (
    <button
      onMouseDown={handleMouseDown}
      className={cn(
        'outline-none border-none',
        isActive ? 'custom-active' : '',
        className
      )}
    >
      {children}
    </button>
  );
};

// Lines Interview Questions
// 1. conductor, poles, pylons, planting of poles, vegetation.
// 2. c

const marks = {
  bold: false,
  italic: false,
  underline: false,
  code: false,
  strikethrough: false,
  subscript: false,
  superscript: false,
};
// Button to clear all formatting in the editor
export const ClearAllMarksButton = () => {
  const editor = useSlate();

  const handleClearAllFormatting = () => {
    // Iterate through all text nodes in the editor
    for (const [node, path] of Node.texts(editor)) {
      console.log('node: ', node);
      // Set the node marks to false to clear formatting
      Transforms.setNodes(
        editor,
        { ...marks },
        { at: path } // Apply changes at the specific path of the node
      );
    }
  };
  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleClearAllFormatting}
      className='outline-none border-none'
    >
      <CircleSlash2
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};

// Button to clear formatting for the selected text
export const ClearSelectedMarkButton = () => {
  const editor = useSlate();

  const handleClearSelectedFormatting = () => {
    // Clear formatting for selected text
    Transforms.setNodes(
      editor,
      { ...marks },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  return (
    <button
      onMouseDown={(event) => event.preventDefault()}
      onClick={handleClearSelectedFormatting}
      className='outline-none border-none'
    >
      <RemoveFormatting
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-slate-800 p-2 rounded-lg cursor-pointer'
      />
    </button>
  );
};
