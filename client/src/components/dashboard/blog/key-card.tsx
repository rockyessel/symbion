'use client';

import { domainURL } from '@/lib/utils/helpers';
import NativeImage from '@/components/native/image';

const KeyCard = () => {
  return (
    <div className='flex flex-col gap-1 bg-zinc-800/40 border border-zinc-700/40 rounded-lg p-2'>
      <div>
        <div className='flex items-center gap-2'>
          <NativeImage
            className='w-5 h-5 rounded-full'
            width={200}
            height={200}
            src={domainURL('/cover.webp')}
            alt=''
          />
          <p className='text-xs'>{`{blog-name-or-subdomain}`}</p>
        </div>
      </div>

      <div></div>
    </div>
  );
};

export default KeyCard;
