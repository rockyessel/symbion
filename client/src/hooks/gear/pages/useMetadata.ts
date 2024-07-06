'use client';

import { useEffect, useState } from 'react';
import { HexString, ProgramMetadata } from '@gear-js/api';
import { domainURL, windowIsDefined } from '@/lib/utils/helpers';
import { useAlert } from '@gear-js/react-hooks';

export const usePageMetadata = () => {
  const [metadata, setMetadata] = useState<ProgramMetadata>();
  const path = `/meta/deconnect_pages.meta.txt`;

  const alert = useAlert();
  useEffect(() => {
    fetch(domainURL(path))
      .then((response) => response.text())
      .then((raw) => `0x${raw}` as HexString)
      .then((metaHex) => ProgramMetadata.from(metaHex))
      .then((result) => {
        console.log('result: ', result);
        setMetadata(result);
      })
      .catch(({ message }: Error) => alert.error(message));
  }, [alert, path]);

  return metadata;
};
