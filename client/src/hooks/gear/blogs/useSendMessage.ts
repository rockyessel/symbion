'use client';

import { useSendMessageWithGas } from '@gear-js/react-hooks';
import { BLOG_PROGRAM_ID } from '@/lib/utils/constants';
import { usePageMetadata } from './useMetadata';

export const useSendBlogMessage = () => {
  const meta = usePageMetadata();
  const message = useSendMessageWithGas(BLOG_PROGRAM_ID, meta);
  return message;
};
