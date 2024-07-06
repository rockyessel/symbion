'use client';

import PageBody from './body';
import {  Fragment } from 'react';
import PageSocial from './social';
import BasicPageInformation from './basic';
import PageMonetization from './monetization';
import { domainURL } from '@/lib/utils/helpers';
import { Button } from '@/components/ui/button';
import { startTransition, useState} from 'react';
import { pageInit } from '@/lib/utils/constants';
import NextImage from '@/components/native/image';
import { TabsContent } from '@/components/ui/tabs';
import { AnyJson } from '@polkadot/types-codec/types';
import DashboardHeader from '@/components/common/page-header';
import { InputEventType, IPage, IUserProps } from '@/types';
import { useSendPageMessage } from '@/hooks/gear/pages/useSendMessage';

interface Props {
  page: IPage;
  session: IUserProps;
}


const PageEditor = ({ page, session }: Props) => {
  const sendMessage = useSendPageMessage();
  const [editablePage, setEditablePage] = useState<IPage>(pageInit);
  console.log('page: ', editablePage);


  const handlePageChange = (event: InputEventType) => {
    const { target } = event;
    setEditablePage((prePageState: any) => ({
      ...prePageState,
      [target.name]: target.value,
    }));
  };


  const handleCreatePage = () => {
    const { id, articles, posts, events, admins, members, ...props } =
      editablePage;

    props.createdAt = new Date().toISOString();
    props.updatedAt = new Date().toISOString();

    const payload = {
      Create: { ...props, owner: session.address, createdBy: session.address },
    } as unknown as AnyJson;
    console.log('payload: ', { payload: payload });
    startTransition(() => {
      sendMessage({
        payload,
        value: 2000000000000,
        keepAlive: true,
        onSuccess(messageId) {
          console.log('messageId: ', messageId);
        },
      });
    });
  };

  const updatePage = (key: string, values: undefined | string | string[]) => {
    setEditablePage((prevPage) => ({
      ...prevPage,
      [key]: values,
    }));
  };

  return (
    <Fragment>
      <DashboardHeader className='sticky bottom-0 border-b border-zinc-700/40'>
        <fieldset className='flex items-center justify-between'>
          <fieldset className='flex items-center gap-3'>
            <Button
              onClick={handleCreatePage}
              type='button'
              className='bg-lime-600 hover:bg-lime-700 text-black font-medium'
            >
              Sign & Create Page
            </Button>
          </fieldset>

          <fieldset>
            <p className='inline-flex items-center gap-1.5 border border-zinc-700/40 rounded-lg py-0.5 px-4'>
              <span className='text-lime-600 font-bold'>2</span>
              <NextImage
                width={400}
                height={400}
                className='w-5 h-5'
                alt='Vara Network Token'
                priority={true}
                src={domainURL('/token-icon.svg')}
              />
            </p>
          </fieldset>
        </fieldset>
      </DashboardHeader>
      <TabsContent className='w-full h-full' value='basic'>
        <BasicPageInformation
          page={editablePage}
          handlePageChange={handlePageChange}
          updatePage={updatePage}
          session={session}
        />
      </TabsContent>
      <TabsContent className='w-full h-full' value='social-media'>
        <PageSocial
          page={editablePage}
          handlePageChange={handlePageChange}
          updatePage={updatePage}
          session={session}
        />
      </TabsContent>
      <TabsContent className='w-full h-full' value='monetization'>
        <PageMonetization
          page={editablePage}
          handlePageChange={handlePageChange}
          updatePage={updatePage}
          session={session}
        />
      </TabsContent>
      <TabsContent className='w-full h-full' value='readme'>
        <PageBody
          page={editablePage}
          handlePageChange={handlePageChange}
          updatePage={updatePage}
          session={session}
        />
      </TabsContent>
    </Fragment>
  );
};

export default PageEditor;
