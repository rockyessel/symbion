'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
// import { usePopUp } from '@/hooks/usePopup';
import { decodeAddress } from '@gear-js/api';
import { useAccount } from '@gear-js/react-hooks';
// import WalletLoader from '../common/loaders/wallet';
import { cookieSetter } from '@/lib/_actions/helpers';
import { supportedWallets } from '@/lib/utils/constants';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { cn, summarizedAddress, truncate } from '@/lib/utils/helpers';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useWalletManagement } from '@/hooks/useWalletManagement';
import { Account } from '@/types';

const Wallet = () => {
  const {
    isLoading,
    selectedWallet,
    selectedAccount,
    isWalletSelected,
    isAccountSelected,
    handleSelectWallet,
    handleSelectAccount,
    isWalletExtensionAvailable,
  } = useWalletManagement();
  const [isHovered, setIsHovered] = useState(false);

  const openPopup = usePopUp;
  const { login, account } = useAccount();

  const handleMouseEnter = () => setIsHovered(true);

  const isSelectedAccount = (account_: Account) =>
    isAccountSelected && selectedAccount
      ? selectedAccount.address === account_.address
      : false;

  const handleMouseLeave = () => setIsHovered(false);

  const handleAccount = async () => {
    if (!selectedAccount) return;
    await cookieSetter('account', decodeAddress(selectedAccount.address!));
    await cookieSetter('wallet', selectedAccount.meta.source!);

    // const signedMessage = await signMessage(selectedAccount);

    // const isValid = verifySignature(
    //   signedMessage,
    //   'Please sign this message to authenticate with Your Dapp Name'
    // );

    login(selectedAccount! as unknown as InjectedAccountWithMeta);

    // openPopup({
    //   title: 'Opening popup',
    //   url: domainURL('/api/auth/popup/1c4v90ving1t43du3924DMehKqsPt4tuXHx'),
    // });
  };

  return (
    <div className='w-[730px] h-[670px] p-px bg-neutral-900 rounded-[20px] shadow border border-zinc-800 flex-col justify-center items-start inline-flex'>
      <div className='justify-center flex h-full'>
        <div className='w-[300px] px-3.5 border-r border-zinc-800 flex-col justify-center flex'>
          {isHovered && !isWalletSelected ? (
            <div className='w-full flex-col flex'>
              <div className='h-[66px] pt-6 pb-4 flex-col flex'>
                <div className='w-6 h-6' />
                <div className='text-gray-200 text-xl font-semibold'>
                  Wallet Description
                </div>
              </div>
              <article className='w-full h-[434px] flex-col items-center flex'>
                <p className='text-gray-300'>
                  <span className='text-gray-50 font-medium'>Polkadot.js</span>{' '}
                  is Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Saepe officia quibusdam temporibus laboriosam! Voluptatem
                  nobis aliquam, inventore consectetur laboriosam rem enim eum
                  praesentium molestias pariatur facilis eveniet alias laborum
                  obcaecati!
                </p>
              </article>

              <div className='h-[68px] px-6 pt-[25px] pb-6 border-t border-zinc-800 flex-col flex'>
                <div className='text-blue-500 text-base font-medium'>
                  Continue as guest
                </div>
              </div>
            </div>
          ) : isWalletSelected ? (
            <div className='w-full flex-col flex'>
              <div className='flex items-center gap-1.5 pt-6 pb-4'>
                <p className='text-gray-200 text-xl font-semibold'>
                  Available Accounts{' '}
                </p>
                <p className='inline-flex border border-zinc-300 items-center justify-center w-5 h-5 rounded-md text-sm  text-lime-200 font-medium'>
                  {selectedWallet?.accounts.length}
                </p>
              </div>
              <ScrollArea className='scrollbar-thumb-transparent w-full h-[434px] overflow-y-auto overflow-hidden flex-col items-center flex'>
                {selectedWallet && selectedWallet.accounts.length > 0 ? (
                  selectedWallet.accounts.map((account, index) => (
                    <button
                      key={index}
                      onClick={() => handleSelectAccount(account)}
                      disabled={isSelectedAccount(account)}
                      className={cn(
                        'w-full mt-4 text-zinc-500 outline-none p-2.5 -900 rounded-xl border border-zinc-800 gap-3 flex hover:bg-gray-500/20',
                        isSelectedAccount(account) ? 'border-lime-500' : ''
                      )}
                    >
                      <div className='address__profile w-8 h-8 rounded-md' />
                      <div className='w-full'>
                        <p className='inline-flex items-center w-full justify-between text-gray-200 text-xs font-medium'>
                          <span>
                            {summarizedAddress(account.address, 10, 4)}
                          </span>
                          {isSelectedAccount(account) && (
                            <span className='bg-lime-500 p-0.5 rounded-md border border-zinc-800'>
                              <Check
                                className='w-4 h-4 text-zinc-800'
                                strokeWidth={2.25}
                              />
                            </span>
                          )}
                        </p>
                        <p className='w-full inline-flex items-center justify-between  text-xs font-medium'>
                          <span className='inline-flex items-center gap-1'>
                            <span>
                              {account.meta.name
                                ? truncate(account.meta.name, 8)
                                : 'Unnamed Wallet'}
                            </span>
                            <span className='text-lime-500'>・</span>
                            <span>{account.meta.source}</span>
                          </span>
                          <Copy className='w-4 h-4' strokeWidth={2.25} />
                        </p>
                      </div>
                    </button>
                  ))
                ) : (
                  <div>
                    No Account found for this wallet, try creating an account on
                    the wallet or using a different wallet.
                  </div>
                )}

                <ScrollBar className='scrollbar-thumb-gray-800' />
              </ScrollArea>
              <div className='h-[68px] px-6 pt-[25px] pb-6 border-t border-zinc-800 flex-col flex'>
                <div className='rounded-lg justify-start items-center inline-flex'>
                  <div className='text-lime-500 text-base font-medium'>
                    Continue as guest
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className='w-full flex-col flex'>
              <div className='h-[66px] pt-6 pb-4 flex-col flex'>
                <div className='w-6 h-6' />
                <div className='text-gray-200 text-xl font-semibold'>
                  Welcome
                </div>
              </div>
              <article className='w-full h-[434px] flex-col items-center flex'>
                {/* BODY */}
                <p className='text-gray-300'>
                  <span className='text-gray-50 font-medium'>Polkadot.js</span>{' '}
                  is Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Saepe officia quibusdam temporibus laboriosam! Voluptatem
                  nobis aliquam, inventore consectetur laboriosam rem enim eum
                  praesentium molestias pariatur facilis eveniet alias laborum
                  obcaecati!
                </p>
              </article>
              <button className='outline-none h-[68px] px-6 pt-[25px] pb-6 border-t border-zinc-800 flex-col flex'>
                <div className='text-lime-500 text-base font-medium'>
                  Continue as guest
                </div>
              </button>
            </div>
          )}
        </div>

        <div className='text-white w-[428px] p-6 flex-col inline-flex'>
          {isLoading ? (
            <div>Loading...</div>
          ) : isWalletExtensionAvailable ? (
            <div className='flex flex-col'>
              <p className='text-gray-200 text-xl font-semibold'>
                Connect & Sign in
              </p>

              <div className='mt-8 px-6 flex-col justify-center items-start flex'>
                <div className='h-72 flex-col gap-6 flex'>
                  <div className='flex items-center gap-1.5'>
                    {supportedWallets.map(
                      (wallet, index) =>
                        wallet.props.isSupported && (
                          <button
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleSelectWallet(wallet.value)}
                            key={index}
                            className={cn(
                              'outline-none w-16 h-16 rounded-lg border border-zinc-800 justify-center items-center flex',
                              selectedWallet?.name === wallet.value
                                ? 'border-blue-600'
                                : ''
                            )}
                          >
                            <Image
                              width={500}
                              height={500}
                              alt={wallet.name}
                              priority={true}
                              className={cn(
                                'object-cover object-center',
                                wallet.props.className
                              )}
                              src={wallet.props.logo}
                            />
                          </button>
                        )
                    )}
                  </div>
                  <div className='justify-start items-center inline-flex'>
                    <div className='w-[140.20px] h-px border-b border-zinc-800' />
                    <div className='px-4 flex-col inline-flex'>
                      <div className=' text-sm font-normal'>OR</div>
                    </div>
                    <div className='w-[140.21px] h-px border-b border-zinc-800' />
                  </div>

                  {selectedAccount && !account ? (
                    <>
                      <button
                        onClick={async () => await handleAccount()}
                        className='w-full py-3.5 bg-lime-600 rounded-lg justify-center items-center flex'
                      >
                        <span className='text-center text-zinc-800 text-base font-medium'>
                          Connect{' '}
                          {summarizedAddress(selectedAccount.address, 10, 4)}
                        </span>
                      </button>

                      <button
                        onClick={async () => await handleAccount()}
                        className='w-full py-3.5 bg-lime-600 rounded-lg justify-center items-center flex'
                      >
                        <span className='text-center text-zinc-800 text-base font-medium'>
                          Connect{' '}
                          {summarizedAddress(selectedAccount.address, 10, 4)}{' '}
                          with Google
                        </span>
                      </button>

                      <button
                        onClick={async () => await handleAccount()}
                        className='w-full py-3.5 bg-lime-600 rounded-lg justify-center items-center flex'
                      >
                        <span className='text-center text-zinc-800 text-base font-medium'>
                          Connect{' '}
                          {summarizedAddress(selectedAccount.address, 10, 4)}
                        </span>
                      </button>
                    </>
                  ) : (
                    <span className='w-full py-3.5 bg-lime-600 rounded-lg justify-center items-center flex text-black font-medium'>
                      Continue without connecting
                    </span>
                  )}
                </div>
              </div>
              <p className='text-xs'>
                By connecting, you agree to the
                <span className='text-lime-500 text-xs font-medium'>
                  Terms of Service{' '}
                </span>
                &{' '}
                <span className='text-lime-500 text-xs font-medium'>
                  Privacy Policy
                </span>
              </p>
            </div>
          ) : (
            <div className='text-white'>
              <p>
                A compatible wallet was not found or is disabled. Install it
                following the{' '}
                <a
                  href='https://wiki.vara-network.io/docs/account/create-account/'
                  target='_blank'
                  rel='noreferrer'
                >
                  instructions
                </a>
                .
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
