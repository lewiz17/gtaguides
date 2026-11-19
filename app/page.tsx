import Link from 'next/link';
import type { Metadata } from 'next';
import { ArticleCard } from '@/components/ArticleCard';
import { Cityscape } from '@/components/Cityscape';
import { JsonLd } from '@/components/JsonLd';
import { SearchForm } from '@/components/SearchForm';
import { getArticles } from '@/lib/posts';
import { canonical, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/site';

export const metadata: Metadata = {
  title: 'GTA 6: guías, lanzamiento y datos confirmados',
  description: 'Encuentra respuestas claras sobre GTA 6: lanzamiento en Colombia, PC, tamaño de descarga, ediciones, precio, mapa de Leonida y modo Online. Fuentes oficiales enlazadas.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const articles = getArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const remaining = articles.filter((article) => article.slug !== featured?.slug);
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'es-CO',
    description: SITE_DESCRIPTION,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/buscar?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: 'Sitio editorial independiente en español sobre videojuegos. No afiliado a Rockstar Games ni Take-Two Interactive.',
    logo: canonical('/icon.svg'),
  };

  return (
    <>
      <JsonLd data={[websiteSchema, organizationSchema]} />
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow hero-kicker"><span className="status-dot" /> EDICIÓN LANZAMIENTO · 19.11.26</p>
          <h1>Todo sobre <span>GTA 6.</span><br />Sin humo.</h1>
          <p className="hero-lede">Guías claras, datos útiles y fuentes oficiales para llegar a Leonida sabiendo qué es real y qué todavía no está confirmado.</p>
          <SearchForm />
          <div className="hero-trust"><span>Fuentes enlazadas</span><i /> <span>Actualizado por fecha</span><i /> <span>En español</span></div>
        </div>
        <div className="hero-visual">
          <Cityscape />
          <div className="hero-visual-caption"><span>VICE CITY, USA.</span><span>LATITUD · LEONIDA</span></div>
          <div className="visual-stamp" aria-hidden="true"><span>RADAR</span><strong>VI</strong></div>
        </div>
        <div className="hero-bottom-note"><span className="hero-line" /> <span>Tu atajo a lo que más se busca el día uno.</span></div>
      </section>

      <section className="fact-ribbon wrap" aria-label="Datos rápidos de GTA 6">
        <div className="fact-item"><span className="fact-label">LANZAMIENTO</span><strong>19 nov 2026</strong><span>PS5 · Xbox Series X|S</span></div>
        <div className="fact-item"><span className="fact-label">HORA EN COLOMBIA</span><strong>00:00 COT</strong><span>Medianoche local</span></div>
        <div className="fact-item"><span className="fact-label">PRECARGA ANUNCIADA</span><strong>Hasta 212 GB</strong><span>Según el dispositivo</span></div>
        <div className="fact-item fact-warning"><span className="fact-label">VERSIÓN DE PC</span><strong>No anunciada</strong><span>Ver estado oficial</span></div>
      </section>

      {featured && (
        <section className="featured-section wrap">
          <div className="section-heading">
            <div><span className="eyebrow">PARA EMPEZAR</span><h2>La respuesta que viniste a buscar</h2></div>
            <Link className="text-link" href="/guias">Ver todas las guías <span aria-hidden="true">↗</span></Link>
          </div>
          <Link className="featured-card" href={`/guia/${featured.slug}`}>
            <div className="featured-card-text">
              <span className="pill pill-accent">{featured.category} · DESTACADA</span>
              <h3>{featured.title}</h3>
              <p>{featured.answer}</p>
              <span className="button button-light">Leer la guía <span aria-hidden="true">↗</span></span>
            </div>
            <div className="featured-card-art" aria-hidden="true"><div className="sun-disc" /><div className="art-grid" /><span>19<br /><small>NOV</small></span></div>
          </Link>
        </section>
      )}

      <section className="guide-section wrap">
        <div className="section-heading">
          <div><span className="eyebrow">GUÍAS DE LANZAMIENTO</span><h2>Lo que la gente está buscando</h2></div>
          <p>Respuestas directas, datos marcados por su fuente y ninguna fecha inventada.</p>
        </div>
        <div className="article-grid">
          {remaining.map((article, index) => <ArticleCard key={article.slug} article={article} index={index} />)}
        </div>
      </section>

      <section className="source-banner wrap">
        <div className="source-icon" aria-hidden="true">↗</div>
        <div><span className="eyebrow">NUESTRO FILTRO</span><h2>Confirmado no significa “lo vi en redes”.</h2><p>Priorizamos Rockstar, Take-Two y el soporte de plataforma. Si algo no está anunciado, lo decimos así y fechamos la revisión.</p></div>
        <Link className="button button-outline" href="/sobre-nosotros">Ver metodología <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="home-bottom wrap">
        <p className="eyebrow">SIGUE EXPLORANDO</p>
        <h2>Busca una respuesta.<br /><span>Entra con contexto.</span></h2>
        <Link href="/buscar" className="button button-primary">Buscar en Radar Leonida <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
