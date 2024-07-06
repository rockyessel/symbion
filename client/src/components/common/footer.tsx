import Image from 'next/image';
import Link from 'next/link';
import Logo from '@/public/vercel.svg';
import Balancer from 'react-wrap-balancer';
import { Container, Section } from './warppers';
import { domainURL } from '@/lib/utils/helpers';

const Footer = () => {
  return (
    <footer className='not-prose border-t'>
      <Section>
        <Container className='grid gap-6'>
          <div className='grid gap-6'>
            <Link href='/'>
              <h3 className='sr-only'>brijr/components</h3>
              <Image
                src={domainURL('/vercel.svg')}
                alt='Logo'
                width={120}
                height={27.27}
                className='dark:invert hover:opacity-75 transition-all'
              />
            </Link>
            <p>
              <Balancer>
                brijr/components is a collection of Next.js, React, Typescript
                components for building landing pages and websites.
              </Balancer>
            </p>
            <div className='flex flex-col md:flex-row mb-6 md:mb-0 gap-4 underline underline-offset-4 text-sm text-muted-foreground'>
              <Link href='/privacy-policy'>Privacy Policy</Link>
              <Link href='/terms-of-service'>Terms of Service</Link>
              <Link href='/cookie-policy'>Cookie Policy</Link>
            </div>
            <p className='text-muted-foreground'>
              ©{' '}
              <a href='https://github.com/brijr/components'>brijr/components</a>
              . All rights reserved. 2024-present.
            </p>
          </div>
        </Container>
      </Section>
    </footer>
  );
};

export default Footer;
