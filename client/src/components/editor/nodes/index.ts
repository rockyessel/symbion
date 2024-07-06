import {
  BlockQuoteType,
  BulletedListsType,
  CheckListType,
  CodeBlockType,
  CodeProps,
  ColumnItemType,
  CustomText,
  ImageType,
  LinkProps,
  LinkType,
  NumberedListsType,
  ParagraphType,
  SeparatorType,
} from '../types';

export const ParagraphNode = (
  children: CustomText[] = [{ text: '' }]
): ParagraphType => {
  return {
    nodeType: 'block',
    type: 'paragraph',
    children,
  };
};

export const LinkNode = (
  text: string,
  { href, rel, target }: LinkProps
): LinkType => {
  return {
    type: 'link',
    children: [{ text }],
    nodeType: 'inline',
    props: { href, target, rel },
  };
};

export const BulletedListNode = (): BulletedListsType => {
  return {
    nodeType: 'block',
    type: 'bulleted-lists',
    children: [{ text: '' }],
  };
};

export const NumberedListNode = (ordered: boolean): NumberedListsType => {
  return {
    nodeType: 'block',
    type: 'numbered-lists',
    children: [{ text: '' }],
  };
};

export const CodeBlockNode = (
  text: string,
  { ...props }: CodeProps
): CodeBlockType => {
  return {
    nodeType: 'block',
    type: 'code-block',
    props,
    children: [{ text }],
  };
};

export const ImageNode = (
  src: string,
  alt: string,
  height = 400,
  width = 400,
  caption = 'No caption provided'
): ImageType => {
  return {
    nodeType: 'void',
    type: 'image',
    props: { src, alt, height, width },
    children: [{ text: caption }],
  };
};

export const CheckListNode = (checked: boolean): CheckListType => {
  return {
    nodeType: 'block',
    type: 'check-list',
    checked,
    children: [{ text: '' }],
  };
};

export const BlockQuoteNode = (
  children: [{ text: string }]
): BlockQuoteType => {
  return {
    nodeType: 'block',
    type: 'block-quote',
    children,
  };
};

export const SeparatorNode = (): SeparatorType => {
  return {
    nodeType: 'void',
    type: 'separator',
    children: [{ text: '' }],
  };
};

export const ColumnItemNode = (): ColumnItemType => {
  return {
    nodeType: 'inline',
    type: 'column-item',
    children: [{ text: '' }],
  };
};
