import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { getArticles } from '@/lib/posts';

export const metadata: Metadata = {
  title: 'Guías de GTA 6: lanzamiento, PC, precio y mapa',
  description: 'Todas las guías de Radar Leonida sobre Grand Theft Auto VI, organizadas por lanzamiento, PC, instalación, compra, mapa y multijugador.',
  alternates: { canonical: '/guias' },
};

export default function GuidesPage() {
  const articles = getArticles();
  return (
    <div className="listing-page wrap">
      <header className="listing-header">
        <span className="eyebrow">ÍNDICE DE CONTENIDO</span>
        <h1>Guías para <span>llegar informado.</span></h1>
        <p>Encuentra una respuesta rápida o profundiza en lo confirmado por Rockstar y Take-Two. Cada artículo muestra sus fuentes y fecha de revisión.</p>
      </header>
      <div className="listing-filter-row"><span>{articles.length} guías publicadas</span><span>Ordenadas por fecha de revisión</span></div>
      <div className="article-grid article-grid-listing">
        {articles.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}
      </div>
    </div>
  );
}
