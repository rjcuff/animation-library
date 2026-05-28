'use client'
import { useEffect, useRef, useState } from 'react'
import { Check, Copy, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { spring, enter, stop, cascade } from '@tweens/tweens'

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

    // Stagger entrance of each word
    els.forEach((el, i) => {
      setTimeout(() => {
        try {
          enter(el, { y: 20, opacity: 0 }, 'snappy')
        } catch {
          // Fallback: just make visible
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
      }, i * 80)
    })

    // Safety net: ensure text is visible after a short delay
    setTimeout(() => {
      els.forEach(el => {
        if (getComputedStyle(el).opacity === '0') {
          el.style.opacity = '1'
          el.style.transform = 'none'
        }
      })
    }, 600)
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
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const dotRefs = useRef<HTMLDivElement[]>([])
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const card = cardRef.current
    if (!card) return
    try {
      enter(card, { y: 30, opacity: 0, scale: 0.95 }, 'gentle')
    } catch {
      card.style.opacity = '1'
      card.style.transform = 'none'
    }
    // Safety net
    setTimeout(() => {
      if (card && getComputedStyle(card).opacity === '0') {
        card.style.opacity = '1'
        card.style.transform = 'none'
      }
    }, 800)
  }, [])

  useEffect(() => {
    const dots = dotRefs.current.filter(Boolean)
    if (dots.length === 0) return

    // Stagger dots in after card enters
    const timer = setTimeout(() => {
      try {
        cascade(dots, { y: 0, opacity: 1 }, 'snappy', 0.05)
      } catch {
        dots.forEach(dot => { dot.style.opacity = '1' })
      }
    }, 400)

    // Safety net
    const fallback = setTimeout(() => {
      dots.forEach(dot => {
        if (getComputedStyle(dot).opacity === '0') {
          dot.style.opacity = '1'
        }
      })
    }, 1000)

    return () => { clearTimeout(timer); clearTimeout(fallback) }
  }, [])

  const handleMouseEnter = () => {
    if (!canHover()) return
    setIsHovered(true)
    const card = cardRef.current
    if (card) spring(card, { scale: 1.02, y: -4 }, 'snappy')

    // Scatter dots outward
    dotRefs.current.filter(Boolean).forEach((dot, i) => {
      const angle = (i / 6) * Math.PI * 2
      const distance = 8
      spring(dot, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        scale: 1.2,
      }, 'bouncy')
    })
  }

  const handleMouseLeave = () => {
    if (!canHover()) return
    setIsHovered(false)
    const card = cardRef.current
    if (card) spring(card, { scale: 1, y: 0 }, 'snappy')

    // Return dots
    dotRefs.current.filter(Boolean).forEach(dot => {
      spring(dot, { x: 0, y: 0, scale: 1 }, 'snappy')
    })
  }

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center w-full aspect-square max-w-[340px] sm:max-w-[380px] mx-auto lg:mx-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main interactive card */}
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

      {/* Orbiting dots */}
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
        setTimeout(() => {
          try {
            enter(pill, { y: 8, opacity: 0 }, 'snappy')
          } catch {
            pill.style.opacity = '1'
            pill.style.transform = 'none'
          }
        }, i * 60)
      })
    }, 300)

    // Safety net
    const fallback = setTimeout(() => {
      pills.forEach(pill => {
        if (getComputedStyle(pill).opacity === '0') {
          pill.style.opacity = '1'
          pill.style.transform = 'none'
        }
      })
    }, 800)

    return () => { clearTimeout(timer); clearTimeout(fallback) }
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

          {/* Left: Copy */}
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04] mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/60" />
              <span className="text-[11px] font-mono text-white/40">v0.1.0</span>
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

          {/* Right: Interactive demo */}
          <div className="flex items-center justify-center lg:justify-end">
            <SpringDemo />
          </div>

        </div>
      </div>
    </div>
  )
}
