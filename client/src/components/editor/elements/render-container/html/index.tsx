'use client';

import NextImage from '@/components/native/image';
import { RenderElementProps } from 'slate-react';

const RenderHtmlElements = (props: RenderElementProps) => {
  const { children, element } = props;

  switch (element.type) {
    case 'paragraph':
      return <p>{children}</p>;
    case 'image':
      return (
        <div>
          <NextImage
            width={element.props.width}
            height={element.props.height}
            src={element.props.src}
            alt={element.props.alt}
          />
        </div>
      );
    case 'separator':
      return <hr />;
    case 'block-quote':
      return <blockquote>{children}</blockquote>;
    case 'check-list':
      return (
        <div>
          <input type='checkbox' checked={element.checked} readOnly={true} />
          {children}
        </div>
      );
    case 'bulleted-lists':
      return <ul style={{ textAlign: element.align }}>{children}</ul>;
    case 'numbered-lists':
      return <ol style={{ textAlign: element.align }}>{children}</ol>;
    case 'code-block':
      return (
        <pre className='w-full bg-zinc-500'>
          <code>{children}</code>
        </pre>
      );
    case 'separator':
      return <hr />;
    case 'column-item':
      return <p>{children}</p>;
    case 'column-layout':
      return <p>{children}</p>;
    default:
      return <p>{children}</p>;
  }
};

export default RenderHtmlElements;
