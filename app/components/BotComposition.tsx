'use client'

import React, { useEffect, useRef, useState } from 'react'

const useTime = () => {
  const [t, setT] = useState(0)
  const startRef = useRef(performance.now())
  useEffect(() => {
    let raf: number
    const loop = () => {
      setT((performance.now() - startRef.current) / 1000)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])
  return t
}

const Bot = ({
  x,
  y,
  scale = 1,
  phase = 0,
  t = 0,
  depth = 0,
  primary = false,
}: {
  x: string
  y: string
  scale?: number
  phase?: number
  t?: number
  depth?: number
  primary?: boolean
}) => {
  const floatY = Math.sin(t * 0.6 + phase) * 6
  const breath = 1 + Math.sin(t * 0.8 + phase) * 0.012
  const tilt = Math.sin(t * 0.4 + phase * 0.7) * 2.5
  const blinkCycle = ((t * 0.45 + phase) % 1 + 1) % 1
  const blinking = blinkCycle > 0.96
  const eyeOpen = blinking ? Math.max(0.05, (1 - blinkCycle) * 25) : 1
  const eyeGlow = 0.7 + Math.sin(t * 1.4 + phase) * 0.3

  const W = 200
  const H = 260
  const id = String(phase).replace('.', '_')

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 200 * scale,
        height: 260 * scale,
        transform: `translate(-50%, calc(-50% + ${floatY}px)) scale(${breath})`,
        filter:
          depth > 0
            ? `blur(${depth * 1.4}px) brightness(${1 - depth * 0.18})`
            : 'none',
        opacity: 1 - depth * 0.15,
        zIndex: primary ? 3 : 1,
        pointerEvents: 'none',
      }}
    >
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" style={{ overflow: 'visible' }}>
        <defs>
          <radialGradient id={`bodyFill-${id}`} cx="35%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#3a4a6a" />
            <stop offset="50%" stopColor="#1a2540" />
            <stop offset="100%" stopColor="#0a1024" />
          </radialGradient>
          <radialGradient id={`headFill-${id}`} cx="35%" cy="25%" r="85%">
            <stop offset="0%" stopColor="#475674" />
            <stop offset="55%" stopColor="#1c2842" />
            <stop offset="100%" stopColor="#0a1024" />
          </radialGradient>
          <linearGradient id={`goldRim-${id}`} x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.0" />
            <stop offset="40%" stopColor="#D4A017" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFE9A8" stopOpacity="0.0" />
          </linearGradient>
          <radialGradient id={`eyeGlow-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#A8FFFF" />
            <stop offset="40%" stopColor="#22D3EE" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#0891B2" stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`bigEyeBloom-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#22D3EE" stopOpacity="0" />
          </radialGradient>
          <filter id={`bloom-${id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <filter id={`bigBloom-${id}`} x="-200%" y="-200%" width="500%" height="500%">
            <feGaussianBlur stdDeviation="8" />
          </filter>
        </defs>

        {/* Ambient gold halo */}
        <ellipse
          cx={W / 2}
          cy={H * 0.55}
          rx={W * 0.42}
          ry={H * 0.42}
          fill="#D4A017"
          opacity={0.08 + eyeGlow * 0.04}
          filter={`url(#bigBloom-${id})`}
        />

        <g transform={`translate(${W / 2} ${H / 2}) rotate(${tilt}) translate(${-W / 2} ${-H / 2})`}>
          {/* Body */}
          <ellipse cx={W / 2} cy={H * 0.95} rx={W * 0.32} ry={6} fill="#000000" opacity="0.4" />
          <path
            d={`M ${W * 0.32} ${H * 0.55} Q ${W * 0.5} ${H * 0.45} ${W * 0.68} ${H * 0.55} L ${W * 0.7} ${H * 0.86} Q ${W * 0.5} ${H * 0.94} ${W * 0.3} ${H * 0.86} Z`}
            fill={`url(#bodyFill-${id})`}
            stroke="rgba(212,160,23,0.35)"
            strokeWidth="0.8"
          />
          <line
            x1={W * 0.5}
            y1={H * 0.6}
            x2={W * 0.5}
            y2={H * 0.85}
            stroke="#D4A017"
            strokeOpacity="0.4"
            strokeWidth="0.5"
          />
          <circle cx={W * 0.5} cy={H * 0.7} r="2" fill="#D4A017" opacity={0.6 + eyeGlow * 0.3} />
          <path
            d={`M ${W * 0.32} ${H * 0.55} Q ${W * 0.5} ${H * 0.45} ${W * 0.68} ${H * 0.55}`}
            fill="none"
            stroke={`url(#goldRim-${id})`}
            strokeWidth="1.2"
            opacity="0.7"
          />

          {/* Neck */}
          <rect x={W * 0.45} y={H * 0.4} width={W * 0.1} height={H * 0.07} fill={`url(#bodyFill-${id})`} rx="2" />

          {/* Head */}
          <rect
            x={W * 0.27}
            y={H * 0.12}
            width={W * 0.46}
            height={H * 0.32}
            rx={W * 0.13}
            fill={`url(#headFill-${id})`}
            stroke="rgba(212,160,23,0.4)"
            strokeWidth="0.8"
          />
          <path
            d={`M ${W * 0.3} ${H * 0.18} Q ${W * 0.5} ${H * 0.1} ${W * 0.7} ${H * 0.18}`}
            fill="none"
            stroke="rgba(255,233,168,0.6)"
            strokeWidth="1"
            opacity="0.8"
          />
          <line
            x1={W * 0.5}
            y1={H * 0.12}
            x2={W * 0.5}
            y2={H * 0.04}
            stroke="#D4A017"
            strokeWidth="0.8"
            opacity="0.7"
          />
          <circle
            cx={W * 0.5}
            cy={H * 0.04}
            r="2"
            fill="#FFE9A8"
            opacity={0.7 + eyeGlow * 0.3}
            filter={`url(#bloom-${id})`}
          />
          <rect
            x={W * 0.31}
            y={H * 0.22}
            width={W * 0.38}
            height={H * 0.13}
            rx={W * 0.08}
            fill="#06101e"
            stroke="rgba(212,160,23,0.2)"
            strokeWidth="0.4"
          />

          {/* Eye blooms */}
          <circle cx={W * 0.4} cy={H * 0.285} r="14" fill={`url(#bigEyeBloom-${id})`} opacity={eyeGlow * 0.9} />
          <circle cx={W * 0.6} cy={H * 0.285} r="14" fill={`url(#bigEyeBloom-${id})`} opacity={eyeGlow * 0.9} />

          {/* Left eye */}
          <g transform={`translate(${W * 0.4} ${H * 0.285}) scale(1 ${eyeOpen}) translate(${-W * 0.4} ${-H * 0.285})`}>
            <circle cx={W * 0.4} cy={H * 0.285} r="6" fill={`url(#eyeGlow-${id})`} />
            <circle cx={W * 0.4} cy={H * 0.285} r="2.5" fill="#FFFFFF" opacity="0.95" />
          </g>
          {/* Right eye */}
          <g transform={`translate(${W * 0.6} ${H * 0.285}) scale(1 ${eyeOpen}) translate(${-W * 0.6} ${-H * 0.285})`}>
            <circle cx={W * 0.6} cy={H * 0.285} r="6" fill={`url(#eyeGlow-${id})`} />
            <circle cx={W * 0.6} cy={H * 0.285} r="2.5" fill="#FFFFFF" opacity="0.95" />
          </g>

          {/* Cheek vents */}
          <line
            x1={W * 0.32}
            y1={H * 0.32}
            x2={W * 0.36}
            y2={H * 0.32}
            stroke="rgba(212,160,23,0.5)"
            strokeWidth="0.6"
          />
          <line
            x1={W * 0.64}
            y1={H * 0.32}
            x2={W * 0.68}
            y2={H * 0.32}
            stroke="rgba(212,160,23,0.5)"
            strokeWidth="0.6"
          />
        </g>

        {/* Orbital particles (primary only) */}
        {primary &&
          Array.from({ length: 4 }).map((_, i) => {
            const a = t * 0.5 + (i * Math.PI) / 2
            const px = W / 2 + Math.cos(a) * W * 0.5
            const py = H / 2 + Math.sin(a) * H * 0.3
            return (
              <g key={i}>
                <circle cx={px} cy={py} r="2.5" fill="#FFE9A8" opacity="0.4" filter={`url(#bloom-${id})`} />
                <circle cx={px} cy={py} r="1" fill="#FFFFFF" />
              </g>
            )
          })}
      </svg>
    </div>
  )
}

export default function BotComposition() {
  const t = useTime()

  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      {/* Green ambient wash */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(50% 60% at 50% 55%, rgba(11,61,46,0.65) 0%, rgba(11,61,46,0.25) 45%, rgba(15,23,42,0) 75%)',
        }}
      />

      {/* Background network lines + particles */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 600 600"
        style={{ position: 'absolute', inset: 0, opacity: 0.5 }}
      >
        <defs>
          <linearGradient id="netLine" x1="0" x2="1">
            <stop offset="0%" stopColor="#D4A017" stopOpacity="0" />
            <stop offset="50%" stopColor="#D4A017" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#D4A017" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d={`M 200 ${380 + Math.sin(t) * 4} Q 300 ${280 + Math.sin(t * 1.2) * 6} 420 ${360 + Math.cos(t * 0.8) * 4}`}
          fill="none"
          stroke="url(#netLine)"
          strokeWidth="1.2"
        />
        <path
          d={`M 300 ${260 + Math.sin(t * 0.7) * 4} L 200 ${380 + Math.sin(t) * 4}`}
          fill="none"
          stroke="url(#netLine)"
          strokeWidth="0.8"
          opacity="0.6"
        />
        <path
          d={`M 300 ${260 + Math.sin(t * 0.7) * 4} L 420 ${360 + Math.cos(t * 0.8) * 4}`}
          fill="none"
          stroke="url(#netLine)"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Traveling particles */}
        {[0, 0.33, 0.66].map((offset, i) => {
          const phase = (t * 0.25 + offset) % 1
          const p0x = 300,
            p0y = 260,
            p1x = 360,
            p1y = 320,
            p2x = 420,
            p2y = 360
          const u = phase
          const px = (1 - u) * (1 - u) * p0x + 2 * (1 - u) * u * p1x + u * u * p2x
          const py = (1 - u) * (1 - u) * p0y + 2 * (1 - u) * u * p1y + u * u * p2y
          return (
            <g key={i}>
              <circle cx={px} cy={py} r="3" fill="#FFE9A8" opacity={0.4 + (1 - phase) * 0.5} />
              <circle cx={px} cy={py} r="1.2" fill="#FFFFFF" />
            </g>
          )
        })}

        {/* Ambient particles */}
        {Array.from({ length: 22 }).map((_, i) => {
          const seed = i * 41.3
          const x = (seed * 13) % 600
          const baseY = (seed * 19) % 600
          const y = baseY + Math.sin(t * 0.5 + i) * 8
          const op = 0.15 + ((Math.sin(t * 0.7 + i * 0.4) + 1) / 2) * 0.4
          return <circle key={`p-${i}`} cx={x} cy={y} r="0.9" fill="#D4A017" opacity={op} />
        })}
      </svg>

      {/* Bots — triangular composition */}
      <Bot x="32%" y="64%" scale={0.72} phase={2.1} t={t} depth={0.55} />
      <Bot x="74%" y="62%" scale={0.78} phase={4.3} t={t} depth={0.4} />
      <Bot x="52%" y="50%" scale={1.05} phase={0} t={t} depth={0} primary />
    </div>
  )
}
