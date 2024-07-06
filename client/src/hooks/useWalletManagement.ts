'use client';

import { supportedWallets } from '@/lib/utils/constants';
import {
  domainURL,
  filterAndGroupAccounts,
  returnVoid,
  windowIsDefined,
} from '@/lib/utils/helpers';
import { Account, Wallet } from '@/types';
import { useAccount, useAlert } from '@gear-js/react-hooks';
import { ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

interface WalletContextProps {
  isWalletExtensionAvailable: boolean;
  isLoading: boolean;
  isWalletSelected: boolean;
  isAccountSelected: boolean;
  wallets: Wallet[];
  handleSelectAccount: (account_: Account | undefined) => void;
  selectedWallet: Wallet | undefined;
  selectedAccount: Account | undefined;
  handleSelectWallet: (name: string) => void;
}

export const useWalletManagement = () => {
  const { extensions, account, accounts } = useAccount();
  const [isLoading, setIsLoading] = useState(true);
  const [isWalletExtensionAvailable, setIsWalletExtensionAvailable] =
    useState(false);
  const [wallets, setWallets] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet>();
  const [selectedAccount, setSelectedAccount] = useState<Account>();
  const [isWalletSelected, setIsWalletSelected] = useState(false);
  const [isAccountSelected, setIsAccountSelected] = useState(false);
  const alert = useAlert();

  console.log('selectedAccount: ', selectedAccount);

  const handleSelectAccount = (account_: Account | undefined) => {
    if (!account_) return returnVoid();
    setSelectedAccount(account_);
    setIsAccountSelected(true);
  };

  const handleSelectWallet = (value: string) => {
    const foundWallet = supportedWallets.find(
      (wallet) => wallet.value === value
    );
    if (!foundWallet) {
      alert.error(`<p>No wallet was found</p>`);
      return returnVoid();
    }
    if (!foundWallet?.props.isSupported) {
      alert.error(
        `<p>The wallet you selected is not supported by Vara Network </p>`
      );
      return returnVoid();
    }
    const wallet = wallets.find((w) => w.name === foundWallet.value);
    setSelectedWallet(wallet);
    setIsWalletSelected(true);
  };

  useEffect(() => {
    if (windowIsDefined) {
      setIsLoading(true);
      if (typeof extensions !== 'undefined') {
        if (extensions.length > 0) {
          setIsWalletExtensionAvailable(true);
          const wallets_ = filterAndGroupAccounts(accounts);
          setWallets(wallets_);
          setIsLoading(false);
        } else {
          setIsWalletExtensionAvailable(false);
          setIsLoading(false);
        }
      }
    }
  }, [extensions?.length, accounts, extensions]);

  const values: WalletContextProps = {
    handleSelectAccount,
    handleSelectWallet,
    isWalletExtensionAvailable,
    isLoading,
    wallets,
    selectedWallet,
    isWalletSelected,
    selectedAccount,
    isAccountSelected,
  };

  return values;
};
