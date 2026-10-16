'use client'

import { useState, useEffect } from 'react'
import { BaobabMark, IconMenu, IconClose } from './icons'
import { CTA } from './shared'

const links = [
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#deliver', label: 'What We Deliver' },
  { href: '#industries', label: 'Industries' },
  { href: '#about', label: 'About' },
  { href: '#faq', label: 'FAQ' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: scrolled ? 'rgba(15,23,42,0.92)' : '#0F172A',
        backdropFilter: scrolled ? 'saturate(180%) blur(8px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(255,255,255,0.08)'
          : '1px solid transparent',
        transition: 'background 200ms ease',
      }}
    >
      <div
        style={{
          maxWidth: 1240,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 24,
          padding: '16px 32px',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
          }}
        >
          <BaobabMark size={36} color="#FFFFFF" accent="#D4A017" />
          <span
            style={{
              fontSize: 17,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              color: '#FFFFFF',
            }}
          >
            Baobab<span style={{ color: '#D4A017' }}>AI</span>
          </span>
        </a>

        {/* Desktop nav */}
        <div
          className="bb-nav-links"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 32,
            fontSize: 14,
            fontWeight: 500,
            color: 'rgba(255,255,255,0.85)',
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="bb-nav-link"
              style={{ color: 'rgba(255,255,255,0.85)', textDecoration: 'none' }}
            >
              {l.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <CTA ctaStyle="gold" size="sm" icon={false}>
            Book a Demo
          </CTA>
          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              color: '#FFFFFF',
              cursor: 'pointer',
              padding: 4,
            }}
            className="bb-hamburger"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <IconClose size={22} /> : <IconMenu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div
          style={{
            background: '#0F172A',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '16px 32px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 16,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
