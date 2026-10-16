'use client'

import { Reveal, Eyebrow } from './shared'
import { IconDiscover, IconBuild, IconDeploy } from './icons'

const steps = [
  {
    num: '01',
    title: 'Discover',
    desc: 'We map your operations and identify the highest-impact automation opportunities — no fluff, just what moves the needle.',
    Icon: IconDiscover,
  },
  {
    num: '02',
    title: 'Build',
    desc: "We design AI agents and automated systems tailored to your workflows, not someone else's reference architecture.",
    Icon: IconBuild,
  },
  {
    num: '03',
    title: 'Deploy',
    desc: 'We integrate, test, and scale — ensuring measurable impact from day one and through every iteration after.',
    Icon: IconDeploy,
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" style={{ background: '#F2F4F7' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginBottom: 56,
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          <div>
            <Reveal>
              <Eyebrow>How It Works</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  color: '#0F172A',
                  maxWidth: 520,
                }}
              >
                Three steps to AI-powered operations.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                color: '#94A3B8',
                letterSpacing: '0.1em',
              }}
            >
              ⏱ TYPICAL ENGAGEMENT: 4–8 WEEKS
            </div>
          </Reveal>
        </div>

        <div
          className="bb-steps"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 16,
            position: 'relative',
          }}
        >
          {/* Connecting dotted line */}
          <div
            style={{
              position: 'absolute',
              left: 80,
              right: 80,
              top: 64,
              height: 1,
              background: 'repeating-linear-gradient(90deg, #CBD5E1 0 4px, transparent 4px 8px)',
              zIndex: 0,
            }}
          />

          {steps.map((s, i) => (
            <Reveal key={i} delay={i * 100}>
              <div
                className="bb-step-card"
                style={{
                  padding: '32px',
                  borderRadius: 8,
                  background: '#FFFFFF',
                  border: '1px solid #E5E7EB',
                  boxShadow: 'none',
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: 28,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 8,
                      background: '#083D2E',
                      color: '#FFFFFF',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <s.Icon size={22} />
                  </div>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: '#94A3B8',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                    }}
                  >
                    STEP / {s.num}
                  </span>
                </div>
                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 700,
                    color: '#0F172A',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ marginTop: 12, fontSize: 14.5, lineHeight: 1.65, color: '#475569' }}>
                  {s.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
