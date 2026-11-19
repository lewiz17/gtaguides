import type { Metadata } from 'next';
import Link from 'next/link';
import { ArticleCard } from '@/components/ArticleCard';
import { SearchForm } from '@/components/SearchForm';
import { getArticles, searchArticles } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Buscar guías de GTA 6',
  description: 'Busca en las guías de Radar Leonida por plataforma, precio, mapa, descarga, fecha y más.',
  alternates: { canonical: '/buscar' },
  robots: { index: false, follow: true },
};

type SearchPageProps = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '' } = await searchParams;
  const results = searchArticles(q);
  const suggestions = getArticles().slice(0, 3);
  return (
    <div className="listing-page search-page wrap">
      <header className="listing-header search-header">
        <span className="eyebrow">BUSCADOR EDITORIAL</span>
        <h1>¿Qué necesitas <span>saber?</span></h1>
        <p>Busca por pregunta, tema o plataforma. Las respuestas enlazan sus fuentes oficiales.</p>
        <SearchForm compact initialValue={q} />
      </header>
      {q ? (
        <section className="search-results" aria-live="polite">
          <div className="listing-filter-row"><span>Resultados para “{q}”</span><span>{results.length} coincidencia{results.length === 1 ? '' : 's'}</span></div>
          {results.length ? <div className="article-grid article-grid-listing">{results.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}</div> : (
            <div className="empty-state"><span aria-hidden="true">⌕</span><h2>No encontramos esa búsqueda.</h2><p>Prueba con “PC”, “hora”, “precio” o “mapa”, o vuelve al índice completo.</p><Link className="button button-primary" href="/guias">Ver todas las guías <span aria-hidden="true">↗</span></Link></div>
          )}
        </section>
      ) : (
        <section className="search-results">
          <div className="listing-filter-row"><span>Consultas populares</span><span>Elige una guía para empezar</span></div>
          <div className="article-grid article-grid-listing">{suggestions.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}</div>
        </section>
      )}
    </div>
  );
}
