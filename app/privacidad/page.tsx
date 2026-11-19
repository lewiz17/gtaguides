import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacidad y métricas de visitas',
  description: 'Información sobre las métricas agregadas de visitas de Vercel Web Analytics y los enlaces afiliados de Radar Leonida.',
  alternates: { canonical: '/privacidad' },
};

export default function PrivacyPage() {
  return (
    <div className="about-page wrap">
      <header className="listing-header">
        <span className="eyebrow">TRANSPARENCIA</span>
        <h1>Privacidad y<br /><span>métricas del sitio.</span></h1>
        <p>Qué mediciones se pueden activar en Radar Leonida y qué ocurre al salir hacia una tienda externa.</p>
      </header>
      <div className="privacy-content">
        <section className="about-card">
          <span className="about-number">01 · ANALÍTICA</span>
          <h2>Métricas de visitas con Vercel</h2>
          <p>El proyecto incluye el componente de Vercel Web Analytics. Para que recopile métricas de producción, quien administra el proyecto debe habilitar Analytics desde el panel de Vercel y desplegar la aplicación.</p>
          <p>Al activarlo, el panel puede mostrar visitas, páginas vistas, páginas más consultadas, referentes y datos agregados como país, navegador o dispositivo. Según la documentación de Vercel, Web Analytics no usa cookies de terceros; calcula un identificador hash temporal para agrupar visitantes y lo reinicia después de 24 horas. No está diseñado para identificar a una persona por nombre ni para seguirla entre sitios.</p>
          <p>Consulta la <a href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">política y documentación de privacidad de Vercel Analytics</a> para conocer sus prácticas vigentes.</p>
        </section>
        <section className="about-card">
          <span className="about-number">02 · TIENDAS EXTERNAS</span>
          <h2>Enlaces de Amazon</h2>
          <p>Al abrir un enlace de afiliado, sales de Radar Leonida y la tienda de destino puede aplicar sus propias tecnologías, cookies y políticas. Las tarjetas de este sitio abren búsquedas de productos con un identificador de asociado; no procesamos pagos ni recibimos los datos de compra.</p>
          <p>Antes de comprar, revisa las políticas del marketplace, el vendedor, el precio, la región y la compatibilidad del producto.</p>
        </section>
        <section className="about-card">
          <span className="about-number">03 · ALCANCE</span>
          <h2>Sin cuentas ni formularios de registro</h2>
          <p>La versión actual del sitio no solicita nombre, correo o creación de cuenta. Si en el futuro añadimos un formulario, newsletter, comentarios u otra herramienta de medición, habrá que actualizar esta nota antes de activarla.</p>
          <p>Esta página es una descripción general del proyecto, no asesoría legal. El responsable del sitio debe adaptarla a las leyes aplicables y mantenerla actualizada.</p>
        </section>
      </div>
    </div>
  );
}
