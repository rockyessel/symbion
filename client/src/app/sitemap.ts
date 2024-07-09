import { domainURL } from '@/lib/utils/helpers';
import { MetadataRoute } from 'next';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
  return [
    {
      url: domainURL('/company/about'),
    },
  ];
};

export default sitemap;
