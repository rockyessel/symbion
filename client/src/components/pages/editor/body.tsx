'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils/helpers';
import { ChevronDown } from 'lucide-react';
import ColorPicker from 'react-pick-color';
import NextImage from '@/components/native/image';
import { Separator } from '@/components/ui/separator';
import { InputEventType, IPage, IUserProps } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Bold,
  BookImage,
  Code,
  FileImage,
  ImageIcon,
  Italic,
  LayoutPanelTop,
  Link2,
  PaintBucket,
  Plus,
  Redo2,
  SpellCheck2,
  SplitSquareVertical,
  Strikethrough,
  Subscript,
  Superscript,
  Underline,
  Undo2,
} from 'lucide-react';
import {TextEditor} from '@/components/editor';

interface Props {
  page: IPage;
  session: IUserProps;
  handlePageChange: (event: InputEventType) => void;
  updatePage: (key: string, values: undefined | string | string[]) => void;
}

const PageBody = ({}: Props) => {
  return (
    <div className='px-4 rounded-lg border border-zinc-700/40'>
      <TextEditor  />
    </div>
  );
};

export default PageBody;

export const ELEMENTS_CMD = [
  {
    key: ['ctrl', 'k'],
    icon: '❡',
    type: 'paragraph',
  },
  {
    key: ['ctrl', '1'],
    icon: 'H1',
    type: 'heading-one',
  },
  {
    key: ['ctrl', '2'],
    icon: 'H2',
    type: 'heading-two',
  },
  {
    key: ['ctrl', '3'],
    icon: 'H3',
    type: 'heading-three',
  },
  {
    key: ['ctrl', '4'],
    icon: 'H4',
    type: 'heading-four',
  },
  {
    key: ['ctrl', '5'],
    icon: 'H5',
    type: 'heading-five',
  },
  {
    key: ['ctrl', '6'],
    icon: 'H6',
    type: 'heading-six',
  },
  {
    key: ['ctrl', '/'],
    icon: <span className='font-mono text-sm'>&lt;/&gt;</span>,
    type: 'paragraph',
  },
  {
    key: ['ctrl', 'q'],
    icon: '❝',
    type: 'paragraph',
  },
  {
    key: ['ctrl', 'd'],
    icon: '─',
    type: 'paragraph',
  },
  {
    key: ['ctrl', 't'],
    icon: '☑',
    type: 'paragraph',
  },
  {
    key: ['ctrl', 'i'],
    icon: '🖼️',
    type: 'paragraph',
  },
];

export const MARKUPS_CMD = [
  {
    key: ['ctrl', 'b'],
    icon: (
      <Bold
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'bold',
  },
  {
    key: ['ctrl', 'i'],
    icon: (
      <Italic
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),

    type: 'italic',
  },
  {
    key: ['ctrl', 'u'],
    icon: (
      <Underline
        size={35}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),

    type: 'underline',
  },
  {
    key: ['ctrl', 's'],
    icon: (
      <Strikethrough
        size={35}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),

    type: 'strikethrough',
  },
  {
    key: ['ctrl', '`'],
    icon: (
      <Code
        size={35}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'code',
  },
  {
    key: ['ctrl', '`'],
    icon: (
      <Subscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'sub',
  },
  {
    key: ['ctrl', '`'],
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'sup',
  },
];

export const positionsArr = [
  {
    position: '',
    default: true,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'Position',
  },
  {
    position: 'right',
    default: false,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'Right Align',
  },
  {
    position: 'left',
    default: false,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'Left Align',
  },
  {
    position: 'justify',
    default: false,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'Justify Align',
  },
  {
    position: 'start',
    default: false,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'Start Align',
  },
  {
    position: 'end',
    default: false,
    icon: (
      <Superscript
        size={37}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    tooltip: 'End Align',
  },
];

export const additionalMarkUp = [
  {
    icon: (
      <SplitSquareVertical
        size={35}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'separator',
  },
];


export const colorsElArr = [
  {
    icon: (
      <SpellCheck2
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'color',
    tooltip: 'Text color',
  },
  {
    icon: (
      <PaintBucket
        size={32}
        strokeWidth={2.25}
        className='my-auto hover:bg-lime-700 hover:text-black p-2 rounded-md cursor-pointer'
      />
    ),
    type: 'highlight',
    tooltip: 'Highlight',
  },
];




export const LIST_TYPES = ['number-list', 'bullet-list'];
export const TEXT_ALIGN_TYPES = ['left', 'center', 'right', 'justify'];



const F = () => {
  return (
    <span className='flex items-center gap-2'>
      {colorsElArr.map((colorEl, index) => (
        <DropdownMenu key={index}>
          <DropdownMenuTrigger asChild>{colorEl.icon}</DropdownMenuTrigger>
          <DropdownMenuContent>
            <ColorPicker
              onChange={(color) => {}}
              color='#3573CB'
              theme={{
                background: '#020617',
                inputBackground: '#0f172a',
                borderColor: '#020617',
                borderRadius: '8px',
                color: '#DCCECE',
                width: '320px',
              }}
            />
          </DropdownMenuContent>
        </DropdownMenu>
      ))}
    </span>
  );
};
