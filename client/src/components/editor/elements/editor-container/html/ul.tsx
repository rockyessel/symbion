'use client';

import { BulletedListsType, RenderProps } from '@/components/editor/types';

const HtmlUlElement = (props: RenderProps<BulletedListsType>) => {
  const { attributes, children, element } = props;

  return (
    <ul style={{ textAlign: element.align }} {...attributes}>
      {children}
    </ul>
  );
};

export default HtmlUlElement;
