'use server';

import { Locale } from '@/i18n.config';
import { cookies } from 'next/headers';

/**
 * Removes a cookie by its name.
 * @param name - The name of the cookie to remove.
 */
export const cookieRemover = async (name: string) => {
  const cookieStore = cookies();
  // Delete the cookie with the specified name
  cookieStore.delete(name);
};

/**
 * Sets a cookie with a specified name and value.
 * @param name - The name of the cookie to set.
 * @param value - The value of the cookie.
 */
export const cookieSetter = async (name: string, value: string) => {
  const cookieStore = cookies();
  // Set the cookie with the specified name and value
  // Secure and HttpOnly options are enabled for added security
  cookieStore.set(name, value, { secure: true, httpOnly: true });
};

const DEFAULT_LOCALE = 'en';

/**
 * Retrieves the value of a cookie by its name.
 * @param name - The name of the cookie to retrieve.
 * @returns A promise that resolves to the value object of the cookie, or undefined if not found.
 */
export const cookieGetter = async (name: string) => {
  const cookieStore = cookies();
  // Get the value of the cookie with the specified name
  const cookie = cookieStore.get(name);

  return cookie;
};

export const getLang = async (): Promise<Locale> => {
  const getLocale = await cookieGetter('locale');

  if (!getLocale) return DEFAULT_LOCALE;

  const lang = `${getLocale.value}` as unknown as Locale;

  return lang;
};



