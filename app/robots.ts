import type { MetadataRoute } from 'next';
import { canonical, SITE_URL } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: canonical('/sitemap.xml'),
    host: SITE_URL,
  };
}
