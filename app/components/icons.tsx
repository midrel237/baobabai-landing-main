'use client'

import React from 'react'

type IconProps = {
  size?: number
  stroke?: number
  color?: string
  className?: string
}

const Icon = ({ size = 24, stroke = 1.5, children, ...props }: IconProps & { children: React.ReactNode }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    {children}
  </svg>
)

export const BaobabMark = ({
  size = 40,
  color = 'currentColor',
  accent = '#D4A017',
}: {
  size?: number
  color?: string
  accent?: string
}) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <line x1="32" y1="56" x2="32" y2="36" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <line x1="32" y1="36" x2="20" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="36" x2="44" y2="24" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="32" y1="36" x2="32" y2="20" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    <line x1="20" y1="24" x2="12" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="20" y1="24" x2="22" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="44" y1="24" x2="52" y2="18" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="44" y1="24" x2="42" y2="14" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="32" y1="20" x2="28" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <line x1="32" y1="20" x2="36" y2="10" stroke={color} strokeWidth="1.2" strokeLinecap="round" />
    <circle cx="32" cy="36" r="2.5" fill={color} />
    <circle cx="20" cy="24" r="2" fill={color} />
    <circle cx="44" cy="24" r="2" fill={color} />
    <circle cx="32" cy="20" r="2" fill={color} />
    <circle cx="12" cy="18" r="1.6" fill={color} />
    <circle cx="22" cy="14" r="1.6" fill={accent} />
    <circle cx="52" cy="18" r="1.6" fill={color} />
    <circle cx="42" cy="14" r="1.6" fill={color} />
    <circle cx="28" cy="10" r="1.6" fill={color} />
    <circle cx="36" cy="10" r="1.6" fill={accent} />
    <circle cx="32" cy="56" r="1.5" fill={color} />
  </svg>
)

export const IconAgent = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3.5" />
    <circle cx="4" cy="6" r="1.5" />
    <circle cx="20" cy="6" r="1.5" />
    <circle cx="12" cy="21" r="1.5" />
    <line x1="5.2" y1="6.9" x2="9.5" y2="10.2" />
    <line x1="18.8" y1="6.9" x2="14.5" y2="10.2" />
    <line x1="12" y1="15.5" x2="12" y2="19.5" />
  </Icon>
)

export const IconWorkflow = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="9" width="6" height="6" rx="1" />
    <circle cx="19" cy="6" r="2.5" />
    <rect x="14" y="15" width="7" height="6" rx="1" />
    <line x1="8" y1="11" x2="16.7" y2="6.6" />
    <line x1="8" y1="13.5" x2="14" y2="17.5" />
    <line x1="19" y1="9" x2="17.7" y2="15" />
  </Icon>
)

export const IconComms = (p: IconProps) => (
  <Icon {...p}>
    <path d="M3 6.5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4 3.5v-3.5H5a2 2 0 0 1-2-2z" />
    <circle cx="8.5" cy="10.5" r="1" fill="currentColor" />
    <circle cx="12" cy="10.5" r="1" fill="currentColor" />
    <circle cx="15.5" cy="10.5" r="1" fill="currentColor" />
  </Icon>
)

export const IconPayments = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2.5" y="6" width="19" height="13" rx="1.5" />
    <line x1="2.5" y1="10" x2="21.5" y2="10" />
    <circle cx="6.5" cy="14.5" r="0.8" fill="currentColor" />
    <circle cx="9.5" cy="14.5" r="0.8" fill="currentColor" />
    <circle cx="12.5" cy="14.5" r="0.8" fill="currentColor" />
    <line x1="16" y1="14.5" x2="19" y2="14.5" />
  </Icon>
)

export const IconInsights = (p: IconProps) => (
  <Icon {...p}>
    <line x1="3" y1="20" x2="21" y2="20" />
    <rect x="5" y="13" width="3" height="7" />
    <rect x="10.5" y="9" width="3" height="11" />
    <rect x="16" y="5" width="3" height="15" />
    <circle cx="6.5" cy="13" r="1" fill="currentColor" />
    <circle cx="12" cy="9" r="1" fill="currentColor" />
    <circle cx="17.5" cy="5" r="1" fill="currentColor" />
  </Icon>
)

