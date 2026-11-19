import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Radar Leonida',
    short_name: 'Radar Leonida',
    description: 'Guías claras y datos verificados sobre GTA 6.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0810',
    theme_color: '#0b0810',
    lang: 'es-CO',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
  };
}
