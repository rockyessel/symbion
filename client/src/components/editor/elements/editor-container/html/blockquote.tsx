'use client';

import { BlockQuoteType, RenderProps } from '@/components/editor/types';

const HtmlBlockQuoteElement = (props: RenderProps<BlockQuoteType>) => {
  const { attributes, children } = props;

  return <blockquote {...attributes}>{children}</blockquote>;
};

export default HtmlBlockQuoteElement;
