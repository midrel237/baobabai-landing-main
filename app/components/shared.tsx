'use client'

import React, { useRef, useState, useEffect, CSSProperties } from 'react'
import { IconArrowRight } from './icons'

/* ── Scroll-reveal wrapper ── */
export const Reveal = ({
  children,
  delay = 0,
  className = '',
  style = {},
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true)
            io.disconnect()
          }
        })
      },
      { threshold: 0.12 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        opacity: shown ? 1 : 0,
        transform: shown ? 'translateY(0)' : 'translateY(16px)',
        transition: `opacity 600ms ease ${delay}ms, transform 600ms cubic-bezier(0.2, 0.7, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/* ── Animated counter ── */
export const Counter = ({
  to = 100,
  suffix = '',
  duration = 1400,
}: {
  to?: number
  suffix?: string
  duration?: number
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const start = performance.now()
            const tick = (now: number) => {
              const t = Math.min(1, (now - start) / duration)
              const eased = 1 - Math.pow(1 - t, 3)
              setVal(Math.round(to * eased))
              if (t < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
            io.disconnect()
          }
        })
      },
      { threshold: 0.5 }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [to, duration])

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  )
}

/* ── Primary CTA button ── */
type CTAStyle = 'gold' | 'forest' | 'outline'

export const CTA = ({
  children,
  ctaStyle = 'gold',
  onForest = false,
  size = 'md',
  href = '#contact',
  icon = true,
}: {
  children: React.ReactNode
  ctaStyle?: CTAStyle
  onForest?: boolean
  size?: 'sm' | 'md' | 'lg'
  href?: string
  icon?: boolean
}) => {
  const sizes = {
    sm: { padding: '10px 16px', fontSize: 13 },
    md: { padding: '12px 22px', fontSize: 14 },
    lg: { padding: '16px 28px', fontSize: 15 },
  }

  let bg: string, color: string, border: string
  if (ctaStyle === 'gold') {
    bg = '#D4A017'
    color = '#0F172A'
    border = '1.5px solid #D4A017'
  } else if (ctaStyle === 'forest') {
    bg = onForest ? '#0a4a37' : '#083D2E'
    color = '#FFFFFF'
    border = onForest ? '1.5px solid rgba(212,160,23,0.5)' : '1.5px solid #083D2E'
  } else {
    bg = 'transparent'
    color = onForest ? '#FFFFFF' : '#0F172A'
    border = onForest ? '1.5px solid rgba(255,255,255,0.7)' : '1.5px solid #0F172A'
  }

  return (
    <a
      href={href}
      className="bb-cta"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        background: bg,
        color,
        border,
        borderRadius: 6,
        fontWeight: 600,
        textDecoration: 'none',
        whiteSpace: 'nowrap',
        ...sizes[size],
      }}
    >
      {children}
      {icon && <IconArrowRight size={16} stroke={2} />}
    </a>
  )
}

/* ── Section eyebrow label ── */
export const Eyebrow = ({
  children,
  color = '#083D2E',
}: {
  children: React.ReactNode
  color?: string
}) => (
  <span
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      color,
    }}
  >
    <span style={{ width: 18, height: 1, background: color, opacity: 0.6 }} />
    {children}
  </span>
)

/* ── Hero backdrop variants ── */
export const HeroBackdrop = ({ variant }: { variant: string }) => {
  if (variant === 'solid') {
    return <div style={{ position: 'absolute', inset: 0, background: '#0F172A' }} />
  }
  if (variant === 'gradient') {
    return (
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(60% 70% at 78% 50%, rgba(14,77,58,0.85) 0%, rgba(8,61,46,0.5) 35%, rgba(15,23,42,0) 70%), linear-gradient(180deg, #0F172A 0%, #0a1426 100%)',
        }}
      />
    )
  }
  // Pattern: dotted grid + green glow
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#0F172A' }}>
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <defs>
          <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="#D4A017" opacity="0.14" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: '50%',
          right: '-10%',
          width: '75%',
          height: '120%',
          transform: 'translateY(-50%)',
          background:
            'radial-gradient(closest-side, rgba(14,77,58,0.85) 0%, rgba(8,61,46,0.55) 35%, rgba(8,61,46,0.18) 60%, rgba(15,23,42,0) 85%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '30%',
          right: '30%',
          width: '30%',
          height: '40%',
          background:
            'radial-gradient(closest-side, rgba(212,160,23,0.18) 0%, rgba(212,160,23,0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}>
        <line x1="0" y1="120" x2="100%" y2="120" stroke="rgba(212,160,23,0.06)" />
        <line x1="0" y1="80%" x2="100%" y2="80%" stroke="rgba(212,160,23,0.06)" />
      </svg>
    </div>
  )
}
