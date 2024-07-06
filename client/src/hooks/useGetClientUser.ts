'use client';

import { IUserProps } from '@/types';
import { useSession } from 'next-auth/react';

const GetClientUser = (): IUserProps | null => {
  const { data: session } = useSession();
  const currentUser = { ...session?.user } as IUserProps;
  if (currentUser === null) return null;
  return currentUser;
};

export { GetClientUser as getClientUser };
