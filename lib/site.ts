export const SITE_NAME = 'Radar Leonida';
export const SITE_DESCRIPTION = 'Guías claras y datos verificados sobre GTA 6: lanzamiento, plataformas, instalación, precio, mapa y más. Un sitio editorial independiente en español.';

const cleanUrl = (value: string) => value.replace(/\/+$/, '');
const productionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const configuredUrl = (process.env.NEXT_PUBLIC_SITE_URL || '').trim();
export const SITE_URL = cleanUrl(configuredUrl || (productionUrl ? `https://${productionUrl}` : 'https://radar-leonida.vercel.app'));
export const AMAZON_TAG = process.env.NEXT_PUBLIC_AMAZON_TAG || 'gamergadget08-20';
export const AMAZON_BASE_URL = (process.env.NEXT_PUBLIC_AMAZON_BASE_URL || 'https://www.amazon.com').replace(/\/+$/, '');

export function canonical(pathname = '/') {
  const cleanPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${SITE_URL}${cleanPath}`;
}

export function amazonSearchUrl(searchTerm: string) {
  const url = new URL('/s', `${AMAZON_BASE_URL}/`);
  url.searchParams.set('k', searchTerm);
  url.searchParams.set('tag', AMAZON_TAG);
  return url.toString();
}

export function formatSpanishDate(date: string) {
  const parsed = new Date(`${date}T12:00:00-05:00`);
  return new Intl.DateTimeFormat('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Bogota',
  }).format(parsed);
}
