import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export type FAQ = { question: string; answer: string };
export type Source = { label: string; url: string };
export type AffiliateItem = { title: string; description: string; searchTerm: string };
export type ArticleStatus = 'draft' | 'published';

export type Article = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  category: string;
  readTime: number;
  datePublished: string;
  dateModified: string;
  featured: boolean;
  status: ArticleStatus;
  keywords: string[];
  answer: string;
  faq: FAQ[];
  sources: Source[];
  affiliate: AffiliateItem[];
  content: string;
};

const ARTICLES_DIR = path.join(process.cwd(), 'content', 'articles');

function dateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10);
  return String(value ?? '').slice(0, 10);
}

function readArticle(filename: string): Article {
  const filePath = path.join(ARTICLES_DIR, filename);
  const parsed = matter(fs.readFileSync(filePath, 'utf8'));
  const data = parsed.data as Record<string, unknown>;
  return {
    slug: String(data.slug ?? filename.replace(/\.md$/, '')),
    title: String(data.title ?? ''),
    seoTitle: String(data.seoTitle ?? data.title ?? ''),
    description: String(data.description ?? ''),
    category: String(data.category ?? 'Guía'),
    readTime: Number(data.readTime ?? 4),
    datePublished: dateString(data.datePublished),
    dateModified: dateString(data.dateModified ?? data.datePublished),
    featured: Boolean(data.featured),
    status: data.status === 'draft' ? 'draft' : 'published',
    keywords: Array.isArray(data.keywords) ? data.keywords.map(String) : [],
    answer: String(data.answer ?? ''),
    faq: Array.isArray(data.faq) ? (data.faq as FAQ[]) : [],
    sources: Array.isArray(data.sources) ? (data.sources as Source[]) : [],
    affiliate: Array.isArray(data.affiliate) ? (data.affiliate as AffiliateItem[]) : [],
    content: parsed.content.trim(),
  };
}

export function getArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  return fs.readdirSync(ARTICLES_DIR)
    .filter((filename) => filename.endsWith('.md'))
    .map(readArticle)
    .filter((article) => article.status === 'published')
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished) || Number(b.featured) - Number(a.featured) || a.title.localeCompare(b.title, 'es'));
}

export function getArticle(slug: string): Article | undefined {
  return getArticles().find((article) => article.slug === slug);
}

export function getArticleSlugs() {
  return getArticles().map((article) => ({ slug: article.slug }));
}

function normalizeSearch(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

export function searchArticles(query: string) {
  const needle = normalizeSearch(query);
  if (!needle) return [];
  return getArticles().filter((article) => normalizeSearch([
    article.title,
    article.description,
    article.answer,
    article.category,
    article.keywords.join(' '),
    article.content,
  ].join(' ')).includes(needle));
}
