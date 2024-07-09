'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ChangeEvent, HTMLAttributes, useState } from 'react';
import { getClientUser } from '@/hooks/useGetClientUser';
import { cn } from '@/lib/utils/helpers';
import { AddressType } from '@/types';

interface Props extends HTMLAttributes<HTMLSpanElement> {
  blogId: AddressType;
  className?: string;
}
const TransferBlog = ({ blogId, className, ...props }: Props) => {
  const [role, setRole] = useState<string>('');

  const currentUser = getClientUser();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
  };

  const handleInviteSubmission = async () => {};

  return (
    <Dialog>
      <DialogTrigger asChild>
        <span {...props} className={cn('cursor-pointer', className)}>
          Send invite
        </span>
      </DialogTrigger>
      <DialogContent className=''>
        <DialogHeader>
          <DialogTitle>Collaborate with others seamlessly.</DialogTitle>
          <DialogDescription>{''}</DialogDescription>
        </DialogHeader>
        <form className='flex flex-col gap-4'>
          <fieldset className='flex flex-col gap-2'>
            <Label>{`Enter invitee's email`}</Label>
            <Input
              type='email'
              name='invitee'
              onChange={handleInputChange}
              placeholder='example@company.domain'
              className='placeholder:'
            />
          </fieldset>
          <fieldset className='w-full mt-2 inline-flex flex-col gap-1 items-start'>
            <span className='text-sm font-medium'>
              {true
                ? 'Make articles and drafts available to invitee.'
                : 'Manually, assign article or draft to invitee.'}
            </span>
            <label className='relative inline-flex items-center cursor-pointer'>
              <Input
                className='sr-only peer'
                type='checkbox'
                title='Disable Comments'
                name='isAllowedAccessToAllArticleDraft'
                checked={true}
                onChange={handleInputChange}
              />
              <div className="w-8 h-5 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-slate-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-slate-900 after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-600"></div>
            </label>
          </fieldset>
          <fieldset>
            <Select onValueChange={(value) => setRole(value)}>
              <SelectTrigger name='role' className='w-[180px]'>
                <SelectValue
                  onChange={handleInputChange || undefined}
                  placeholder='Assign a role'
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='collaborator'>Collaborator</SelectItem>
                  <SelectItem value='editor'>Editor</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </fieldset>
        </form>
        <DialogFooter>
          <Button onClick={handleInviteSubmission} type='submit'>
            Send invite now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TransferBlog;
