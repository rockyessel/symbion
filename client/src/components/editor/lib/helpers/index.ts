'use client';

import { Editor} from 'slate';
import { Node, Text, Transforms } from 'slate';
import { Alignment, LeafTypes, NodeTypes } from '../../types';
import { Element } from 'slate';

export const markEvents = (editor: Editor) => {
  const isFormatActive = (format: LeafTypes) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => isTextWithFormat(n, format),
    });
    return !!match;
  };

  const toggleFormat = (format: LeafTypes) => {
    const isActive = isFormatActive(format);
    Transforms.setNodes(
      editor,
      { [format]: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    );
  };

  const isTextWithFormat = (node: Node, format: LeafTypes): boolean => {
    if (!Text.isText(node)) {
      return false;
    }
    return !!node[format];
  };

  const events = {
    toggleFormat,
    isFormatActive,
    isTextWithFormat,
  };
  return events;
};

export const isBlockActive = (editor: Editor, format: NodeTypes) => {
  const [match] = Editor.nodes(editor, {
    match: (n) => Element.isElement(n) && n.type === format,
  });
  return !!match;
};

export const toggleBlock = (
  editor: Editor,
  format: NodeTypes,
  align?: Alignment
) => {
  const isActive = isBlockActive(editor, format);
  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : format, align },
    // @ts-ignore
    { match: (n) => Editor.isBlock(editor, n) }
  );
};

/**
 * Checks if the given string is a valid URL.
 * @param str - The string to check.
 * @returns True if the string is a valid URL, false otherwise.
 */
export const isValidURL = (str: string): boolean => {
  if (typeof str !== 'string') {
    return false;
  }

  const pattern = new RegExp(
    '^https?:\\/\\/' + // protocol
      '((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.?)+[a-zA-Z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-zA-Z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-zA-Z\\d_]*)?$',
    'i' // fragment locator
  );
  return !!pattern.test(str);
};
