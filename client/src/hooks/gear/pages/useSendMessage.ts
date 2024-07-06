'use client';

import { useSendMessageWithGas } from '@gear-js/react-hooks';
import { usePageMetadata } from './useMetadata';
import { PAGE_PROGRAM_ID } from '@/lib/utils/constants';

export const useSendPageMessage = () => {
  const meta = usePageMetadata();
  const message = useSendMessageWithGas(PAGE_PROGRAM_ID, meta);
  return message;
};
