import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';
import { BaseEditor } from 'slate';
import { KeyboardEvent } from 'react';
import { Locale } from '@/i18n.config';

// Extend the Editor interface to include your custom handlers
export type KeyEventEditor = {
  onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
};

export type LocaleEditor = {
  lang: Locale;
};

export type SlateEditor = BaseEditor &
  ReactEditor &
  HistoryEditor &
  KeyEventEditor &
  LocaleEditor;

declare module 'slate' {
  interface CustomTypes {
    Editor: SlateEditor;
    Element: ElementNodeType;
    Text: CustomText;
  }
  export interface BaseElement {
    type: NodeTypes;
  }
}

export type ElementNodeType =
  | ParagraphType
  | NumberedListsType
  | LinkType
  | ImageType
  | BlockQuoteType
  | CodeBlockType
  | CheckListType
  | BulletedListsType
  | SeparatorType
  | ColumnItemType
  | ColumnLayoutType;

export type NodeTypes = ElementNodeType['type'];

export type CustomText = {
  text: string;
  placeholder?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  strikethrough?: boolean;
  subscript?: boolean;
  superscript?: boolean;
};

export type LeafTypes = keyof CustomText;

export type Alignment = 'left' | 'center' | 'right' | 'justify';

export type ParagraphType = {
  nodeType: 'block';
  type: 'paragraph';
  children: CustomText[];
};

type ImagePropsType = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type ImageType = {
  nodeType: 'void';
  type: 'image';
  props: ImagePropsType;
  children: CustomText[];
};

export type SeparatorType = {
  nodeType: 'void';
  type: 'separator';
  children: CustomText[];
};

export type BlockQuoteType = {
  nodeType: 'block';
  type: 'block-quote';
  children: CustomText[];
};

export type CheckListType = {
  nodeType: 'block';
  type: 'check-list';
  checked: boolean;
  children: CustomText[];
};

export type BulletedListsType = {
  nodeType: 'block';
  type: 'bulleted-lists';
  align?: Alignment;
  children: CustomText[];
};

export type NumberedListsType = {
  nodeType: 'block';
  type: 'numbered-lists';
  align?: Alignment;
  children: CustomText[];
};

export type LinkProps = {
  href: string;
  target: string;
  rel: string;
};

export type LinkType = {
  nodeType: 'inline';
  type: 'link';
  props: LinkProps;
  children: CustomText[];
};

export type CodeProps = {
  code: string;
  language: string;
  theme: string;
  isShowLins?: boolean;
};

export type CodeBlockType = {
  nodeType: 'block';
  type: 'code-block';
  props: CodeProps;
  children: CustomText[];
};

export type ColumnItemType = {
  nodeType: 'inline';
  type: 'column-item';
  children: CustomText[];
};

export type ColumnLayoutType = {
  nodeType: 'block';
  type: 'column-layout';
  columns: number;
  children: ColumnItemType[];
};

export interface RenderProps<T> {
  element: T;
  children: any;
  attributes: {
    'data-slate-node': 'element';
    'data-slate-inline'?: true;
    'data-slate-void'?: true;
    dir?: 'rtl';
    ref: any;
  };
}