export const IconDiscover = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="10.5" cy="10.5" r="6" />
    <line x1="15" y1="15" x2="20" y2="20" />
    <circle cx="10.5" cy="10.5" r="1.5" fill="currentColor" />
  </Icon>
)

export const IconBuild = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z" />
    <path d="M12 3v18" />
    <path d="M4 7.5l8 4.5 8-4.5" />
  </Icon>
)

export const IconDeploy = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 2.5l4 5v7l-4 3-4-3v-7z" />
    <line x1="12" y1="7" x2="12" y2="13" />
    <circle cx="12" cy="9.5" r="1" fill="currentColor" />
    <path d="M8 17.5l-2 4 4-1.5" />
    <path d="M16 17.5l2 4-4-1.5" />
  </Icon>
)

export const IconManual = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="8" />
    <polyline points="12 7 12 12 15 14" />
  </Icon>
)

export const IconIntegrate = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1" />
    <rect x="14" y="3" width="7" height="7" rx="1" />
    <rect x="3" y="14" width="7" height="7" rx="1" />
    <rect x="14" y="14" width="7" height="7" rx="1" />
    <line x1="10" y1="6.5" x2="14" y2="6.5" strokeDasharray="2 2" />
    <line x1="6.5" y1="10" x2="6.5" y2="14" strokeDasharray="2 2" />
  </Icon>
)

export const IconExperiment = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3v6L4.5 19a2 2 0 0 0 1.8 2.8h11.4A2 2 0 0 0 19.5 19L15 9V3" />
    <line x1="8" y1="3" x2="16" y2="3" />
    <line x1="7" y1="14" x2="17" y2="14" />
  </Icon>
)

export const IconBottleneck = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 4h14l-5 7v6l-4 2v-8z" />
  </Icon>
)

export const IconRetail = (p: IconProps) => (
  <Icon {...p}>
    <path d="M4 8h16l-1 12H5z" />
    <path d="M8 8V5a4 4 0 0 1 8 0v3" />
  </Icon>
)

export const IconFinance = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="9" width="18" height="11" rx="1" />
    <path d="M5 9V6l7-3 7 3v3" />
    <line x1="3" y1="14" x2="21" y2="14" />
  </Icon>
)

export const IconLogistics = (p: IconProps) => (
  <Icon {...p}>
    <rect x="2" y="7" width="13" height="10" rx="1" />
    <path d="M15 10h4l3 3v4h-7" />
    <circle cx="6.5" cy="18.5" r="1.8" />
    <circle cx="17.5" cy="18.5" r="1.8" />
  </Icon>
)

export const IconHealth = (p: IconProps) => (
  <Icon {...p}>
    <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11z" />
    <line x1="12" y1="9" x2="12" y2="15" />
    <line x1="9" y1="12" x2="15" y2="12" />
  </Icon>
)

export const IconTelecom = (p: IconProps) => (
  <Icon {...p}>
    <path d="M5 9a8 8 0 0 1 14 0" />
    <path d="M8 12a5 5 0 0 1 8 0" />
    <circle cx="12" cy="16" r="1.5" fill="currentColor" />
  </Icon>
)

export const IconEducation = (p: IconProps) => (
  <Icon {...p}>
    <path d="M2 9l10-4 10 4-10 4z" />
    <path d="M6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
  </Icon>
)

export const IconArrowRight = (p: IconProps) => (
  <Icon {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="13 6 19 12 13 18" />
  </Icon>
)

export const IconPlus = (p: IconProps) => (
  <Icon {...p}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
)

export const IconMinus = (p: IconProps) => (
  <Icon {...p}>
    <line x1="5" y1="12" x2="19" y2="12" />
  </Icon>
)

export const IconMenu = (p: IconProps) => (
  <Icon {...p}>
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </Icon>
)

export const IconClose = (p: IconProps) => (
  <Icon {...p}>
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </Icon>
)

export const Crosshair = ({
  color = 'rgba(212,160,23,0.6)',
  size = 10,
}: {
  color?: string
  size?: number
}) => (
  <svg width={size} height={size} viewBox="0 0 10 10" style={{ display: 'block' }}>
    <line x1="5" y1="0" x2="5" y2="10" stroke={color} strokeWidth="1" />
    <line x1="0" y1="5" x2="10" y2="5" stroke={color} strokeWidth="1" />
  </svg>
)
