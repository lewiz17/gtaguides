import Link from 'next/link';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Radar Leonida, página de inicio">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <span className="brand-copy"><strong>RADAR</strong><small>LEONIDA</small></span>
        </Link>
        <nav className="main-nav" aria-label="Navegación principal">
          <Link href="/guias">Guías</Link>
          <Link href="/buscar">Buscar</Link>
          <Link href="/sobre-nosotros">Cómo verificamos</Link>
          <Link href="/mapa">Explora el Mapa</Link>
        </nav>
        <a className="header-status" href="/guia/gta-6-hora-lanzamiento-colombia">
          <span className="status-dot" /> EDICIÓN LANZAMIENTO
        </a>
      </div>
    </header>
  );
}
