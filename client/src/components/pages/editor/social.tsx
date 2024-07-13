'use client';

import { useState } from 'react';
import { ISocial, UpdatePropsType } from '@/types';
import { ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { domainURL } from '@/lib/utils/helpers';
import NextImage from '@/components/native/image';
import DashboardHeader from '@/components/common/page-header';
import { InputEventType, IPage, IUserProps } from '@/types';
import { social, socials } from '@/lib/utils/constants';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAlert } from '@gear-js/react-hooks';

interface Props {
  page: IPage;
  session: IUserProps;
  updatePage: (key: string, values: UpdatePropsType) => void;
  handlePageChange: (event: InputEventType) => void;
}

const PageSocial = ({ page, session, updatePage }: Props) => {
  const [personalSocial, setPersonalSocial] = useState<ISocial>(social);
  const [pageSocialsState, setPageSocialsState] = useState<ISocial[]>(socials);
  const [addedSocials, setAddedSocials] = useState<ISocial[]>(page.socials);

  const alert = useAlert();

  const handleAdd = (social__: ISocial) => {
    const foundExisting = addedSocials.find(
      (social_) => social_.name === social__.name
    );

    if (foundExisting) {
      alert.error("You've already added. There cannot be a duplicate");
      return;
    }

    const updated = [...addedSocials, social__];
    setAddedSocials(updated);
    updatePage('socials', updated);
    alert.success('Social added.');
  };

  console.log('pageSocialsState: ', pageSocialsState);

  const handleCustomInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { target } = event;
    setPersonalSocial((preCustomInput: any) => ({
      ...preCustomInput,
      [target.name]: target.value,
    }));
  };

  const handleSocialChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = event.target;
    setPageSocialsState((previousCommunityState) => {
      const updatedCommunitySocial = [...previousCommunityState];
      updatedCommunitySocial[index] = {
        ...updatedCommunitySocial[index],
        [name]: value,
      };
      return updatedCommunitySocial;
    });
  };

  return (
    <div>
      <fieldset className='max-w-2xl flex flex-col w-full mt-3 px-4'>
        <div className=''>
          <p className='text-lg font-bold'>Community Social Presence</p>
          <span className='text-xs text-gray-500 block'>
            This would be displayed on your community page, which is visible to
            everyone with access to the internet.
          </span>
        </div>
        <fieldset className='flex gap-2 mt-2 flex-wrap'>
          {pageSocialsState.map((social, index) => (
            <Popover key={index}>
              <PopoverTrigger asChild>
                <button className='border border-zinc-700 w-[3.3rem] h-[3.3rem] rounded-lg p-2 disabled:pointer-events-none disabled:opacity-50'>
                  <NextImage
                    priority={true}
                    width={100}
                    height={100}
                    aria-label={social.name}
                    title={social.name}
                    alt={social.name}
                    src={social.icon}
                    className='shrink-0 w-12 aspect-square rounded-lg'
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align='start'
                className='w-80 border-zinc-800 bg-neutral-900 text-gray-300'
              >
                <div className='grid gap-4'>
                  <div className='space-y-2'>
                    <p className='font-medium leading-none'>
                      Enter Your {social.name} @handle
                    </p>
                    <p className='text-sm text-muted-foreground'>
                      This will be used to verify your identity.
                    </p>
                  </div>
                  <div className='grid gap-2'>
                    <div className='relative'>
                      <NextImage
                        priority={true}
                        width={100}
                        height={100}
                        aria-label={social.name}
                        title={social.name}
                        alt={social.name}
                        src={social.icon}
                        className='absolute left-2 top-[0.72rem] h-4 w-4 text-muted-foreground'
                      />
                      <Input
                        value={social.handler || ''}
                        placeholder='@handle eg.rockyessel'
                        className='pl-8'
                        onChange={(event) => handleSocialChange(event, index)}
                        name='handler'
                      />
                    </div>
                    <div className='w-full flex items-center justify-between'>
                      <Button
                        className='border border-zinc-600/40 bg-transparent'
                        size='icon'
                        variant='outline'
                      >
                        <Trash2
                          className='text-rose-500'
                          size={15}
                          strokeWidth={1}
                        />
                      </Button>
                      <Button
                        onClick={() => handleAdd(social)}
                        className='border border-zinc-600/40 bg-transparent'
                        variant='outline'
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          ))}

          <Popover>
            <PopoverTrigger asChild>
              <button className='border border-zinc-700 w-[3.3rem] h-[3.3rem] rounded-lg p-2'>
                <NextImage
                  priority={true}
                  width={100}
                  height={100}
                  aria-label=''
                  title=''
                  alt=''
                  src={'/socials/web.svg'}
                  className='shrink-0 w-12 aspect-square'
                />
              </button>
            </PopoverTrigger>
            <PopoverContent
              align='start'
              className='w-96 border-zinc-800 bg-neutral-900 text-gray-300'
            >
              <div className='grid gap-4'>
                <div className='space-y-2'>
                  <p className='font-medium leading-none'>
                    Enter Your/Company Website here.
                  </p>
                  <p className='text-sm text-muted-foreground m-0 p-0'>
                    You can also add up to three.
                  </p>
                </div>
                <div className='w-full flex flex-col gap-2'>
                  <div className='w-full flex items-center gap-2'>
                    <div className='border rounded-lg p-2 border-zinc-600/40'>
                      <Upload strokeWidth={2.25} />
                    </div>

                    <div className='w-full relative'>
                      <Upload
                        strokeWidth={2.25}
                        className='absolute left-2 top-[0.72rem] h-4 w-4 text-muted-foreground'
                      />
                      <Input
                        value={personalSocial?.domain}
                        placeholder='URL eg.https://host.domain'
                        className='w-full pl-8'
                        name='domain'
                        onChange={handleCustomInputChange}
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      value={personalSocial?.handler}
                      placeholder='@handle eg.rockyessel - Optional'
                      className='w-full px-2'
                      name='handler'
                      onChange={handleCustomInputChange}
                    />
                  </div>
                  <div className='w-full flex items-center justify-between'>
                    <Button
                      className='border border-zinc-600/40 bg-transparent'
                      size='icon'
                      variant='outline'
                    >
                      <Trash2
                        className='text-rose-500'
                        size={15}
                        strokeWidth={1}
                      />
                    </Button>
                    <Button
                      className='border border-zinc-600/40 bg-transparent'
                      variant='outline'
                    >
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </fieldset>
      </fieldset>

      <Table className='max-w-2xl'>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[100px]'>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
            <TableHead className='text-right'>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {addedSocials.map((social, index) => (
            <TableRow key={index}>
              <TableCell className='font-medium'>{social.name}</TableCell>
              <TableCell>{social.icon}</TableCell>
              <TableCell>{social.domain}</TableCell>
              <TableCell className='text-right'>{social.handler}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PageSocial;

const invoices = [
  {
    invoice: 'INV001',
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV002',
    paymentStatus: 'Pending',
    totalAmount: '$150.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV003',
    paymentStatus: 'Unpaid',
    totalAmount: '$350.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV004',
    paymentStatus: 'Paid',
    totalAmount: '$450.00',
    paymentMethod: 'Credit Card',
  },
  {
    invoice: 'INV005',
    paymentStatus: 'Paid',
    totalAmount: '$550.00',
    paymentMethod: 'PayPal',
  },
  {
    invoice: 'INV006',
    paymentStatus: 'Pending',
    totalAmount: '$200.00',
    paymentMethod: 'Bank Transfer',
  },
  {
    invoice: 'INV007',
    paymentStatus: 'Unpaid',
    totalAmount: '$300.00',
    paymentMethod: 'Credit Card',
  },
];
