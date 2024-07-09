import { domainURL } from '@/lib/utils/helpers';
import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [''],
      },
    ],
    sitemap: domainURL('/sitemap.xml'),
  };
};

export default robots;
