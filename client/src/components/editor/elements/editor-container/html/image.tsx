'use client';

import { ImageType, RenderProps } from '@/components/editor/types';
import NextImage from '@/components/native/image';

const HtmlImageElement = (props: RenderProps<ImageType>) => {
  const { attributes, children, element } = props;

  const { props: props_ } = element;
  const { alt, height, src, width } = props_;

  return (
    <div {...attributes}>
      <NextImage width={width} height={height} src={src} alt={alt} />
      <p>{children}</p>
    </div>
  );
};

export default HtmlImageElement;
