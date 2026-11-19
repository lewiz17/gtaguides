import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/posts';
import { canonical } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: '/', priority: 1, frequency: 'daily' as const },
    { path: '/guias', priority: 0.9, frequency: 'daily' as const },
    { path: '/sobre-nosotros', priority: 0.4, frequency: 'monthly' as const },
  ];
  const staticEntries = staticRoutes.map((route) => ({
    url: canonical(route.path),
    lastModified: new Date('2026-11-19T12:00:00-05:00'),
    changeFrequency: route.frequency,
    priority: route.priority,
  }));
  const articleEntries = getArticles().map((article) => ({
    url: canonical(`/guia/${article.slug}`),
    lastModified: new Date(`${article.dateModified}T12:00:00-05:00`),
    changeFrequency: 'weekly' as const,
    priority: article.featured ? 0.9 : 0.8,
  }));
  return [...staticEntries, ...articleEntries];
}
