'use client';

import { Account } from '@/types';
import { ReactNode } from 'react';
import { Copy, Eye } from 'lucide-react';
import { Separator } from '../ui/separator';
import { summarizedAddress, truncate } from '@/lib/utils/helpers';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface Props {
  account: Account;
  children: ReactNode;
}

const WalletProfile = ({ account, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='border border-zinc-500 rounded-[3rem] max-w-md bg-zinc-900 w-full flex items-center justify-center shadow'>
        <div className='w-full h-full'>
          <div className='w-full p-2.5 gap-3 flex'>
            <div className='address__profile w-11 h-11 rounded-full' />
            <div className='w-full'>
              <p className='inline-flex items-center w-full justify-between text-gray-200 text-xs font-medium'>
                <span className='inline-flex items-center gap-1.5'>
                  <span>{summarizedAddress(account.address, 15, 4)}</span>
                  <span>
                    <Copy className='w-4 h-4' strokeWidth={2.25} />
                  </span>
                </span>

                <span className=''>
                  <span className='font-bold'>6.704 </span>
                  <span>TVARA</span>
                </span>
              </p>
              <p className='w-full inline-flex items-center justify-between  text-xs font-medium'>
                <span className='inline-flex items-center gap-1'>
                  <span>{truncate(account?.meta?.name!, 8)}</span>
                  <span className='text-lime-500'>・</span>
                  <span>{account.meta.source}</span>
                </span>
              </p>
            </div>
          </div>
          <Separator className='bg-zinc-800 mb-2' />
          <div className='flex flex-col'>
            <div className='gap-3 inline-flex'>
              <div className='p-[13px] rounded-lg border border-zinc-800 justify-center items-center gap-2 flex'>
                <Eye />
                <div className='text-center text-gray-200 text-sm font-medium'>
                  Receive
                </div>
              </div>
            </div>

            <div className='flex-col gap-px inline-flex'>
              <div className='p-3 rounded-lg justify-start items-center gap-3 inline-flex'>
                <Eye />
                <div className='flex-col inline-flex'>
                  <div className='text-gray-200 text-base font-medium'>
                    Profile
                  </div>
                </div>
              </div>
              <div className='p-3 rounded-lg justify-center items-center gap-3 inline-flex'>
                <div className='justify-start items-center inline-flex'>
                  <Eye />
                </div>
                <div className='flex-col inline-flex'>
                  <div className='text-gray-200 text-base font-medium leading-normal'>
                    Create Community
                  </div>
                </div>
                <div className='grow shrink basis-0 flex-col justify-start items-end inline-flex'>
                  <Eye />
                </div>
              </div>
              <div className='p-3 rounded-lg justify-start items-center gap-3 inline-flex'>
                <Eye />
                <div className='flex-col inline-flex'>
                  <div className='text-gray-200 text-base font-medium'>
                    Create Article
                  </div>
                </div>
              </div>
              <div className='p-3 rounded-lg justify-start items-center gap-3 inline-flex'>
                <Eye />
                <div className='flex-col inline-flex'>
                  <div className='text-gray-200 text-base font-medium'>
                    Publish a backlinks
                  </div>
                </div>
              </div>
              <div className='p-3 rounded-lg justify-start items-center gap-3 inline-flex'>
                <Eye />
                <div className='flex-col inline-flex'>
                  <div className='text-gray-200 text-base font-medium'>
                    Switch Account
                  </div>
                </div>
              </div>
              <div className='p-3 rounded-lg justify-start items-center gap-3 inline-flex'>
                <div className='justify-center items-center flex'>
                  <Eye />
                </div>
                <div className='text-gray-200 text-base font-medium leading-tight'>
                  Settings
                </div>
              </div>
            </div>
          </div>
          <Separator className='bg-zinc-800 my-2' />

          <div className='sticky bottom-0 rounded-lg items-center gap-3 flex'>
            <Eye />
            <div className='flex-col'>
              <div className='text-gray-200 text-base font-medium'>
                Disconnect Wallet
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WalletProfile;
