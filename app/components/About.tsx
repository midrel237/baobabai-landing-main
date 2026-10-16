'use client'

import { Reveal, Eyebrow } from './shared'
import { BaobabMark } from './icons'

const principles = [
  {
    kbd: '01',
    title: 'Deep roots',
    text: 'We embed with your team to understand the real workflows — not the org chart\'s version of them.',
  },
  {
    kbd: '02',
    title: 'Ship to scale',
    text: 'Every system we build is designed to survive production traffic from day one.',
  },
  {
    kbd: '03',
    title: 'Built for production',
    text: 'Designed for the messy realities of real operations: multi-channel comms, multi-currency, and the long tail of edge cases.',
  },
]

export default function About() {
  return (
    <section id="about" style={{ background: '#FFFFFF' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
        <div
          className="bb-about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          {/* Sticky left column */}
          <div style={{ position: 'sticky', top: 100 }}>
            <Reveal>
              <Eyebrow>About BaobabAI</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.05,
                  letterSpacing: '-0.02em',
                  color: '#0F172A',
                }}
              >
                Deep roots.
                <br />
                <span style={{ color: '#D4A017', fontStyle: 'italic' }}>Global</span> impact.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  marginTop: 24,
                  fontSize: 16,
                  lineHeight: 1.65,
                  color: '#475569',
                }}
              >
                We combine deep systems thinking with AI and automation to help businesses operate
                smarter and grow faster — built like the baobab tree: rooted, resilient,
                regenerative.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div
                style={{
                  marginTop: 32,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <BaobabMark size={56} color="#083D2E" accent="#D4A017" />
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: '#94A3B8',
                      letterSpacing: '0.1em',
                    }}
                  >
                    EST. 2024
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: '#0F172A' }}>
                    Operating across 12 markets
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Principles */}
          <div style={{ display: 'grid', gap: 12 }}>
            {principles.map((p, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  className="bb-principle"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    gap: 24,
                    padding: '28px 32px',
                    border: '1px solid #E5E7EB',
                    borderRadius: 12,
                    background: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      fontWeight: 600,
                      color: '#D4A017',
                      letterSpacing: '0.1em',
                      paddingTop: 4,
                    }}
                  >
                    /{p.kbd}
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 19,
                        fontWeight: 600,
                        color: '#0F172A',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {p.title}
                    </h3>
                    <p
                      style={{
                        marginTop: 8,
                        fontSize: 14.5,
                        lineHeight: 1.65,
                        color: '#475569',
                      }}
                    >
                      {p.text}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
