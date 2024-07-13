'use client';

import { GlobalState } from '@/lib/utils/constants';
import { cn } from '@/lib/utils/helpers';
import { PanelLeft, PanelRight } from 'lucide-react';
import { ReactNode } from 'react';
import { useSnapshot } from 'valtio';

interface Props {
  children?: ReactNode;
  className?: string;
}

const DashboardHeader = ({ children, className }: Props) => {
  const snap = useSnapshot(GlobalState);

  const handleCollapse = () => {
    const defaultState = snap.subNavbarState;
    GlobalState.subNavbarState = !defaultState;
  };

  return (
    <div className={cn('w-full flex items-center justify-between', className)}>
      <button className='group' onClick={handleCollapse}>
        {snap.subNavbarState ? (
          <PanelLeft className='group-hover:text-lime-500' strokeWidth={1.35} />
        ) : (
          <PanelRight
            className='group-hover:text-lime-500'
            strokeWidth={1.35}
          />
        )}
      </button>
      {children}
    </div>
  );
};

export default DashboardHeader;
