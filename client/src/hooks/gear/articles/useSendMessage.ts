'use client';

import { useSendMessageWithGas } from '@gear-js/react-hooks';
import { usePageMetadata } from './useMetadata';
import { ARTICLE_PROGRAM_ID } from '@/lib/utils/constants';

export const useSendArticleMessage = () => {
  const meta = usePageMetadata();
  const message = useSendMessageWithGas(ARTICLE_PROGRAM_ID, meta);
  return message;
};
