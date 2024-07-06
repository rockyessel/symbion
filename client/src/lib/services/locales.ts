import type { Locale } from '../../i18n.config';

const promiseModule = async () => {
  return {
    en: () => import('@/locales/en.json').then((module) => module.default),
    de: () => import('@/locales/de.json').then((module) => module.default),
  };
};

export const getLocale = async (locale: Locale) => {
  const locales = await promiseModule();
  const locale_ = await locales[locale]();
  return locale_;
};
