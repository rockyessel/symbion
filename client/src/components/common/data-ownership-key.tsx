'use client';

import { Button } from '@/components/ui/button';
import { getClientUser } from '@/hooks/useGetClientUser';
import { useTransition, useState } from 'react';
// import { signMessage } from '@/lib/_actions/gear';

import { web3FromAddress } from '@polkadot/extension-dapp';
import { stringToU8a, u8aToHex } from '@polkadot/util';
import { cryptoWaitReady } from '@polkadot/util-crypto';
import { AddressType } from '@/types';
import { Input } from '@/components/ui/input';
import { summarizedAddress } from '@/lib/utils/helpers';

export const signMessage = async (address: AddressType, message: string) => {
  const injector = await web3FromAddress(address);
  if (typeof injector !== 'undefined') {
    const data = u8aToHex(stringToU8a(message));
    console.log('message-data', data);
    const signer = injector.signer.signRaw;
    let signature: unknown;
    if (typeof signer !== 'undefined') {
      signature = await signer({ address, data, type: 'bytes' });
    }
    return {
      address,
      message,
      signature,
    };
  }
};

const DataOwnershipKey = () => {
  const [signature, setSignature] = useState<any>();
  const [isPending, startTransition] = useTransition();
  const session = getClientUser();

  console.log('signature: ', signature);

  const handleSign = () => {
    if (!session) return;

    if (typeof window === 'undefined') return;

    startTransition(async () => {
      const message = ``;
      const data = await signMessage(session.address, message);

      setSignature(data);
    });
  };

  return (
    <div>
      <div>
        <Button disabled={isPending} onClick={handleSign}>
          {isPending ? 'Loading...' : 'Sign Verification'}
        </Button>
      </div>
      {signature && (
        <div className='flex'>
          <label className='text-gray-500 text-sm whitespace-nowrap p-2 rounded-md rounded-r-none border-t border-b border-l border-zinc-700/40'>
            signature::
          </label>
          <Input
            type='text'
            className='w-full rounded-l-none !border-l-none'
            value={summarizedAddress(signature.signature, 5, 20)}
            disabled={signature.signature ? true : false}
          />
        </div>
      )}
      <div>
        <Button disabled={isPending} onClick={handleSign}>
          {isPending ? 'Loading...' : 'Sign Verification'}
        </Button>
      </div>
      {signature && (
        <div className='flex'>
          <label className='text-gray-500 text-sm whitespace-nowrap p-2 rounded-md rounded-r-none border-t border-b border-l border-zinc-700/40'>
            signature::
          </label>
          <Input
            type='text'
            className='w-full rounded-l-none !border-l-none'
            value={summarizedAddress(signature.signature, 5, 20)}
            disabled={signature.signature ? true : false}
          />
        </div>
      )}
    </div>
  );
};

export default DataOwnershipKey;
