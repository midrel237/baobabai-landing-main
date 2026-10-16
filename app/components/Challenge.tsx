'use client'

import { Reveal, Eyebrow } from './shared'
import { IconManual, IconIntegrate, IconExperiment, IconBottleneck } from './icons'

const items = [
  { Icon: IconManual, text: 'Manual workflows slow your team down' },
  { Icon: IconIntegrate, text: "Tools don't integrate with each other" },
  { Icon: IconExperiment, text: 'AI experiments never scale to production' },
  { Icon: IconBottleneck, text: 'Operations become costly bottlenecks' },
]

const cardBase = {
  padding: '24px',
  borderRadius: 8,
  background: '#F2F4F7',
  border: '1px solid #E5E7EB',
  transition: 'transform 200ms ease, border-color 200ms ease, box-shadow 200ms ease',
}

export default function Challenge() {
  return (
    <section style={{ background: '#FFFFFF', borderTop: '1px solid #F2F4F7' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
        <div
          className="bb-challenge-grid"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: 64, alignItems: 'center' }}
        >
          <div>
            <Reveal>
              <Eyebrow>The Challenge</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#0F172A',
                }}
              >
                Most companies aren&apos;t lacking tools.
                <br />
                They&apos;re lacking{' '}
                <span style={{ color: '#D4A017', fontStyle: 'italic' }}>execution.</span>
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  marginTop: 24,
                  fontSize: 16,
                  lineHeight: 1.7,
                  color: '#475569',
                  maxWidth: 460,
                }}
              >
                The gap between strategy and results widens every quarter. We close it with AI that
                actually ships in your environment — not slides about it.
              </p>
            </Reveal>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {items.map((item, i) => (
              <Reveal key={i} delay={100 + i * 60}>
                <div className="bb-card" style={cardBase}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 6,
                        background: '#F2F4F7',
                        display: 'grid',
                        placeItems: 'center',
                        color: '#083D2E',
                      }}
                    >
                      <item.Icon size={20} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: '#94A3B8',
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <p
                    style={{
                      marginTop: 18,
                      fontSize: 14,
                      lineHeight: 1.55,
                      color: '#0F172A',
                      fontWeight: 500,
                    }}
                  >
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
