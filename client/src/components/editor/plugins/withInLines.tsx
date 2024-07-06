import { Editor, Element as SlateElement, Transforms, Range } from 'slate';
import { isValidURL } from '../lib/helpers';
import { LinkNode } from '../nodes';

const isLinkActive = (editor: Editor) => {
  const [link] = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
  return !!link;
};

const removeLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === 'link',
  });
};

const addLink = (editor: Editor, href: string) => {
  if (isLinkActive(editor)) {
    removeLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const text = isCollapsed ? href : '';
  const linkProps = { href, target: '_blank', rel: 'noopener noreferrer' };
  const link = LinkNode(text, { ...linkProps });

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export const withInLines = (editor: Editor) => {
  const { insertData, insertText } = editor;

  editor.insertText = (text) => {
    if (text && isValidURL(text)) {
      addLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data) => {
    const text = data.getData('text/plain');

    if (text && isValidURL(text)) {
      addLink(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};
