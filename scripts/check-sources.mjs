import fs from 'node:fs';
import path from 'node:path';

const configPath = path.join(process.cwd(), 'config', 'source-feeds.json');
const feeds = JSON.parse(fs.readFileSync(configPath, 'utf8'));

function decodeXml(value) {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function tagValue(block, tag) {
  const match = block.match(new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  if (match) return decodeXml(match[1]);
  if (tag === 'link') {
    const attr = block.match(/<link\b[^>]*href=["']([^"']+)["'][^>]*\/?\s*>/i);
    if (attr) return decodeXml(attr[1]);
  }
  return '';
}

function parseEntries(xml) {
  const blocks = [...xml.matchAll(/<(item|entry)\b[^>]*>([\s\S]*?)<\/\1>/gi)].map((match) => match[2]);
  return blocks.slice(0, 6).map((block) => ({
    title: tagValue(block, 'title') || '(sin título)',
    link: tagValue(block, 'link') || tagValue(block, 'guid'),
    date: tagValue(block, 'pubDate') || tagValue(block, 'published') || tagValue(block, 'updated'),
    summary: tagValue(block, 'description') || tagValue(block, 'summary'),
  }));
}

let failures = 0;
for (const feed of feeds) {
  console.log(`\n${'='.repeat(78)}\n${feed.name}\n${feed.tier}\n${feed.note}`);
  try {
    const response = await fetch(feed.url, {
      signal: AbortSignal.timeout(18000),
      headers: { 'User-Agent': 'RadarLeonidaSourceChecker/1.0', Accept: 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9,*/*;q=0.5' },
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const xml = await response.text();
    const entries = parseEntries(xml);
    if (!entries.length) {
      console.log('El feed respondió, pero no se encontraron elementos. Abre la fuente en el navegador.');
      continue;
    }
    for (const [index, entry] of entries.entries()) {
      console.log(`\n${index + 1}. ${entry.title}`);
      if (entry.date) console.log(`   Fecha: ${entry.date}`);
      if (entry.link) console.log(`   Enlace: ${entry.link}`);
      if (entry.summary) console.log(`   Resumen: ${entry.summary.slice(0, 260)}${entry.summary.length > 260 ? '…' : ''}`);
    }
  } catch (error) {
    failures += 1;
    console.log(`No se pudo consultar este feed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
console.log('\nListo. Los feeds sólo generan alertas: verifica los hechos en la fuente original antes de publicar.');
if (failures === feeds.length) process.exit(1);
