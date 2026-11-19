import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Radar Leonida: guías claras y datos verificados de GTA 6';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '70px', background: 'linear-gradient(135deg, #100b19 0%, #251130 48%, #0a2028 100%)', color: '#fff8eb', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', width: '760px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '22px', letterSpacing: '6px', color: '#ffd194', fontWeight: 700 }}>
            <span style={{ width: '18px', height: '18px', borderRadius: '50%', background: '#ff7295' }} />
            <span>RADAR LEONIDA</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: '42px' }}>
            <div style={{ fontSize: '72px', lineHeight: 1.03, fontWeight: 900, letterSpacing: '-4px' }}>Todo sobre</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '17px', fontSize: '78px', lineHeight: 1.03, fontWeight: 900, letterSpacing: '-4px' }}>
              <span style={{ color: '#ff9b8b' }}>GTA 6.</span><span>Sin humo.</span>
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '28px', fontSize: '25px', color: '#e0d7e8' }}>Guías claras · Fuentes oficiales · Español</div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '47px' }}>
            <span style={{ border: '1px solid rgba(255,255,255,.22)', borderRadius: '999px', padding: '10px 18px', fontSize: '16px', color: '#fff8eb' }}>PS5</span>
            <span style={{ border: '1px solid rgba(255,255,255,.22)', borderRadius: '999px', padding: '10px 18px', fontSize: '16px', color: '#fff8eb' }}>XBOX SERIES X|S</span>
            <span style={{ border: '1px solid rgba(255,255,255,.22)', borderRadius: '999px', padding: '10px 18px', fontSize: '16px', color: '#fff8eb' }}>LEONIDA</span>
          </div>
        </div>
        <div style={{ width: '270px', height: '270px', borderRadius: '50%', border: '3px solid rgba(255,255,255,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '110px', fontWeight: 900, color: '#30132b', background: 'linear-gradient(145deg, #ffc987 0%, #ff7c8b 55%, #54e4d6 100%)' }}>VI</div>
      </div>
    ),
    { ...size },
  );
}
