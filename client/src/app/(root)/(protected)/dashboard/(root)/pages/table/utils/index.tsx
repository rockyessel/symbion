'use client';

import {
  CheckCircledIcon,
  LockClosedIcon,
  LockOpen1Icon,
  SewingPinFilledIcon,
  CircleBackslashIcon,
  ArchiveIcon,
} from '@radix-ui/react-icons';
import { Badge } from '@/components/ui/badge';
import moment from 'moment';
import { Checkbox } from '@radix-ui/react-checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { IPage, StatusType, VisibilityType } from '@/types';
import { DataTableColumnHeader } from '../column-header';
import { TableRowActions } from '../row-actions';
import { ForwardRefExoticComponent, RefAttributes } from 'react';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import NextImage from '@/components/native/image';
import { domainURL, summarizedAddress } from '@/lib/utils/helpers';
import Link from 'next/link';
import { ExternalLinkIcon } from 'lucide-react';

export const labels = [
  {
    value: 'bug',
    label: 'Bug',
  },
  {
    value: 'feature',
    label: 'Feature',
  },
  {
    value: 'documentation',
    label: 'Documentation',
  },
];

interface IStatusPage {
  value: StatusType;
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}
export const statuses: IStatusPage[] = [
  {
    value: 'Active',
    label: 'Active',
    icon: CheckCircledIcon,
  },
  {
    value: 'Inactive',
    label: 'Inactive',
    icon: CircleBackslashIcon,
  },
  {
    value: 'Archived',
    label: 'Archived',
    icon: ArchiveIcon,
  },
];

interface IVisibilityPage {
  value: VisibilityType;
  label: string;
  icon: ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>;
}
export const visibility: IVisibilityPage[] = [
  {
    value: 'Private',
    label: 'Private',
    icon: LockClosedIcon,
  },
  {
    value: 'Public',
    label: 'Public',
    icon: LockOpen1Icon,
  },
  {
    value: 'Restricted',
    label: 'Restricted',
    icon: SewingPinFilledIcon,
  },
];

export const col = (pageId?: string) => {
  const columns: ColumnDef<IPage>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label='Select all'
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label='Select row'
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'owner',
      accessorKey: 'owner',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Owner' />
      ),
      cell: ({ row }) => (
        <div className='w-[80px] font-medium'>
          {summarizedAddress(row.getValue('owner'), 3, 8)}
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'pageType',
      accessorKey: 'pageType',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Page Type' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex space-x-2'>
            <Badge>{row.getValue('pageType')}</Badge>
          </div>
        );
      },
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Name' />
      ),
      cell: ({ row }) => {
        const page = row.original;

        return (
          <div className='inline-flex items-center gap-1'>
            <NextImage
              src={page.profile}
              alt={row.getValue('name')}
              width={500}
              height={500}
              className='w-5 h-5 rounded-full'
            />
            <span>{row.getValue('name')}</span>
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,
    },
    {
      id: 'username',
      accessorKey: 'username',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Username' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex w-[100px] items-center'>
            <span>{row.getValue('username')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Status' />
      ),
      cell: ({ row }) => {
        const status = statuses.find(
          (status) => status.value === row.getValue('status')
        );

        if (!status) {
          return <>status not set</>;
        }

        return (
          <div className='flex w-[100px] items-center'>
            {status.icon && (
              <status.icon className='mr-2 h-4 w-4 text-muted-foreground' />
            )}
            <span>{status.label}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'visibility',
      accessorKey: 'visibility',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Visibility' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex w-[100px] items-center'>
            <span>{row.getValue('visibility')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'category',
      accessorKey: 'category',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Category' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center'>
            <span>{row.getValue('category')}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'isPaid',
      accessorKey: 'isPaid',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title='Page Join ' />
      ),
      cell: ({ row }) => {
        return (
          <div className='flex items-center'>
            <span>{row.getValue('isPaid') ? true && 'i' : !false && 'jj'}</span>
          </div>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'Visit',
      header: () => <span>Visit</span>,
      cell: ({ row }) => {
        return (
          <Link
            target='_blank'
            href={domainURL(`/dashboard/pages/${row.getValue('username')}`)}
            className='flex items-center'
          >
            <ExternalLinkIcon className='w-4 h-4' />
          </Link>
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <TableRowActions pageId={pageId} row={row} />,
    },
  ];

  return columns;
};
