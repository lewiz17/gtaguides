import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const getArg = (key) => {
  const match = args.find((arg) => arg.startsWith(`--${key}=`));
  return match ? match.slice(key.length + 3).replace(/^['"]|['"]$/g, '') : '';
};
const title = getArg('title') || args.find((arg) => !arg.startsWith('--')) || '';
if (!title) {
  console.error('Uso: npm run new:post -- --title="Título de la guía" [--slug=mi-slug]');
  process.exit(1);
}
const slugify = (text) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const slug = getArg('slug') || slugify(title);
const date = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Bogota', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const safe = (text) => JSON.stringify(text);
const destination = path.join(process.cwd(), 'content', 'articles', `${slug}.md`);
if (fs.existsSync(destination)) {
  console.error(`Ya existe: ${destination}`);
  process.exit(1);
}
fs.mkdirSync(path.dirname(destination), { recursive: true });
const template = `---
slug: ${slug}
title: ${safe(title)}
seoTitle: ${safe(`${title} | Radar Leonida`)}
description: ${safe('Escribe aquí una descripción específica y útil de 140 a 160 caracteres.')}
category: "Guía"
readTime: 4
datePublished: ${date}
dateModified: ${date}
featured: false
keywords:
  - "GTA 6"
  - "Grand Theft Auto VI"
answer: ${safe('Responde la consulta principal en una o dos frases, con datos verificados y fecha de actualización.')}
faq:
  - question: ${safe('¿Cuál es la respuesta más importante?')}
    answer: ${safe('Añade una respuesta corta, directa y basada en una fuente enlazada.')}
sources:
  - label: ${safe('Fuente oficial consultada')}
    url: ${safe('https://www.rockstargames.com/VI')}
affiliate:
  - title: ${safe('Accesorio relacionado')}
    description: ${safe('Explica por qué puede ser útil; evita precios o disponibilidad no verificados.')}
    searchTerm: ${safe('accesorio gaming')}
---

Escribe una introducción original que responda primero a la intención de búsqueda. Añade la fecha de revisión y enlaza las fuentes oficiales dentro de la página.

## Lo confirmado

Desarrolla la información con contexto, pasos prácticos y una distinción clara entre hechos y datos aún no anunciados.

## Preguntas frecuentes

La sección de preguntas frecuentes se genera desde el campo faq del frontmatter; elimina este encabezado si no aporta contenido adicional.
`;
fs.writeFileSync(destination, template, 'utf8');
console.log(`Guía creada: content/articles/${slug}.md`);
console.log('Siguiente paso: completa el frontmatter, enlaza fuentes primarias y edita el cuerpo Markdown.');
