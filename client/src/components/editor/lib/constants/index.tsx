import { Descendant } from 'slate';
import { LinkNode, ParagraphNode } from '../../nodes';

export const codeThemes = [
  'a11yDark',
  'atomDark',
  'base16AteliersulphurpoolLight',
  'cb',
  'coldarkCold',
  'coldarkDark',
  'coyWithoutShadows',
  'coy',
  'darcula',
  'dark',
  'dracula',
  'duotoneDark',
  'duotoneEarth',
  'duotoneForest',
  'duotoneLight',
  'duotoneSea',
  'duotoneSpace',
  'funky',
  'ghcolors',
  'gruvboxDark',
  'gruvboxLight',
  'holiTheme',
  'hopscotch',
  'lucario',
  'materialDark',
  'materialLight',
  'materialOceanic',
  'nightOwl',
  'nord',
  'okaidia',
  'oneDark',
  'oneLight',
  'pojoaque',
  'prism',
  'shadesOfPurple',
  'solarizedDarkAtom',
  'solarizedlight',
  'synthwave84',
  'tomorrow',
  'twilight',
  'vs',
  'vscDarkPlus',
  'xonokai',
  'zTouch',
];

export const emptyParagraph: Descendant[] = [
  ParagraphNode(),
  LinkNode('New Link', {
    href: 'https://esselr.vercel.app',
    rel: 'noopener',
    target: '_blank',
  }),
];

export const initialValue: Descendant[] = [
  {
    nodeType: 'block',
    type: 'column-layout',
    columns: 2,
    children: [
      {
        type: 'column-item',
        nodeType: 'inline',
        children: [{ text: 'Column 1 Text' }],
      },
      {
        type: 'column-item',
        nodeType: 'inline',
        children: [{ text: 'Column 2 Text' }],
      },
    ],
  },
  {
    type: 'block-quote',
    nodeType: 'block',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'bulleted-lists',
    nodeType: 'block',
    align: 'right',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'numbered-lists',
    nodeType: 'block',
    align: 'center',
    children: [{ text: 'A wise quote.' }],
  },
  {
    type: 'check-list',
    nodeType: 'block',
    checked: false,
    children: [
      { text: 'Express yourself with a touch of fun 🎉 and emotion 😃.' },
    ],
  },
  {
    type: 'image',
    nodeType: 'void',
    props: {
      src: 'https://source.unsplash.com/zOwZKwZOZq8',
      alt: '',
      height: 400,
      width: 400,
    },
    children: [{ text: '' }],
  },
  {
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image src to your clipboard and paste it anywhere in the editor!',
      },
    ],
  },
  {
    type: 'paragraph',
    nodeType: 'block',
    children: [
      {
        text: 'You can delete images with the cross in the top left. Try deleting this sheep:',
      },
    ],
  },
  {
    type: 'image',
    nodeType: 'void',
    props: {
      src: 'https://source.unsplash.com/zOwZKwZOZq8',
      alt: '',
      height: 400,
      width: 400,
    },
    children: [{ text: '' }],
  },
  {
    nodeType: 'block',
    type: 'paragraph',
    children: [{ text: 'fontLists is the list of all font' }],
  },
];
