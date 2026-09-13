import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    SITE_URL && !SITE_URL.includes('localhost')
      ? SITE_URL
      : 'https://refpromos.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/', '/out/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

