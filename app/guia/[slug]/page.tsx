import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { marked } from 'marked';
import xss from 'xss';
import { AffiliateBlock } from '@/components/AffiliateBlock';
import { JsonLd } from '@/components/JsonLd';
import { getArticle, getArticleSlugs, getArticles } from '@/lib/posts';
import { canonical, formatSpanishDate, SITE_NAME } from '@/lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticleSlugs();
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: 'Guía no encontrada' };
  const url = `/guia/${article.slug}`;
  return {
    title: { absolute: article.seoTitle },
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      locale: 'es_CO',
      title: article.seoTitle,
      description: article.description,
      url: canonical(url),
      siteName: SITE_NAME,
      publishedTime: `${article.datePublished}T09:00:00-05:00`,
      modifiedTime: `${article.dateModified}T09:00:00-05:00`,
      authors: [SITE_NAME],
      tags: article.keywords,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: `Radar Leonida: ${article.title}` }],
    },
    twitter: { card: 'summary_large_image', title: article.seoTitle, description: article.description, images: ['/opengraph-image'] },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const html = xss(marked.parse(article.content, { async: false }) as string, {
    whiteList: {
      a: ['href', 'title'], blockquote: [], br: [], code: [], del: [], div: [], em: [],
      h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], hr: [], li: [], ol: [], p: [],
      pre: [], span: [], strong: [], table: [], tbody: [], td: ['align'], th: ['align'],
      thead: [], tr: [], ul: [],
    },
    stripIgnoreTag: true,
    stripIgnoreTagBody: ['script', 'style', 'textarea', 'noscript', 'noembed', 'noframes', 'template'],
  });
  const url = `/guia/${article.slug}`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    datePublished: `${article.datePublished}T09:00:00-05:00`,
    dateModified: `${article.dateModified}T09:00:00-05:00`,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical(url) },
    author: { '@type': 'Organization', name: SITE_NAME, url: canonical('/sobre-nosotros') },
    publisher: { '@type': 'Organization', name: SITE_NAME, logo: { '@type': 'ImageObject', url: canonical('/icon.svg') } },
    image: [canonical('/opengraph-image')],
    keywords: article.keywords.join(', '),
    articleSection: article.category,
    inLanguage: 'es-CO',
    citation: article.sources.map((source) => source.url),
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Inicio', item: canonical('/') },
      { '@type': 'ListItem', position: 2, name: 'Guías', item: canonical('/guias') },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonical(url) },
    ],
  };
  const faqSchema = article.faq.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  } : null;
  const related = getArticles().filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={faqSchema ? [articleSchema, breadcrumbSchema, faqSchema] : [articleSchema, breadcrumbSchema]} />
      <div className="article-page wrap">
        <nav className="breadcrumbs" aria-label="Ruta de navegación">
          <Link href="/">Inicio</Link><span aria-hidden="true">/</span><Link href="/guias">Guías</Link><span aria-hidden="true">/</span><span aria-current="page">{article.category}</span>
        </nav>
        <div className="article-layout">
          <article className="article-main">
            <header className="article-header">
              <span className="pill pill-accent">{article.category}</span>
              <h1>{article.title}</h1>
              <p className="article-deck">{article.description}</p>
              <div className="article-byline">
                <span className="byline-avatar" aria-hidden="true">R</span>
                <span><strong>{SITE_NAME}</strong><small>Actualizado el <time dateTime={article.dateModified}>{formatSpanishDate(article.dateModified)}</time></small></span>
                <span className="read-time">{article.readTime} min de lectura</span>
              </div>
            </header>
            <section className="answer-card" aria-labelledby="quick-answer-title">
              <span className="answer-icon" aria-hidden="true">✓</span>
              <div><span className="eyebrow" id="quick-answer-title">RESPUESTA RÁPIDA</span><p>{article.answer}</p></div>
            </section>
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />

            {article.faq.length > 0 && (
              <section className="faq-section" aria-labelledby="faq-title">
                <span className="eyebrow">RESPUESTAS DIRECTAS</span>
                <h2 id="faq-title">Preguntas frecuentes</h2>
                <div className="faq-list">
                  {article.faq.map((item) => (
                    <details key={item.question} className="faq-item">
                      <summary>{item.question}<span aria-hidden="true">+</span></summary>
                      <p>{item.answer}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            <section className="sources-section" aria-labelledby="sources-title">
              <span className="eyebrow">HECHOS CON RESPALDO</span>
              <h2 id="sources-title">Fuentes consultadas</h2>
              <ol>
                {article.sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} <span aria-hidden="true">↗</span></a></li>)}
              </ol>
              <p className="source-update">Revisión editorial: {formatSpanishDate(article.dateModified)}. Los datos sujetos a cambios deben confirmarse en la fuente original antes de comprar o descargar.</p>
            </section>
            <AffiliateBlock items={article.affiliate} />
          </article>

          <aside className="article-aside" aria-label="Resumen de la guía">
            <div className="aside-sticky">
              <div className="aside-card aside-answer">
                <span className="eyebrow">EN UNA FRASE</span>
                <p>{article.answer}</p>
                <span className="aside-divider" />
                <span className="aside-meta">Verificado con {article.sources.length} fuente{article.sources.length === 1 ? '' : 's'} enlazada{article.sources.length === 1 ? '' : 's'}</span>
              </div>
              <div className="aside-card aside-links">
                <span className="eyebrow">MÁS GUÍAS</span>
                {related.map((item) => <Link key={item.slug} href={`/guia/${item.slug}`}>{item.title}<span aria-hidden="true">↗</span></Link>)}
              </div>
              <div className="aside-note"><span>✦</span><p>¿Viste un dato desactualizado? Comprueba primero la fuente oficial; las guías se corrigen por fecha.</p></div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
