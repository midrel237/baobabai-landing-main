import { BaobabMark } from './icons'

export default function Footer() {
  return (
    <footer
      style={{
        background: '#0F172A',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        color: 'rgba(255,255,255,0.6)',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          padding: '32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <BaobabMark size={28} color="#FFFFFF" accent="#D4A017" />
          <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Baobab<span style={{ color: '#D4A017' }}>AI</span></span>
        </div>
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.06em',
          }}
        >
          © 2026 BaobabAI · Deep roots. Global impact.
        </p>
      </div>
    </footer>
  )
}
