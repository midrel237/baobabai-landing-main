'use client'

import { Reveal, Eyebrow } from './shared'
import {
  IconRetail,
  IconFinance,
  IconLogistics,
  IconHealth,
  IconTelecom,
  IconEducation,
} from './icons'

const items = [
  { Icon: IconRetail, name: 'Retail & E-commerce', line: 'Inventory, returns, support' },
  { Icon: IconFinance, name: 'Financial Services', line: 'Payments, recovery, KYC' },
  { Icon: IconLogistics, name: 'Logistics', line: 'Routing, tracking, comms' },
  { Icon: IconHealth, name: 'Health', line: 'Triage, records, scheduling' },
  { Icon: IconTelecom, name: 'Telecom', line: 'Onboarding, billing, churn' },
  { Icon: IconEducation, name: 'Education', line: 'Admissions, support, ops' },
]

export default function Industries() {
  return (
    <section id="industries" style={{ background: '#FFFFFF' }}>
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
              <Eyebrow>Industries</Eyebrow>
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
                  maxWidth: 600,
                }}
              >
                Built for the operating realities of African businesses.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={120}>
            <p
              style={{
                fontSize: 14,
                color: '#475569',
                maxWidth: 320,
                lineHeight: 1.6,
              }}
            >
              We work with founders shipping across emerging markets — and the integrations to match.
            </p>
          </Reveal>
        </div>

        <div
          className="bb-industries"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            border: '1px solid #E5E7EB',
            borderRadius: 12,
            overflow: 'hidden',
          }}
        >
          {items.map((item, i) => {
            const col = i % 3
            const row = Math.floor(i / 3)
            const lastCol = col === 2
            const lastRow = row === Math.floor((items.length - 1) / 3)
            return (
              <Reveal key={i} delay={i * 50}>
                <div
                  className="bb-industry"
                  style={{
                    padding: '32px 28px',
                    borderRight: lastCol ? 'none' : '1px solid #E5E7EB',
                    borderBottom: lastRow ? 'none' : '1px solid #E5E7EB',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    minHeight: 160,
                    background: '#FFFFFF',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ color: '#083D2E' }}>
                      <item.Icon size={26} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: '#CBD5E1',
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      style={{
                        fontSize: 17,
                        fontWeight: 600,
                        color: '#0F172A',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {item.name}
                    </h3>
                    <p
                      style={{
                        marginTop: 4,
                        fontSize: 13,
                        color: '#64748B',
                        fontFamily: 'var(--font-mono)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {item.line}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
