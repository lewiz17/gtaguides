import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="not-found wrap">
      <span className="eyebrow">404 · RUTA NO ENCONTRADA</span>
      <h1>Esta página se<br /><span>perdió en Leonida.</span></h1>
      <p>Puede que la dirección haya cambiado. Vuelve a las guías o busca una respuesta desde el inicio.</p>
      <div className="not-found-actions"><Link className="button button-primary" href="/guias">Ver las guías <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/">Ir al inicio</Link></div>
    </div>
  );
}
