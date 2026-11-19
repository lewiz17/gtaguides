import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (key) => {
  const equalArg = args.find((arg) => arg.startsWith(`--${key}=`));
  if (equalArg) return equalArg.slice(key.length + 3).replace(/^['"]|['"]$/g, '');
  const index = args.indexOf(`--${key}`);
  return index >= 0 && args[index + 1] && !args[index + 1].startsWith('--') ? args[index + 1] : '';
};
const title = getArg('title') || args.find((arg) => !arg.startsWith('--')) || '';
if (!title) {
  console.error('Uso: npm run new:post -- --title="Título de la guía" [--slug mi-slug]');
  process.exit(1);
}
const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slug = getArg('slug') || slugify(title);
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 76) {
  console.error('El slug debe usar sólo letras minúsculas, números y guiones (máximo 76 caracteres).');
  process.exit(1);
}
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const safe = (text) => JSON.stringify(text);
const destination = path.join(process.cwd(), 'content', 'articles', `${slug}.md`);
if (fs.existsSync(destination)) {
  console.error(`Ya existe: ${destination}`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(destination), { recursive: true });
const template = `---
status: draft
slug: ${slug}
title: ${safe(title)}
seoTitle: ${safe(`${title} | Radar Leonida`)}
description: ${safe('Completa una descripción específica y útil de hasta 160 caracteres.')}
category: "Guía"
readTime: 4
datePublished: ${date}
dateModified: ${date}
featured: false
keywords: []
answer: ${safe('PENDIENTE: responde la consulta principal en una o dos frases con fuentes verificadas.')}
faq: []
sources: []
affiliate: []
---

<!-- Borrador oculto hasta cambiar status a published después de revisión. -->

## Lo confirmado

Añade información original, contexto práctico y fuentes primarias. Separa hechos de rumores y datos todavía no anunciados.
`;
fs.writeFileSync(destination, template, 'utf8');
console.log(`Borrador creado: content/articles/${slug}.md`);
console.log('El borrador no se muestra en la web. Completa fuentes, respuesta, FAQ y afiliados; luego cambia status: draft por status: published.');
