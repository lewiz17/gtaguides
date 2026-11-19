# Radar Leonida

Web editorial de guías en español sobre GTA 6, construido con Next.js App Router y preparado para Vercel. El diseño usa una paleta original de atardecer neón (coral, naranja y turquesa); no reutiliza el logotipo ni arte promocional de Rockstar.

## Qué incluye

- Seis guías iniciales orientadas a búsquedas de lanzamiento: hora en Colombia, versión PC, tamaño/descarga, precio y ediciones, mapa/personajes y modo Online.
- Contenido Markdown editable, sin base de datos ni CMS obligatorio.
- Meta titles y descriptions por página, URL canónica, Open Graph, Twitter Cards y etiquetas semánticas en español de Colombia.
- JSON-LD de `Article`, `BreadcrumbList`, `FAQPage`, `WebSite` y `Organization`.
- Sitemap, robots.txt, RSS y `/llms.txt` con rutas y resúmenes directos para facilitar el descubrimiento y la lectura automatizada.
- Enlaces Amazon de búsqueda con el tag `gamergadget08-20`, atributos `sponsored`/`nofollow` y divulgación visible en cada artículo y en el pie de página.
- Validador editorial para detectar artículos sin fuentes, respuesta directa o enlaces afiliados.
- Sin imágenes remotas, fuentes externas, base de datos o claves de API: la vista previa y el sitio funcionan con assets locales.

## Ejecutar localmente

Requiere Node.js 20.9 o superior (requisito de Next.js 16).

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

Antes de compilar, revisa que el contenido tenga los campos mínimos:

```bash
npm run check:content
npm run build
npm run start
```

## Publicar en Vercel

1. Sube la carpeta a un repositorio Git.
2. En Vercel, crea un proyecto desde ese repositorio; Framework Preset: **Next.js**. Los comandos estándar `npm install` y `npm run build` ya están listos.
3. En **Settings → Environment Variables**, configura:
   - `NEXT_PUBLIC_SITE_URL`: tu dominio de producción con `https://` (muy recomendado; evita que los canónicos usen el dominio de ejemplo).
   - `NEXT_PUBLIC_AMAZON_TAG`: `gamergadget08-20` (el código ya lo usa como valor por defecto).
   - `NEXT_PUBLIC_AMAZON_BASE_URL`: `https://www.amazon.com`, o el marketplace correspondiente a tu cuenta de afiliado.
4. Despliega. Al hacer push de nuevas guías a la rama conectada, Vercel vuelve a publicar el sitio automáticamente.

No hace falta configurar rutas API, variables secretas, servidor propio ni almacenamiento persistente.

## Alimentar el sitio con poco esfuerzo

### Editar una guía existente

Abre el archivo correspondiente en `content/articles/` y cambia el título, la descripción, la respuesta breve, las fuentes y el cuerpo Markdown. Actualiza siempre `dateModified` al editar una afirmación sensible al tiempo.

### Crear una guía nueva

```bash
npm run new:post -- --title="Cómo cambiar los controles de GTA 6"
```

Opcionalmente, fija un slug:

```bash
npm run new:post -- --title="Mi nueva guía" --slug=mi-nueva-guia
```

El script crea `content/articles/mi-nueva-guia.md` con un frontmatter completo. Rellena la respuesta directa, preguntas frecuentes, fuentes primarias, una recomendación afiliada pertinente y el cuerpo. El slug del frontmatter debe coincidir con el nombre del archivo. `npm run check:content` valida esos mínimos; después, haz commit y push.

Las guías se descubren automáticamente y entran en el índice, el sitemap, RSS y `/llms.txt`. No hay que tocar el código de la página para publicar un post.

## Estructura

```text
app/                  Rutas, metadata, sitemap, robots, RSS y llms.txt
components/           Cabecera, tarjetas, arte SVG, afiliados y JSON-LD
content/articles/     Una guía Markdown por archivo
lib/posts.ts          Lectura y ordenación de artículos
lib/site.ts           Dominio canónico y configuración de afiliados
scripts/new-post.mjs  Generador de plantilla
scripts/check-content.mjs
```

## Enlaces afiliados y cumplimiento

Las tarjetas de producto son búsquedas de Amazon con el tag `gamergadget08-20`, no enlaces a un producto/precio/stock verificado. Antes de producción, confirma que tu cuenta de Associates permite el marketplace configurado, que los enlaces y el texto de divulgación cumplen sus políticas vigentes y que has completado los datos legales aplicables a tu país. El pie y cada bloque de enlaces incluyen disclosure en español y la frase en inglés para asociados de Amazon.

## Fuentes editoriales de la primera edición

La información de lanzamiento se recopiló el 19 de noviembre de 2026. Las guías enlazan directamente a fuentes primarias, entre ellas:

- [Rockstar Newswire — fecha de lanzamiento](https://www.rockstargames.com/newswire/article/ak3ak31a49a221/grand-theft-auto-vi-is-now-set-to-launch-november-19-2026)
- [Rockstar Support — horarios regionales](https://support.rockstargames.com/articles/29jV3Cv2cCgvwM1XgtMO5o/grand-theft-auto-vi-regional-pre-load-and-release-times-on-playstation-5-and-xbox-series-x-or-s)
- [Rockstar Newswire — precarga, tamaño y mapa imprimible](https://www.rockstargames.com/newswire/article/k4ak9okk485712/grand-theft-auto-vi-pre-load-begins-on-november-10)
- [Rockstar Support — plataformas, versiones y contenido](https://support.rockstargames.com/articles/4QfG4FmZCf5W1gS8jy4UVT/grand-theft-auto-vi-platform-editions-and-versions)
- [Take-Two — precios anunciados para Estados Unidos](https://www.take2games.com/ir/news/rockstar-games-announces-pre-orders-grand-theft-auto-vi)
- [Rockstar — historia, personajes y tráiler de lanzamiento](https://www.rockstargames.com/newswire/article/517572321a549a/watch-the-grand-theft-auto-vi-launch-trailer)

## Nota

Radar Leonida es un sitio editorial independiente, no afiliado, patrocinado ni aprobado por Rockstar Games o Take-Two Interactive. Las marcas y propiedades intelectuales pertenecen a sus titulares. La presencia en buscadores, respuestas de IA o funciones enriquecidas no se puede garantizar por la implementación técnica.
