import Link from 'next/link';
import type { Article } from '@/lib/posts';
import { formatSpanishDate } from '@/lib/site';

const themes = ['card-art-coral', 'card-art-aqua', 'card-art-violet', 'card-art-orange'];

export function ArticleCard({ article, index = 0 }: { article: Article; index?: number }) {
  const theme = themes[index % themes.length];
  return (
    <article className="article-card">
      <Link className={`card-art ${theme}`} href={`/guia/${article.slug}`} aria-label={`Leer: ${article.title}`}>
        <span className="card-art-orbit" aria-hidden="true" />
        <span className="card-art-label">{article.category}</span>
        <span className="card-art-type" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      </Link>
      <div className="article-card-body">
        <div className="card-meta"><span>{article.category}</span><span>·</span><time dateTime={article.dateModified}>{formatSpanishDate(article.dateModified)}</time></div>
        <h3><Link href={`/guia/${article.slug}`}>{article.title}</Link></h3>
        <p>{article.description}</p>
        <Link className="text-link" href={`/guia/${article.slug}`}>Leer la guía <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
  );
}
