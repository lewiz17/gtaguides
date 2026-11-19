import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Sobre Radar Leonida: fuentes y metodología',
  description: 'Conoce cómo Radar Leonida verifica sus guías de GTA 6, corrige información y declara sus enlaces de afiliado.',
  alternates: { canonical: '/sobre-nosotros' },
};

export default function AboutPage() {
  return (
    <div className="about-page wrap">
      <header className="listing-header">
        <span className="eyebrow">QUIÉNES SOMOS</span>
        <h1>Información clara.<br /><span>Fuentes a la vista.</span></h1>
        <p>Radar Leonida es una publicación editorial independiente en español para lectores que buscan entender qué se sabe de GTA 6 y qué todavía no.</p>
      </header>
      <div className="about-grid">
        <section className="about-card about-card-lead"><span className="about-number">01</span><h2>Cómo verificamos</h2><p>Priorizamos comunicados de Rockstar Games, Rockstar Support, Take-Two y fichas oficiales de plataforma. Las afirmaciones de fecha, precio, tamaño y compatibilidad llevan enlaces a su fuente primaria siempre que esté disponible.</p><p>Separamos con lenguaje directo lo confirmado de lo no anunciado. No presentamos filtraciones, estimaciones de fans o páginas de tiendas sin verificar como hechos.</p></section>
        <section className="about-card"><span className="about-number">02</span><h2>Actualizaciones</h2><p>Cada guía muestra su fecha de revisión. Los datos sensibles al tiempo —fechas, precios, requisitos, disponibilidad y modos en línea— deben volver a comprobarse antes de tomar una decisión.</p><p>Si una fuente oficial cambia, actualizamos el artículo y su fecha. No prometemos cobertura instantánea ni una precisión que no podamos respaldar.</p></section>
        <section className="about-card"><span className="about-number">03</span><h2>Transparencia comercial</h2><p>Algunos enlaces son búsquedas de Amazon con el tag de afiliado proporcionado por el responsable del sitio. Si una compra cumple los requisitos del programa, podemos recibir una comisión sin costo adicional para el comprador.</p><p>Los enlaces son búsquedas generales, no una garantía de stock, compatibilidad, precio o recomendación individual. Comprueba siempre el vendedor y las condiciones.</p></section>
        <section className="about-card"><span className="about-number">04</span><h2>Independencia</h2><p>Radar Leonida no está afiliado, patrocinado ni aprobado por Rockstar Games o Take-Two Interactive. GTA y Grand Theft Auto son marcas de sus respectivos propietarios. El diseño de este sitio utiliza una paleta original inspirada en atardeceres neón; no reutiliza el logotipo oficial ni arte promocional.</p></section>
      </div>
      <div className="about-cta"><p>¿Buscas una respuesta concreta?</p><Link className="button button-primary" href="/guias">Explorar todas las guías <span aria-hidden="true">↗</span></Link></div>
    </div>
  );
}
