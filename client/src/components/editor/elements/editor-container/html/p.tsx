'use client';

import { ParagraphType, RenderProps } from '@/components/editor/types';

const HtmlPElement = (props: RenderProps<ParagraphType>) => {
  const { attributes, children } = props;

  return <p {...attributes}>{children}</p>;
};

export default HtmlPElement;
