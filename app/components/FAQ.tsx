'use client'

import { useState } from 'react'
import { Reveal, Eyebrow } from './shared'
import { IconPlus, IconMinus } from './icons'

const faqs = [
  {
    q: 'What does a typical engagement look like?',
    a: "We start with a 1-week Discovery sprint to map your operations and quantify automation opportunities. From there, most clients move into a 4–8 week Build phase, followed by an ongoing Deploy partnership. We're flexible on shape — fixed-scope project, retainer, or embedded team.",
  },
  {
    q: 'Do you build with off-the-shelf tools or from scratch?',
    a: 'Both, deliberately. We compose with the best LLMs, automation platforms, and integration tooling available — and write custom code where the leverage is real. The goal is shippable, maintainable systems, not bespoke art projects.',
  },
  {
    q: 'Which payment integrations do you support?',
    a: 'MTN MoMo, Orange Money, M-Pesa, Wave, Flutterwave, Paystack, and Stripe out of the box, plus any major bank API on request. Multi-currency reconciliation and webhooks are part of the default delivery.',
  },
  {
    q: 'How do you handle data, security, and compliance?',
    a: 'We default to your cloud, your keys, your audit trail. We\'re comfortable with NDPR, GDPR, and POPIA scopes, and we sign DPAs as standard. Sensitive workloads can run fully on-prem or in your VPC.',
  },
  {
    q: 'What size companies do you work with?',
    a: "Series A through enterprise, with a soft spot for SMB founders who want operational leverage now, not after a 12-month rollout. If you can describe your top 3 manual workflows in a 30-min call, we can tell you whether we're the right fit by week's end.",
  },
  {
    q: 'How do you measure success?',
    a: "We agree on operational KPIs upfront — time saved per workflow, cost per ticket, recovery rate, NPS — and report on them weekly. If a system isn't moving the metric within 30 days of deploy, we tear it down and rebuild it. No vanity dashboards.",
  },
]

export default function FAQ() {
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" style={{ background: '#F2F4F7' }}>
      <div style={{ maxWidth: 1240, margin: '0 auto', padding: '96px 32px' }}>
        <div
          className="bb-faq-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          <div>
            <Reveal>
              <Eyebrow>FAQ</Eyebrow>
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
                }}
              >
                Things founders ask us first.
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p
                style={{
                  marginTop: 20,
                  fontSize: 14.5,
                  lineHeight: 1.65,
                  color: '#475569',
                }}
              >
                Don&apos;t see yours? Drop us a line at{' '}
                <a
                  href="mailto:hello@baobabai.com"
                  style={{ color: '#083D2E', fontWeight: 600 }}
                >
                  hello@baobabai.com
                </a>
                .
              </p>
            </Reveal>
          </div>

          <div
            style={{
              background: '#FFFFFF',
              borderRadius: 12,
              border: '1px solid #E5E7EB',
              overflow: 'hidden',
            }}
          >
            {faqs.map((f, i) => {
              const isOpen = open === i
              return (
                <div
                  key={i}
                  style={{
                    borderBottom: i < faqs.length - 1 ? '1px solid #E5E7EB' : 'none',
                  }}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 16,
                      padding: '22px 28px',
                      border: 'none',
                      background: 'transparent',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      color: '#0F172A',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: 11,
                          color: '#94A3B8',
                          letterSpacing: '0.1em',
                        }}
                      >
                        0{i + 1}
                      </span>
                      <span style={{ fontSize: 16, fontWeight: 600 }}>{f.q}</span>
                    </span>
                    <span
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 999,
                        border: '1px solid #E5E7EB',
                        display: 'grid',
                        placeItems: 'center',
                        color: isOpen ? '#FFFFFF' : '#0F172A',
                        background: isOpen ? '#083D2E' : 'transparent',
                        transition: 'all 200ms ease',
                        flexShrink: 0,
                      }}
                    >
                      {isOpen ? <IconMinus size={14} stroke={2} /> : <IconPlus size={14} stroke={2} />}
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? 240 : 0,
                      overflow: 'hidden',
                      transition: 'max-height 300ms ease',
                    }}
                  >
                    <p
                      style={{
                        padding: '0 28px 24px 64px',
                        fontSize: 14.5,
                        lineHeight: 1.7,
                        color: '#475569',
                      }}
                    >
                      {f.a}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
