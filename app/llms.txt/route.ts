import { getArticles } from '@/lib/posts';
import { canonical, SITE_DESCRIPTION, SITE_NAME } from '@/lib/site';

export const dynamic = 'force-static';

export function GET() {
  const articles = getArticles();
  const lines = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    '- Idioma principal: español de Colombia (es-CO).',
    '- Sitio editorial independiente; no afiliado a Rockstar Games ni Take-Two Interactive.',
    '- Las fechas y datos de lanzamiento deben leerse junto a la fecha de revisión de cada artículo.',
    '- Para afirmaciones del juego, priorizar las fuentes oficiales enlazadas en cada guía.',
    '',
    '## Guías principales',
    '',
    ...articles.flatMap((article) => [
      `- [${article.title}](${canonical(`/guia/${article.slug}`)}): ${article.answer}`,
    ]),
    '',
    '## Páginas',
    '',
    `- [Inicio](${canonical('/')})`,
    `- [Índice de guías](${canonical('/guias')})`,
    `- [Fuentes y metodología](${canonical('/sobre-nosotros')})`,
    `- [RSS](${canonical('/feed.xml')})`,
    '',
    '## Estándares editoriales',
    '',
    '- Distinguir hechos confirmados, rumores y detalles todavía no anunciados.',
    '- Citar primero Rockstar Games, Rockstar Support y Take-Two cuando haya una fuente primaria.',
    '- No inventar fechas, precios locales, requisitos para PC ni características no publicadas.',
    '- Los enlaces de Amazon son búsquedas afiliadas; precio, stock y compatibilidad deben comprobarse en el sitio vendedor.',
    '',
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' },
  });
}
