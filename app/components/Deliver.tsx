'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Reveal, Eyebrow } from './shared'
import { Crosshair, IconAgent, IconWorkflow, IconComms, IconInsights } from './icons'

const items = [
  { Icon: IconAgent, title: 'AI Agents', desc: 'Intelligent agents that think, decide, and act on your behalf.' },
  { Icon: IconWorkflow, title: 'Workflow Automation', desc: 'End-to-end automation of repetitive and complex processes.' },
  { Icon: IconComms, title: 'Communication', desc: 'Automate interactions across WhatsApp, email, SMS and more.' },
  { Icon: IconInsights, title: 'Real-time Insights', desc: 'Dashboards and reports that help you decide faster, with confidence.' },
]

function DeliverCard({ item, delay }: { item: typeof items[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setShown(true), delay)
            io.disconnect()
          }
        })
      },
      { threshold: 0.2, rootMargin: '0px 0px -60px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={'bb-deliver-card bb-card-dark' + (shown ? ' is-in' : '')}
      style={{
        padding: '32px 26px',
        borderRadius: 10,
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(212,160,23,0.18)',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', top: 10, right: 10 }}>
        <Crosshair color="rgba(212,160,23,0.4)" size={8} />
      </div>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 7,
          background: 'rgba(212,160,23,0.12)',
          display: 'grid',
          placeItems: 'center',
          color: '#D4A017',
          marginBottom: 28,
        }}
      >
        <item.Icon size={24} />
      </div>
      <h3 style={{ fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em', color: '#FFFFFF' }}>
        {item.title}
      </h3>
      <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.65, color: 'rgba(255,255,255,0.72)' }}>
        {item.desc}
      </p>
    </div>
  )
}

export default function Deliver() {
  return (
    <section
      id="deliver"
      style={{ background: '#083D2E', color: '#FFFFFF', position: 'relative', overflow: 'hidden' }}
    >
      {/* Decorative gridlines */}
      <svg
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, opacity: 0.4 }}
        aria-hidden
      >
        <line x1="0" y1="80" x2="100%" y2="80" stroke="rgba(212,160,23,0.08)" />
        <line x1="0" y1="calc(100% - 80px)" x2="100%" y2="calc(100% - 80px)" stroke="rgba(212,160,23,0.08)" />
      </svg>

      <div style={{ position: 'relative', maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
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
              <Eyebrow color="#D4A017">What We Deliver</Eyebrow>
            </Reveal>
            <Reveal delay={80}>
              <h2
                style={{
                  marginTop: 20,
                  fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  maxWidth: 600,
                }}
              >
                AI-enabled operations that keep your business{' '}
                <span style={{ color: '#D4A017', fontStyle: 'italic' }}>moving</span>.
              </h2>
            </Reveal>
          </div>
        </div>

        <div
          className="bb-deliver"
          style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}
        >
          {items.map((item, i) => (
            <DeliverCard key={i} item={item} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
