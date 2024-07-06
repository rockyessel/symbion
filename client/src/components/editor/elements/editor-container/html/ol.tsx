'use client';

import { NumberedListsType, RenderProps } from '@/components/editor/types';

const HtmlOlElement = (props: RenderProps<NumberedListsType>) => {
  const { attributes, children, element } = props;
  return (
    <ol style={{ textAlign: element.align }} {...attributes}>
      {children}
    </ol>
  );
};

export default HtmlOlElement;