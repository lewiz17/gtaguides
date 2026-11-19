# Radar Leonida

Web editorial de guías en español sobre GTA 6, construido con Next.js App Router y preparado para Vercel. El diseño usa una paleta original de atardecer neón (coral, naranja y turquesa); no reutiliza el logotipo ni arte promocional de Rockstar.

## Qué incluye

- Seis guías iniciales orientadas a búsquedas de lanzamiento: hora en Colombia, versión PC, tamaño/descarga, precio y ediciones, mapa/personajes y modo Online.
- Contenido Markdown editable, sin base de datos ni CMS obligatorio.
- Meta titles y descriptions por página, URL canónica, Open Graph, Twitter Cards y etiquetas semánticas en español de Colombia.
- JSON-LD de `Article`, `BreadcrumbList`, `FAQPage`, `WebSite` y `Organization`.
- Sitemap, robots.txt, RSS y `/llms.txt` con rutas y resúmenes directos para facilitar el descubrimiento y la lectura automatizada.
- Enlaces Amazon de búsqueda con el tag `gamergadget08-20`, atributos `sponsored`/`nofollow` y divulgación visible en cada artículo y en el pie de página.
- Vercel Web Analytics integrado en el layout para medir visitas y páginas vistas; requiere activarse desde el panel del proyecto.
- Página de privacidad con información sobre las métricas y los enlaces de afiliado.
- Validador editorial para detectar artículos sin fuentes, respuesta directa o enlaces afiliados; los borradores quedan excluidos del sitio.
- El HTML generado desde Markdown se filtra antes de renderizarse para reducir riesgos de XSS.
- Sin imágenes remotas ni base de datos. La web desplegada no requiere claves de API; sólo el importador opcional usa una clave privada de IA en tu computador.

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

Para el sitio en Vercel no hacen falta rutas API, claves secretas, servidor propio ni almacenamiento persistente. La clave de IA es opcional y sólo se usa localmente al importar enlaces; la configuración aparece abajo.

### Activar el contador de visitas

El componente `@vercel/analytics` ya está instalado en `app/layout.tsx`. Para que empiece a registrar métricas:

1. Despliega el sitio en Vercel.
2. Abre el proyecto en el dashboard de Vercel y entra a **Analytics**.
3. Pulsa **Enable** para activar Web Analytics y realiza un nuevo despliegue si Vercel lo solicita.
4. Después de que haya visitas, revisa **Visitors** y **Page Views** para ver visitantes únicos aproximados, páginas vistas, páginas más consultadas y referentes.

No identifica a una persona por nombre. Vercel documenta que sus métricas son agregadas, no usan cookies de terceros y usan un hash temporal que se reinicia cada 24 horas. Revisa la página `/privacidad` y la [documentación de privacidad de Vercel](https://vercel.com/docs/analytics/privacy-policy); las prácticas y condiciones pueden cambiar.

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

El script crea `content/articles/mi-nueva-guia.md` como `status: draft`. Rellena la respuesta directa, preguntas frecuentes, fuentes primarias, una recomendación afiliada pertinente y el cuerpo. Cuando esté revisado, cambia a `status: published`; los borradores no aparecen en la web, el sitemap ni el RSS.

### Crear un borrador desde un enlace

El importador extrae metadatos y texto principal de una página web, y puede redactar un borrador original en español con una API OpenAI-compatible. Para usar la generación, crea `.env.local` (nunca lo subas a Git) con:

```env
OPENAI_API_KEY=tu_clave_privada
OPENAI_MODEL=gpt-4.1-mini
OPENAI_BASE_URL=https://api.openai.com/v1
```

Después:

```bash
npm run import:source -- --url "https://www.rockstargames.com/newswire/article/..." --category "Actualidad"
```

Opciones: `--title "Ángulo editorial"`, `--slug mi-slug`, `--affiliate-term "audífonos gaming PS5"` o `--no-ai` para crear sólo un esqueleto sin llamar a la API. Con `--no-ai` (o sin clave), no se genera el artículo completo: queda un borrador con la fuente y los metadatos detectados. Si no se proporciona una búsqueda afiliada pertinente, el borrador deja ese campo pendiente y el validador no permitirá publicarlo hasta completarlo. La API del proveedor de IA puede tener costo por uso. El importador permite sólo HTTP/HTTPS en puertos estándar, comprueba DNS/IP públicos antes de conectar y repite la comprobación en cada redirección; algunos sitios pueden bloquearlo o no ser compatibles.

El archivo queda en `content/articles/` con `status: draft`, así que **no se publica automáticamente**. Abre el Markdown, confirma cada hecho y fecha en la fuente original, corrige el copy, completa fuentes/FAQ/afiliado y cambia el estado a `published` sólo al aprobarlo. El prompt pide redacción original y prohíbe inventar o copiar códigos de entregas anteriores, pero la IA puede equivocarse; el borrador siempre necesita revisión humana. Si una web bloquea el acceso automatizado, usa otra página accesible o crea la guía manualmente.

### Vigilar nuevas fuentes

```bash
npm run sources:check
```

Consulta la lista editable de `config/source-feeds.json`: el feed de YouTube oficial de Rockstar y alertas RSS de Google News para Newswire, soporte y códigos. Las alertas de Google News sirven para descubrir enlaces, **no como prueba**. Para hechos del juego, vuelve a Rockstar Newswire/Support; usa Take-Two para datos corporativos y precios anunciados; usa medios reconocidos sólo como fuentes secundarias y atribuye sus reportes.

El Newswire y el soporte directo siguen siendo las referencias principales. En la investigación no se observó un RSS/API oficial del Newswire ni se configuró publicación automática; ejecuta el chequeo cuando quieras o prográmalo en tu computador. Para trucos/códigos, registra plataforma, versión y fecha de prueba; no copies listas de GTA V como si fueran de GTA VI y no presentes un código como verificado sin probarlo en el juego.

Las guías publicadas se descubren automáticamente y entran en el índice, el sitemap, RSS y `/llms.txt`. No hay que tocar el código de la página para publicar un post.

## Estructura

```text
app/                  Rutas, metadata, sitemap, robots, RSS y llms.txt
components/           Cabecera, tarjetas, arte SVG, afiliados y JSON-LD
content/articles/     Una guía Markdown por archivo
lib/posts.ts          Lectura y ordenación de artículos
lib/site.ts           Dominio canónico y configuración de afiliados
scripts/new-post.mjs  Generador manual de borradores
scripts/import-source.mjs  Importador URL → borrador Markdown
scripts/check-sources.mjs  Consulta feeds RSS configurados
scripts/check-content.mjs
config/source-feeds.json
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
