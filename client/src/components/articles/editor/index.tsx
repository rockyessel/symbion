'use client';

import DashboardHeader from '@/components/common/page-header';
import { TextEditor } from '@/components/editor';
import NextImage from '@/components/native/image';
import { Button } from '@/components/ui/button';
import { TabsContent } from '@/components/ui/tabs';
import { Locale } from '@/i18n.config';
import { domainURL, fileUpload } from '@/lib/utils/helpers';
import { IArticle, InputEventType, IUserProps } from '@/types';
import { useAlert } from '@gear-js/react-hooks';
import { ChangeEvent, useState, useTransition } from 'react';
import ArticleContent from './content';
import ArticleSettings from './settings';
import { useSendArticleMessage } from '@/hooks/gear/articles/useSendMessage';
import { AnyJson } from '@polkadot/types-codec/types';

interface Props {
  lang: Locale;
  session: IUserProps;
  article: IArticle;
}

const ArticleEditor = ({ lang = 'en', ...props }: Props) => {
  const { article, session } = props;
  const [isPending, startTransition] = useTransition();
  const [isProfilePending, startProfileTransition] = useTransition();
  const [isCoverPending, startCoverTransition] = useTransition();
  const [isFaviconPending, startFaviconTransition] = useTransition();
  const [file, setFile] = useState<File>();
  const [editableArticle, setEditableArticle] = useState(article);
  const alert = useAlert();
  const [profile, setProfile] = useState<string>('');
  const [cover, setCover] = useState<string>('');
  const [favicon, setFavicon] = useState<string>('');

  const sendMessage = useSendArticleMessage();

  console.log('editableArticle: ', editableArticle);

  const updateArticle = (
    key: string,
    values: undefined | string | string[]
  ) => {
    setEditableArticle((prevPage) => ({
      ...prevPage,
      [key]: values,
    }));
  };

  const handleChange = (event: InputEventType) => {
    const { target } = event;
    setEditableArticle((prePageState: any) => ({
      ...prePageState,
      [target.name]: target.value,
    }));
  };

  const handleProfileChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO fix type error later
    // @ts-ignore
    const files = Array.from(event.target.files);
    if (!files) return;
    startProfileTransition(async () => {
      const response = await fileUpload(files);
      const { success, payload, msg } = response;
      if (success) {
        alert.success('Successfully upload');
        updateArticle('profile', payload[0]);
        setProfile(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };
  const handleCoverChange = (event: ChangeEvent<HTMLInputElement>) => {
    //TODO fix type error later
    // @ts-ignore
    const files = Array.from(event.target.files);
    if (!files) return;
    startProfileTransition(async () => {
      const response = await fileUpload(files);
      const { success, payload, msg } = response;
      if (success) {
        alert.success('Successfully upload');
        updateArticle('cover', payload[0]);
        setCover(payload[0]);
      } else {
        alert.error(msg);
      }
    });
  };

  const handleCreateArticle = () => {
    const { id, ...props } = editableArticle;
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

  return (
    <div>
      <DashboardHeader>
        <fieldset className='flex items-center justify-between'>
          <fieldset className='flex items-center gap-3'>
            <Button
              onClick={handleCreateArticle}
              type='button'
              className='bg-lime-600 hover:bg-lime-700 text-black font-medium'
            >
              Sign & Create Article
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

      <TabsContent className='w-full h-full' value='content'>
        <ArticleContent
          article={editableArticle}
          handleChange={handleChange}
          updateArticle={updateArticle}
          session={session}
          lang={lang}
        />
      </TabsContent>
      <TabsContent className='w-full h-full' value='settings'>
        <ArticleSettings
          article={editableArticle}
          handleChange={handleChange}
          updateArticle={updateArticle}
          session={session}
          lang={lang}
        />
      </TabsContent>
    </div>
  );
};

export default ArticleEditor;
