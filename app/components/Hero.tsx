'use client'

import { Reveal, HeroBackdrop, CTA } from './shared'
import BotComposition from './BotComposition'

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        color: '#FFFFFF',
        minHeight: 'calc(100vh - 64px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <HeroBackdrop variant="image" />

      <div
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '0 32px',
          width: '100%',
        }}
      >
        <div
          className="bb-hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.85fr 1fr',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Left: copy */}
          <div>
            <Reveal delay={80}>
              <h1
                style={{
                  fontSize: 'clamp(3rem, 6vw, 4.75rem)',
                  fontWeight: 700,
                  lineHeight: 1.02,
                  letterSpacing: '-0.03em',
                  margin: 0,
                  color: '#FFFFFF',
                }}
              >
                AI Agents.
                <br />
                <span style={{ whiteSpace: 'nowrap' }}>
                  <span style={{ color: '#D4A017', fontStyle: 'italic', fontWeight: 600 }}>Real</span>{' '}
                  Operations.
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p
                style={{
                  marginTop: 28,
                  maxWidth: 520,
                  fontSize: 17,
                  lineHeight: 1.65,
                  color: 'rgba(255,255,255,0.78)',
                }}
              >
                BaobabAI designs and integrates AI agents and automation into your business — so your
                operations run faster, smarter, and at scale.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div style={{ marginTop: 36, display: 'flex', flexWrap: 'nowrap', gap: 14 }}>
                <CTA ctaStyle="gold" onForest size="lg">
                  Book a Demo
                </CTA>
                <CTA ctaStyle="outline" onForest size="lg" icon={false} href="#how-it-works">
                  Talk to an Expert
                </CTA>
              </div>
            </Reveal>

            <Reveal delay={340}>
              <div
                style={{
                  marginTop: 56,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 32,
                  justifyContent: 'center',
                  textAlign: 'center',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <span>↳ TRUSTED BY</span>
                <span>OPS TEAMS</span>
                <span>FINTECHS</span>
                <span>LOGISTICS</span>
                <span>RETAIL</span>
              </div>
            </Reveal>
          </div>

          {/* Right: bot animation */}
          <div
            className="bb-hero-globe"
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <Reveal delay={120}>
              <div
                style={{
                  position: 'relative',
                  width: 560,
                  maxWidth: '100%',
                  marginRight: -20,
                }}
              >
                <BotComposition />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
