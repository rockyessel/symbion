'use client';

import { useState } from 'react';
import { Info } from 'lucide-react';
import { Label } from '@/components/ui/label';
import NativeInput from '@/components/native/input';
import InfoHoverCard from '@/components/common/info-card';
import {
  InputEventType,
  IPage,
  IUserProps,
  Option,
  StatusType,
  VisibilityType,
} from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  page: IPage;
  session: IUserProps;
  handlePageChange: (event: InputEventType) => void;
  updatePage: (key: string, values: undefined | string | string[]) => void;
}

const getInitialOption = (
  options: Option[],
  pageOptionName: string
): Option => {
  return options.find((option) => option.name === pageOptionName) || options[0];
};

const PageMonetization = ({ page, handlePageChange, updatePage }: Props) => {
  const [visibility, setVisibility] = useState<Option>(() =>
    getInitialOption(pageVisibilityOptions, page.visibility)
  );

  const [status, setStatus] = useState<Option>(() =>
    getInitialOption(pageStatusOptions, page.status)
  );

  const handleVisibilityChange = (value: string) => {
    const foundVisibility = pageVisibilityOptions.find(
      (option) => option.name === value
    );
    if (foundVisibility) {
      setVisibility(foundVisibility);
      updatePage('visibility', foundVisibility.name);
    }
  };

  const handleStatusChange = (value: string) => {
    const foundStatus = pageStatusOptions.find(
      (option) => option.name === value
    );
    if (foundStatus) {
      setStatus(foundStatus);
      updatePage('status', foundStatus.name);
    }
  };
  return (
    <div className='w-full flex flex-col gap-4 px-4'>
      <div>
        <p className='text-lg font-bold'>Page Monetization</p>
        <span className='text-xs text-gray-500 block'>
          This will be displayed on your community page, visible to everyone
          with access to the internet.
        </span>
      </div>

      <form className='max-w-2xl flex flex-col gap-2'>
        <fieldset className='flex flex-col gap-3'>
          <div className='flex flex-col gap-1'>
            <Label className='font-medium h-10 inline-flex flex-col gap-1'>
              Visibility
              <span className='text-xs text-gray-500 block'>
                The name you want to call your page. (e.g., Mr.Beast, Vara
                Network)
              </span>
            </Label>
            <div className='mt-1'>
              <Select onValueChange={handleVisibilityChange}>
                <SelectTrigger className='text-sm text-lime-600 font-medium w-full p-2'>
                  {visibility ? (
                    <div className='flex items-center gap-2.5'>
                      <span>{visibility.name}</span>
                      <InfoHoverCard className='w-full max-w-md p-2'>
                        {visibility.info}
                      </InfoHoverCard>
                    </div>
                  ) : (
                    <SelectValue placeholder='Set your page visibility' />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Page visibility</SelectLabel>
                    {pageVisibilityOptions.map((option, index) => (
                      <SelectItem
                        key={index}
                        className='w-full'
                        value={option.name}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <Label className='font-medium h-10 inline-flex flex-col gap-1'>
              Page Status
              <span className='text-xs text-gray-500 block'>
                Provide and claim a unique username for the page before someone
                else does. (e.g., mrbeast, vara-network)
              </span>
            </Label>
            <div className='mt-1'>
              <Select onValueChange={handleStatusChange}>
                <SelectTrigger className='text-sm text-lime-600 font-medium w-full p-2'>
                  {status ? (
                    <div className='flex items-center gap-2.5'>
                      <span>{status.name}</span>
                      <InfoHoverCard className='w-full max-w-md p-2'>
                        {status.info}
                      </InfoHoverCard>
                    </div>
                  ) : (
                    <SelectValue placeholder='Set your page status' />
                  )}
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Page status</SelectLabel>
                    {pageStatusOptions.map((option, index) => (
                      <SelectItem
                        key={index}
                        className='w-full'
                        value={option.name}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </fieldset>

        {visibility.name === 'Public' && (
          <div className='flex items-start gap-2 border border-zinc-700/40 p-2 rounded-lg text-sm'>
            <p className='inline-flex items-center gap-1.5 text-lime-600 font-medium'>
              <Info size={20} strokeWidth={2.25} className='w-4 h-4' /> Notice:
            </p>
            <span className='text-gray-400'>
              You cannot set an entry amount if page visibility is set to
              public.
            </span>
          </div>
        )}

        <div className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Price
            <span className='text-xs text-gray-500 block'>
              The name you want to call your page. (e.g., Mr.Beast, Vara
              Network)
            </span>
          </Label>
          <div className='mt-1'>
            <NativeInput
              disabled={visibility.name === 'Public'}
              label='Enter entry amount'
              value={page.entryAmount}
              onChange={handlePageChange}
              name='entryAmount'
              type='number'
              min={1}
              placeholder='e.g., 10 TVARA'
            />
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <Label className='font-medium h-10 inline-flex flex-col gap-1'>
            Compare Price
            <span className='text-xs text-gray-500 block'>
              The name you want to call your page. (e.g., Mr.Beast, Vara
              Network)
            </span>
          </Label>
          <div className='mt-1'>
            <NativeInput
              disabled={visibility.name === 'Public'}
              label='Enter last entry amount'
              value={page.compareEntryAmount}
              onChange={handlePageChange}
              name='compareEntryAmount'
              min={1}
              type='number'
              placeholder='e.g., 100 TVARA'
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default PageMonetization;

export const pageVisibilityOptions: Option[] = [
  {
    name: 'Public',
    info: 'Public pages appear on the feeds, and outside the platform, and anyone can join.',
  },
  {
    name: 'Private',
    info: 'Private pages appear on feeds and outside the platform. But members can only be added by the owner or admins.',
  },
  {
    name: 'Restricted',
    info: 'Restricted pages are private and can only be found with links, which use addresses and not slugs.',
  },
];

export const pageStatusOptions: Option[] = [
  {
    name: 'Active',
    info: 'Active pages are accessible and visible to the intended audience.',
  },
  {
    name: 'Inactive',
    info: 'Inactive pages are hidden and not accessible to the audience.',
  },
  {
    name: 'Archived',
    info: 'Archived pages are saved for future reference and are not active.',
  },
];
