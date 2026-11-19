import { amazonSearchUrl } from '@/lib/site';
import type { AffiliateItem } from '@/lib/posts';

export function AffiliateBlock({ items }: { items: AffiliateItem[] }) {
  if (!items.length) return null;
  return (
    <section className="affiliate-section" aria-labelledby="affiliate-heading">
      <div className="affiliate-heading-row">
        <div><span className="eyebrow">EQUIPO PARA TU SETUP</span><h2 id="affiliate-heading">Accesorios para comparar</h2></div>
        <span className="affiliate-label">Enlaces de afiliado</span>
      </div>
      <div className="affiliate-grid">
        {items.map((item) => (
          <article className="affiliate-card" key={`${item.title}-${item.searchTerm}`}>
            <span className="affiliate-icon" aria-hidden="true">↗</span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <a href={amazonSearchUrl(item.searchTerm)} target="_blank" rel="sponsored nofollow noopener noreferrer">
              Ver resultados en Amazon <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>
      <p className="affiliate-note">Aviso: podemos recibir una comisión si compras desde estos enlaces. Como asociado de Amazon, obtengo ingresos por compras que cumplan los requisitos. No cambia el precio para ti; verifica vendedor, precio, stock y compatibilidad.</p>
    </section>
  );
}
