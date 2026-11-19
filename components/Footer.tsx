import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span className="brand-copy"><strong>RADAR</strong><small>LEONIDA</small></span>
          </Link>
          <p className="footer-tagline">Una guía editorial independiente para explorar la conversación alrededor de GTA 6.</p>
        </div>
        <div className="footer-links">
          <Link href="/guias">Todas las guías</Link>
          <Link href="/sobre-nosotros">Fuentes y metodología</Link>
          <Link href="/privacidad">Privacidad</Link>
          <a href="/feed.xml">RSS</a>
          <a href="/llms.txt">llms.txt</a>
        </div>
      </div>
      <div className="footer-disclosure">
        <p><strong>Transparencia:</strong> algunos enlaces de esta web son de afiliado. Si compras desde ellos, podemos recibir una comisión sin costo adicional para ti. Como asociado de Amazon, obtengo ingresos por compras que cumplan los requisitos. <em>As an Amazon Associate I earn from qualifying purchases.</em></p>
        <p>Radar Leonida es un proyecto editorial independiente, no afiliado, patrocinado ni aprobado por Rockstar Games o Take-Two Interactive. Grand Theft Auto, GTA y sus marcas pertenecen a sus respectivos propietarios. Las recomendaciones de Amazon son búsquedas; precios, disponibilidad y compatibilidad pueden cambiar.</p>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} Radar Leonida</span><span>Hecho para leer rápido. Verificado con fuentes enlazadas.</span></div>
    </footer>
  );
}
