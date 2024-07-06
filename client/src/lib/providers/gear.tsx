'use client';

import { ApiProvider as GearApiProvider, AlertProvider as GearAlertProvider, AccountProvider } from '@gear-js/react-hooks';
import { Alert, alertStyles } from '@gear-js/ui';
import { Fragment, ReactNode, useEffect, useState } from 'react';

interface Props {
  children: ReactNode;
}

const GearProvider = ({ children }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  console.log('isMounted: ', isMounted);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [provider] = useState(() => {
    if (window) {
      return Providers;
    }
  });

  return (
    <Fragment>
      {isMounted && provider ? provider({ children }) : children}
    </Fragment>
  );
};

export default GearProvider;

const Providers = ({ children }: Props) => {
  return (
    <GearApiProvider initialArgs={{ endpoint: 'wss://testnet.vara.network' }}>
      <GearAlertProvider template={Alert} containerClassName={alertStyles.root}>
        <AccountProvider>{children}</AccountProvider>
      </GearAlertProvider>
    </GearApiProvider>
  );
};
