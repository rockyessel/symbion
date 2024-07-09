'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getInitialOption } from '@/lib/utils/helpers';
import { Option } from '@/types';
import { useState } from 'react';
import { Label } from '../ui/label';
import InfoHoverCard from './info-card';

interface Props {
  optionTitle: string;
  onChange: (value: string) => void;
  subDescription?: string;
  options: Option[];
  defaultOptionName: string;
}

const OptionSelector = ({
  onChange,
  defaultOptionName,
  options,
  subDescription,
  optionTitle,
}: Props) => {
  const [option, setOption] = useState<Option>(() =>
    getInitialOption(options, defaultOptionName)
  );

  const onOptionChange = (value: string) => {
    const foundOption = options.find((option) => option.name === value);
    if (foundOption) {
      setOption(foundOption);
      onChange(foundOption.name);
    }
  };

  return (
    <div className='flex flex-col gap-1'>
      <Label className='font-medium h-10 inline-flex flex-col gap-1'>
        {optionTitle}
        <span className='text-xs text-gray-500 block'>{subDescription}</span>
      </Label>
      <div className='mt-1'>
        <Select onValueChange={onOptionChange}>
          <SelectTrigger className='text-sm text-lime-600 font-medium w-full p-2'>
            {option ? (
              <div className='flex items-center gap-2.5'>
                <span>{option.name}</span>
                <InfoHoverCard className='w-full max-w-md p-2'>
                  {option.info}
                </InfoHoverCard>
              </div>
            ) : (
              <SelectValue placeholder='Set your page option' />
            )}
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Options lists</SelectLabel>
              {options.map((option, index) => (
                <SelectItem key={index} className='w-full' value={option.name}>
                  {option.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default OptionSelector;
