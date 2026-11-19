import { getArticles } from '@/lib/posts';
import { canonical, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';

function xmlEscape(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

export function GET() {
  const articles = getArticles();
  const latest = articles[0]?.dateModified ?? '2026-11-19';
  const items = articles.map((article) => {
    const url = canonical(`/guia/${article.slug}`);
    const pubDate = new Date(`${article.dateModified}T12:00:00-05:00`).toUTCString();
    return `    <item>\n      <title>${xmlEscape(article.title)}</title>\n      <link>${xmlEscape(url)}</link>\n      <guid isPermaLink="true">${xmlEscape(url)}</guid>\n      <description>${xmlEscape(article.description)}</description>\n      <pubDate>${pubDate}</pubDate>\n      <category>${xmlEscape(article.category)}</category>\n    </item>`;
  }).join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0">\n  <channel>\n    <title>${xmlEscape(SITE_NAME)}</title>\n    <link>${xmlEscape(canonical('/'))}</link>\n    <description>${xmlEscape(SITE_DESCRIPTION)}</description>\n    <language>es-CO</language>\n    <lastBuildDate>${new Date(`${latest}T12:00:00-05:00`).toUTCString()}</lastBuildDate>\n${items}\n  </channel>\n</rss>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } });
}
