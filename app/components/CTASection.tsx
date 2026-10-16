'use client'

import { Reveal, Eyebrow, CTA } from './shared'

export default function CTASection() {
  return (
    <section
      id="contact"
      style={{
        background: '#0F172A',
        color: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot grid */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
        aria-hidden
      >
        <defs>
          <pattern id="ctadots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="rgba(212,160,23,0.15)" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ctadots)" />
      </svg>

      <div
        style={{
          position: 'relative',
          maxWidth: 1240,
          margin: '0 auto',
          padding: '112px 32px',
          textAlign: 'center',
        }}
      >
        <Reveal>
          <Eyebrow color="#D4A017">Let&apos;s get started</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <h2
            style={{
              marginTop: 24,
              fontSize: 'clamp(2.25rem, 4vw, 3.25rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Stop experimenting with AI.
            <br />
            Start <span style={{ color: '#D4A017', fontStyle: 'italic' }}>operating</span> with it.
          </h2>
        </Reveal>
        <Reveal delay={160}>
          <p
            style={{
              marginTop: 24,
              fontSize: 17,
              lineHeight: 1.6,
              color: 'rgba(255,255,255,0.7)',
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Book a demo and see your top 3 workflows automated, end-to-end, before your next board
            meeting.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <div
            style={{
              marginTop: 36,
              display: 'flex',
              justifyContent: 'center',
              gap: 14,
              flexWrap: 'wrap',
            }}
          >
            <CTA ctaStyle="gold" onForest size="lg">
              Book a Demo
            </CTA>
            <CTA
              ctaStyle="outline"
              onForest
              size="lg"
              icon={false}
              href="mailto:hello@baobabai.com"
            >
              hello@baobabai.com
            </CTA>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
