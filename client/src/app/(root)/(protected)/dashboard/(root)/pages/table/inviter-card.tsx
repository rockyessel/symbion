'use client';

import NextImage from '@/components/native/image';
import { Badge } from '@/components/ui/badge';
import { domainURL } from '@/lib/utils/helpers';
import { AddressType } from '@/types';

interface Props {
  pageId: AddressType;
}

const InviterCard = ({ pageId }: Props) => {
  console.log('pageId: ', pageId);

  return (
    <div className='flex flex-col'>
      <div className='inline-flex items-center gap-1'>
        <NextImage
          width={250}
          height={250}
          src={domainURL('/wallets/nova.svg')}
          alt={'WAllet'}
          className='w-4 h-4 rounded-md'
        />

        <p className='text-sm'>Rocky Essel</p>
      </div>
      <div className='inline-flex items-center gap-5'>
        <p>Nova@gmail.com</p>
        <p>
          <Badge variant='outline'>admin</Badge>
        </p>
      </div>
    </div>
  );
};

export default InviterCard;
