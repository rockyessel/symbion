import { getLocale } from '@/lib/services/locales';
import MainHub from '@/components/sections/main-hub';
import { getLang } from '@/lib/_actions/helpers';
import { Fragment } from 'react';

const Home = async () => {
  const lang = await getLang();
  const { navigation, page } = await getLocale(lang);
  console.log({ navigation, page });

  return (
    <Fragment>
      <MainHub />;
    </Fragment>
  );
};

export default Home;
