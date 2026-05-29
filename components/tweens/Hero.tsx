'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { spring, enter, cascade } from '@tweens/tweens'

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ─── Animated Headline ────────────────────────────────────────────────────────

function AnimatedHeadline() {
  const wordsRef = useRef<HTMLSpanElement[]>([])
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (hasAnimated.current) return
    hasAnimated.current = true
    const els = wordsRef.current.filter(Boolean)
    if (els.length === 0) return
    els.forEach((el, i) => {
      setTimeout(() => enter(el, { y: 20, opacity: 0 }, 'snappy'), i * 80)
    })
  }, [])

  const words = ['Physics-based', 'animation', 'for', 'the', 'web.']

  return (
    <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold tracking-tight text-white leading-[1.1] mb-4">
      {words.map((word, i) => (
        <span
          key={i}
          ref={el => { if (el) wordsRef.current[i] = el }}
          className="inline-block mr-[0.3em] opacity-0"
        >
          {word}
        </span>
      ))}
    </h1>
  )
}

// ─── Interactive Spring Demo ──────────────────────────────────────────────────

function SpringDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<HTMLDivElement[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    enter(card, { y: 30, opacity: 0, scale: 0.95 }, 'gentle')

    const timer = setTimeout(() => {
      const dots = dotRefs.current.filter(Boolean)
      if (dots.length > 0) cascade(dots, { y: 0, opacity: 1 }, 'snappy', 0.05)
    }, 400)

    return () => clearTimeout(timer)
  }, [])

  const handleMouseEnter = () => {
    if (!canHover()) return
    setIsHovered(true)
    const card = cardRef.current
    if (card) spring(card, { scale: 1.02, y: -4 }, 'snappy')
    dotRefs.current.filter(Boolean).forEach((dot, i) => {
      const angle = (i / 6) * Math.PI * 2
      spring(dot, { x: Math.cos(angle) * 8, y: Math.sin(angle) * 8, scale: 1.2 }, 'bouncy')
    })
  }

  const handleMouseLeave = () => {
    if (!canHover()) return
    setIsHovered(false)
    const card = cardRef.current
    if (card) spring(card, { scale: 1, y: 0 }, 'snappy')
    dotRefs.current.filter(Boolean).forEach(dot => {
      spring(dot, { x: 0, y: 0, scale: 1 }, 'snappy')
    })
  }

  return (
    <div
      className="relative flex items-center justify-center w-full aspect-square max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56 rounded-3xl border border-white/[0.08] bg-gradient-to-br from-white/[0.06] to-white/[0.02] opacity-0 cursor-pointer"
      >
        <div className="text-center">
          <span className="block text-4xl sm:text-5xl font-bold text-white/90 tracking-tight">tw</span>
          <span className="block text-[10px] font-mono text-white/25 mt-2">
            {isHovered ? 'spring → bouncy' : 'hover me'}
          </span>
        </div>
      </div>

      {Array.from({ length: 6 }).map((_, i) => {
        const angle = (i / 6) * Math.PI * 2
        const radius = 120
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius
        return (
          <div
            key={i}
            ref={el => { if (el) dotRefs.current[i] = el }}
            className="absolute w-2.5 h-2.5 rounded-full bg-white/20 opacity-0"
            style={{
              left: `calc(50% + ${x}px - 5px)`,
              top: `calc(50% + ${y}px - 5px)`,
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Install Command ──────────────────────────────────────────────────────────

function InstallCommand() {
  const [copied, setCopied] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const iconRef = useRef<HTMLSpanElement>(null)
  const cmd = 'npm i @tweens/tweens'

  const copy = async () => {
    const btn = btnRef.current
    const icon = iconRef.current
    if (!btn) return
    spring(btn, { scale: 0.96 }, 'stiff')
    setTimeout(() => spring(btn, { scale: 1 }, 'snappy'), 100)
    await navigator.clipboard.writeText(cmd)
    setCopied(true)
    if (icon) {
      spring(icon, { scale: 1.15, rotate: -8 }, 'bouncy')
      setTimeout(() => spring(icon, { scale: 1, rotate: 0 }, 'snappy'), 180)
    }
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      ref={btnRef}
      onClick={copy}
      onMouseEnter={() => { if (canHover()) spring(btnRef.current!, { y: -2 }, 'snappy') }}
      onMouseLeave={() => { if (canHover()) spring(btnRef.current!, { y: 0 }, 'snappy') }}
      className="group flex items-center gap-3 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.04] hover:bg-white/[0.07] transition-colors text-left w-full sm:w-auto"
    >
      <span className="text-white/30 text-sm font-mono">$</span>
      <span className="font-mono text-sm text-white/50 select-none">{cmd}</span>
      <span ref={iconRef} className="text-white/25 group-hover:text-white/50 transition-colors shrink-0 ml-auto sm:ml-0">
        {copied ? <Check size={12} /> : <Copy size={12} />}
      </span>
    </button>
  )
}

// ─── Get Started Button ───────────────────────────────────────────────────────

function GetStartedButton() {
  const ref = useRef<HTMLAnchorElement>(null)
  const arrowRef = useRef<HTMLSpanElement>(null)

  return (
    <Link
      ref={ref}
      href="/docs"
      onMouseDown={() => spring(ref.current!, { scale: 0.96 }, 'stiff')}
      onMouseUp={() => spring(ref.current!, { scale: 1, y: 0 }, 'snappy')}
      onMouseLeave={() => {
        spring(ref.current!, { scale: 1, y: 0 }, 'snappy')
        if (arrowRef.current) spring(arrowRef.current, { x: 0 }, 'snappy')
      }}
      onMouseEnter={() => {
        if (!canHover()) return
        spring(ref.current!, { y: -2 }, 'snappy')
        if (arrowRef.current) spring(arrowRef.current, { x: 3 }, 'snappy')
      }}
      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-[#0a0a0a] text-sm font-semibold"
    >
      Get started
      <span ref={arrowRef} className="inline-flex">
        <ArrowRight size={14} />
      </span>
    </Link>
  )
}

// ─── Feature Pills ────────────────────────────────────────────────────────────

function FeaturePills() {
  const pillRefs = useRef<HTMLSpanElement[]>([])

  useEffect(() => {
    const pills = pillRefs.current.filter(Boolean)
    if (pills.length === 0) return
    const timer = setTimeout(() => {
      pills.forEach((pill, i) => {
        setTimeout(() => enter(pill, { y: 8, opacity: 0 }, 'snappy'), i * 60)
      })
    }, 300)
    return () => clearTimeout(timer)
  }, [])

  const features = ['~2kb gzipped', 'Zero dependencies', 'Interruptible', 'TypeScript']

  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {features.map((feature, i) => (
        <span
          key={feature}
          ref={el => { if (el) pillRefs.current[i] = el }}
          className="px-3 py-1 rounded-full border border-white/[0.06] bg-white/[0.03] text-[11px] font-mono text-white/30 opacity-0"
        >
          {feature}
        </span>
      ))}
    </div>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  return (
    <div className="flex-1 flex items-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              <span className="text-[11px] font-mono text-white/40">v0.3.0</span>
            </div>

            <AnimatedHeadline />

            <p className="text-base text-white/40 leading-relaxed mb-8 max-w-sm">
              Spring animations that feel alive. Lightweight, interruptible, and built for the DOM.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <GetStartedButton />
            </div>

            <InstallCommand />
            <FeaturePills />
          </div>

          <div className="flex items-center justify-center lg:justify-end">
            <SpringDemo />
          </div>

        </div>
      </div>
    </div>
  )
}
