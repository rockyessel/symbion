'use client';

import { cn, domainURL } from '@/lib/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import NextImage from '../native/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AddressType } from '@/types';

interface Props {
  blogId: AddressType;
}

const BlogDashboardSidebar = ({ blogId }: Props) => {
  const [segment, setSegment] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const segments = pathname.split('/');
    const lastSegment = segments[segments.length - 1];
    console.log('lastSegment: ', lastSegment);
    if (lastSegment) setSegment(lastSegment);
  }, [pathname]);

  console.log('segment: ', segment);
  const top = ['dashboard', 'article', 'categories', ''];
  const down = ['settings'];

  return (
    <div className='!w-[280px] hidden md:flex bg-neutral-900 flex-col gap-3 h-screen py-5 sticky top-0 border-r border-zinc-700/40'>
      <p className='w-full inline-flex items-center justify-center gap-1'>
        <NextImage
          src={domainURL('/symbion/logo.svg')}
          width={400}
          height={400}
          alt='Symbion'
          className='w-8 h-8'
        />
        <span className=''>Symbion Dashboard</span>
      </p>

      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='item-1'>
          <AccordionTrigger>
            <Link href={domainURL(`/dashboard/${blogId}/articles/new`)}>
              Create article
            </Link>
          </AccordionTrigger>
        </AccordionItem>
        <AccordionItem value='item-1'>
          <AccordionTrigger>Manage articles</AccordionTrigger>
          <AccordionContent>
            <ul>
              <li>All Articles</li>
              <li>Drafts</li>
              <li>Published</li>
              <li>Categories</li>
              <li>Archived</li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='item-2'>
          <AccordionTrigger>Storage</AccordionTrigger>
        </AccordionItem>
      </Accordion>

      {/*      
      <ul className='space-y-1 px-4'>
        {down.map((item, index) => (
          <li key={index}>
            <Link
              href={`/dashboard/${item}`}
              className={cn(
                'block rounded-md px-4 py-3 text-sm font-medium text-gray-700 capitalize hover:',
                item === segment
                  ? 'bg-lime-500 font-bold'
                  : 'text-zinc-400 hover:text-zinc-500'
              )}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default BlogDashboardSidebar;
