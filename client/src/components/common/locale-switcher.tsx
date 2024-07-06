'use client';

import { useRouter } from 'next/navigation';
import { i18n, Locale } from '../../i18n.config';
import { localeLanguage } from '@/lib/utils/constants';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState, useTransition } from 'react';
import { cookieSetter } from '@/lib/_actions/helpers';

interface Props {
  lang: Locale;
}

// Define the type for a locale item
type TLocale = {
  code: string;
  name: string;
};

// Extend the Locale type with a status property
type LocaleWithStatus = TLocale & { status: 'implemented' | 'coming soon' };

const LocaleSwitcher = ({ lang }: Props) => {
  const [currentLocale, setCurrentLocale] = useState(lang);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleLocaleSelect = (code: string) => {
    startTransition(async () => {
      await cookieSetter('locale', code);
      setCurrentLocale(code as unknown as Locale);
      router.refresh();
    });
  };

  console.log('currentLocale: ', currentLocale);

  // Convert implemented locales to a Set for fast lookup
  const implementedLocales = new Set(i18n.locales);

  // Separate implemented and coming soon locales with type annotations
  const implemented: LocaleWithStatus[] = [];
  const comingSoon: LocaleWithStatus[] = [];

  localeLanguage.forEach((locale: TLocale) => {
    // @ts-ignore
    if (implementedLocales.has(locale.code)) {
      implemented.push({ ...locale, status: 'implemented' });
    } else {
      comingSoon.push({ ...locale, status: 'coming soon' });
    }
  });

  // Concatenate the implemented and coming soon locales
  const allLocales = [...implemented, ...comingSoon];

  return (
    <Select
      disabled={isPending}
      onValueChange={handleLocaleSelect}
      defaultValue={currentLocale}
    >
      <SelectTrigger className='py-1 bg-transparent border-none pl-0 pr-1.5 w-[280px] focus:ring-0 ring-offset-transparent border-transparent outline-none'>
        <SelectValue
          placeholder='Select a language'
          className='text-normal !py-0'
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Languages</SelectLabel>
          {allLocales.map((locale) => (
            <SelectItem
              disabled={locale.status === 'coming soon'}
              key={locale.code}
              value={locale.code}
            >
              {locale.name} {locale.status === 'coming soon' && '(coming soon)'}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default LocaleSwitcher;
