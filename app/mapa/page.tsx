import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mapa Interactivo de GTA 6: ubicación de ciudades, misiones y secretos',
  description: 'Explora el mapa interactivo de Grand Theft Auto VI con ubicaciones de ciudades, misiones, secretos y puntos de interés. Descubre todo lo que necesitas saber sobre el mundo abierto de GTA 6.',
  alternates: { canonical: '/mapa' },
};

export default function MapPage() {
  return (<iframe src="https://gta6.city/embed/map" width="100%" height="520" loading="lazy" style={{ border: '0', borderRadius: '12px' }} title="Interactive Grand Theft Auto VI map"></iframe>)
}