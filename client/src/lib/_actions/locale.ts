'use server';

import { domainURL, returnVoid } from '../utils/helpers';
import { cookieGetter, cookieSetter } from './helpers';

export const syncLocale = async () => {
  const locale = await cookieGetter('locale');
  console.log('locale: ', locale);  if (typeof locale === 'undefined') {
    await cookieSetter('locale', 'en');
    return true;
  }
  return false;
};

export const reqSyncLocale = async () => {
  const response = await fetch(domainURL('/api/locale/sync'), {
    cache: 'no-store',
  });
  const data = await response.json();
  data.success;
};
