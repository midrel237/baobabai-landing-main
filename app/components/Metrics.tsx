'use client'

import { Reveal, Counter } from './shared'

const stats = [
  { value: 70, suffix: '%', prefix: '30–', label: 'Time saved on manual ops' },
  { value: 4, suffix: '×', prefix: '', label: 'Faster execution' },
  { value: 60, suffix: '%', prefix: 'Up to ', label: 'Lower operational cost' },
  { value: 24, suffix: '/7', prefix: '', label: 'Always-on automation' },
]

export default function Metrics() {
  return (
    <section style={{ background: '#F2F4F7' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '72px 32px' }}>
        <div
          className="bb-metrics"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}
        >
          {stats.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ borderLeft: '1px solid #CBD5E1', paddingLeft: 24 }}>
                <p
                  style={{
                    fontSize: 'clamp(2.25rem, 3.5vw, 3rem)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    color: '#0F172A',
                    lineHeight: 1,
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.5em',
                      color: '#475569',
                      fontWeight: 500,
                      marginRight: 4,
                    }}
                  >
                    {s.prefix}
                  </span>
                  <Counter to={s.value} suffix={s.suffix} />
                </p>
                <p
                  style={{
                    marginTop: 12,
                    fontSize: 13,
                    color: '#475569',
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
