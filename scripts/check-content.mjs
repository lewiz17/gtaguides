import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

const directory = path.join(process.cwd(), 'content', 'articles');
const files = fs.existsSync(directory) ? fs.readdirSync(directory).filter((name) => name.endsWith('.md')) : [];
if (!files.length) {
  console.error('No se encontraron artículos Markdown en content/articles/.');
  process.exit(1);
}
const required = ['slug', 'title', 'description', 'category', 'datePublished', 'dateModified', 'answer', 'keywords', 'sources', 'affiliate'];
const errors = [];
let publishedCount = 0;
let draftCount = 0;
for (const file of files) {
  const fullPath = path.join(directory, file);
  const { data, content } = matter(fs.readFileSync(fullPath, 'utf8'));
  const status = data.status ?? 'published';
  if (!['draft', 'published'].includes(status)) errors.push(`${file}: status debe ser "draft" o "published".`);
  if (!data.slug || !data.title) errors.push(`${file}: incluso un borrador necesita slug y title.`);
  if (data.slug && data.slug !== file.replace(/\.md$/, '')) errors.push(`${file}: el slug del frontmatter debe coincidir con el nombre del archivo.`);
  if (status === 'draft') {
    draftCount += 1;
    continue;
  }
  publishedCount += 1;
  for (const field of required) {
    if (data[field] === undefined || data[field] === null || data[field] === '') errors.push(`${file}: falta el campo "${field}".`);
  }
  if (data.description && String(data.description).length > 180) errors.push(`${file}: la descripción SEO supera 180 caracteres.`);
  if (!Array.isArray(data.sources) || data.sources.length < 1) errors.push(`${file}: agrega al menos una fuente.`);
  if (!Array.isArray(data.affiliate) || data.affiliate.length < 1) errors.push(`${file}: agrega al menos una recomendación afiliada.`);
  if (!Array.isArray(data.keywords) || data.keywords.length < 1) errors.push(`${file}: agrega al menos una keyword útil.`);
  if (!Array.isArray(data.faq)) errors.push(`${file}: faq debe ser una lista (puede estar vacía).`);
  if (Array.isArray(data.sources)) {
    data.sources.forEach((source, index) => {
      if (!source.label || !/^https:\/\//.test(source.url || '')) errors.push(`${file}: la fuente #${index + 1} necesita etiqueta y URL https.`);
    });
  }
  if (Array.isArray(data.affiliate)) {
    data.affiliate.forEach((item, index) => {
      if (!item.title || !item.searchTerm) errors.push(`${file}: la recomendación afiliada #${index + 1} necesita title y searchTerm.`);
    });
  }
  if (content.trim().length < 120) errors.push(`${file}: el cuerpo publicado es demasiado corto; añade contexto útil y original.`);
  const answer = String(data.answer ?? '').toLowerCase();
  if (/(borrador|pendiente de redacción|completa aquí|escribe aquí)/.test(answer)) errors.push(`${file}: la respuesta breve todavía contiene texto de plantilla.`);
}
if (errors.length) {
  console.error('Validación de contenido:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}
console.log(`Contenido OK: ${publishedCount} guías publicadas y ${draftCount} borradores ocultos validados.`);
