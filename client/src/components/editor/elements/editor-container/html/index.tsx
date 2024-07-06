'use client';

import { RenderElementProps } from 'slate-react';
import HtmlImageElement from './image';
import HtmlBlockQuoteElement from './blockquote';
import HtmlChecklistElement from './checklist';
import HtmlUlElement from './ul';
import HtmlOlElement from './ol';
import HtmlPElement from './p';
import HtmlPreCodeElement from './pre';
import HtmlHrElement from './hr';
import HtmlLinkElement from './link';

const EditorHtmlElements = (props: RenderElementProps) => {
  const { attributes, children, element } = props;

  switch (element.type) {
    case 'paragraph':
      const pProps = { element, children, attributes };
      return <HtmlPElement {...pProps} />;
    case 'image':
      const imageProps = { element, children, attributes };
      return <HtmlImageElement {...imageProps} />;
    case 'block-quote':
      const blockQuoteProps = { element, children, attributes };
      return <HtmlBlockQuoteElement {...blockQuoteProps} />;
    case 'check-list':
      const checklistsProps = { element, children, attributes };
      return <HtmlChecklistElement {...checklistsProps} />;
    case 'bulleted-lists':
      const bulletProps = { element, children, attributes };
      return <HtmlUlElement {...bulletProps} />;
    case 'numbered-lists':
      const numberedProps = { element, children, attributes };
      return <HtmlOlElement {...numberedProps} />;
    case 'code-block':
      const preCodeProps = { element, children, attributes };
      return <HtmlPreCodeElement {...preCodeProps} />;
    case 'separator':
      const separatorProps = { element, children, attributes };
      return <HtmlHrElement {...separatorProps} />;
    case 'column-item':
      const columnItemProps = { element, children, attributes };
      return <p {...attributes}>{children}</p>;
    case 'link':
      const linkProps = { element, children, attributes };
      return <HtmlLinkElement {...linkProps} />;
    case 'column-layout':
      const columnLayoutProps = { element, children, attributes };
      return <p {...attributes}>{children}</p>;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

export default EditorHtmlElements;
