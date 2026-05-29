'use client'

import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { spring, enter, cascade, sequence, snap, animate } from '@tweens/tweens'
import { Check, Copy } from 'lucide-react'

// ─── Shared ──────────────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center justify-center w-7 h-7 rounded-lg text-white/20 hover:text-white/50 hover:bg-white/[0.05] transition-colors flex-shrink-0"
      aria-label="Copy code"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
    </button>
  )
}

interface ShowcaseCardProps {
  name: string
  description: string
  code: string
  onAnimate?: () => void
  hint?: string
  actionLabel?: string
  children: React.ReactNode
}

function ShowcaseCard({
  name,
  description,
  code,
  onAnimate,
  hint,
  actionLabel = 'Animate',
  children,
}: ShowcaseCardProps) {
  return (
    <div>
      <div className="rounded-2xl border border-white/[0.06] bg-[#0d0d0d] overflow-hidden">
        {/* Preview */}
        <div className="relative h-[200px] flex items-center justify-center">
          {children}
        </div>
        {/* Action */}
        <div className="flex justify-center py-3.5 border-t border-white/[0.04]">
          {onAnimate ? (
            <button
              onClick={onAnimate}
              className="px-5 py-1.5 rounded-full bg-[#161616] border border-white/[0.07] text-[11px] font-medium text-white/45 hover:text-white/70 hover:border-white/[0.12] transition-colors"
            >
              {actionLabel}
            </button>
          ) : (
            <span className="text-[10px] font-mono text-white/20">{hint}</span>
          )}
        </div>
      </div>
      {/* Meta */}
      <div className="flex items-start justify-between mt-3 px-0.5">
        <div>
          <p className="text-sm font-medium text-white/65 leading-tight">{name}</p>
          <p className="text-[11px] text-white/25 mt-0.5 leading-snug">{description}</p>
        </div>
        <CopyButton code={code} />
      </div>
    </div>
  )
}

// ─── Demos ───────────────────────────────────────────────────────────────────

function ButtonPressDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const press = () => spring(ref.current!, { scale: 0.95 }, 'stiff')
  const release = () => spring(ref.current!, { scale: 1 }, 'snappy')
  return (
    <ShowcaseCard
      name="Press feedback"
      description="Tactile spring compression on press"
      code={`spring(el, { scale: 0.95 }, 'stiff')\nspring(el, { scale: 1 }, 'snappy')`}
      onAnimate={() => { press(); setTimeout(release, 120) }}
      actionLabel="Press"
    >
      <div
        ref={ref}
        onMouseDown={press}
        onMouseUp={release}
        onMouseLeave={release}
        onTouchStart={press}
        onTouchEnd={release}
        className="px-7 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08] cursor-pointer select-none"
      >
        <span className="text-sm font-medium text-white/50 tracking-tight">Press me</span>
      </div>
    </ShowcaseCard>
  )
}

function HoverLiftDemo() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <ShowcaseCard
      name="Hover lift"
      description="Card rises with spring physics"
      code={`spring(el, { y: -4, scale: 1.03 }, 'snappy')\nspring(el, { y:  0, scale: 1    }, 'snappy')`}
      hint="hover the card"
    >
      <div
        ref={ref}
        onMouseEnter={() => spring(ref.current!, { y: -4, scale: 1.03 }, 'snappy')}
        onMouseLeave={() => spring(ref.current!, { y: 0, scale: 1 }, 'snappy')}
        className="w-36 rounded-xl bg-[#111] border border-white/[0.09] p-4 cursor-pointer"
      >
        <div className="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/[0.07] mb-3 flex items-center justify-center">
          <div className="w-2.5 h-px bg-white/25 rounded-full" />
        </div>
        <p className="text-xs font-medium text-white/55 mb-1 tracking-tight">Card title</p>
        <p className="text-[10px] text-white/20 font-mono">spring physics</p>
      </div>
    </ShowcaseCard>
  )
}

function StaggerDemo() {
  const refs = useRef<HTMLDivElement[]>([])
  const colors = ['bg-violet-400/50', 'bg-blue-400/50', 'bg-emerald-400/50', 'bg-amber-400/50', 'bg-rose-400/50']
  const run = () => {
    const els = refs.current.filter(Boolean)
    els.forEach(el => snap(el, { y: 10, opacity: 0, scale: 0.9 }))
    requestAnimationFrame(() => cascade(els, { y: 0, opacity: 1, scale: 1 }, 'snappy', 0.06))
  }
  return (
    <ShowcaseCard
      name="Stagger"
      description="Elements enter with cascading offset"
      code={`snap(els, { y: 10, opacity: 0, scale: 0.9 })\ncascade(els, { y: 0, opacity: 1, scale: 1 }, 'snappy', 0.06)`}
      onAnimate={run}
    >
      <div className="flex gap-2.5">
        {colors.map((c, i) => (
          <div
            key={i}
            ref={el => { if (el) refs.current[i] = el }}
            className={`w-10 h-10 rounded-full ${c} border border-white/[0.08]`}
          />
        ))}
      </div>
    </ShowcaseCard>
  )
}

function ToastDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const run = () => {
    const el = ref.current!
    snap(el, { y: 14, opacity: 0, scale: 0.95 })
    requestAnimationFrame(() => {
      spring(el, { y: 0, opacity: 1, scale: 1 }, 'snappy')
      setTimeout(() => spring(el, { y: 14, opacity: 0, scale: 0.95 }, 'snappy'), 2200)
    })
  }
  return (
    <ShowcaseCard
      name="Toast notification"
      description="Enter from below, exit back down"
      code={`enter(el, { y: 14, opacity: 0, scale: 0.95 }, 'snappy')`}
      onAnimate={run}
      actionLabel="Show"
    >
      <div
        ref={ref}
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-[#161616] border border-white/[0.09] shadow-xl shadow-black/50"
        style={{ opacity: 0 }}
      >
        <div className="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4l1.8 1.8L6.5 2.5" stroke="#10b981" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-xs font-medium text-white/55 whitespace-nowrap">Changes saved</span>
      </div>
    </ShowcaseCard>
  )
}

function InterruptDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const dir = useRef(1)
  const run = () => {
    dir.current *= -1
    spring(ref.current!, { x: dir.current * 65 }, 'bouncy')
  }
  return (
    <ShowcaseCard
      name="Interruptible"
      description="Velocity carries through mid-animation"
      code={`// Call again while animating — velocity carries\nspring(el, { x: dir * 65 }, 'bouncy')`}
      onAnimate={run}
      actionLabel="Play"
    >
      <div ref={ref} className="w-14 h-14 rounded-xl bg-white/[0.07] border border-white/[0.1]" />
    </ShowcaseCard>
  )
}

function ColorDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const idx = useRef(0)
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']
  const run = () => {
    if (!ref.current) return
    idx.current = (idx.current + 1) % COLORS.length
    animate(ref.current, { backgroundColor: COLORS[idx.current] }, { duration: 0.3, ease: 'easeOutCubic' })
  }
  return (
    <ShowcaseCard
      name="Color morph"
      description="Smooth background transition"
      code={`animate(el, { backgroundColor: '#8b5cf6' }, {\n  duration: 0.3, ease: 'easeOutCubic',\n})`}
      onAnimate={run}
      actionLabel="Morph"
    >
      <div
        ref={ref}
        className="w-20 h-20 rounded-2xl"
        style={{ backgroundColor: '#3b82f6' }}
      />
    </ShowcaseCard>
  )
}

function MagneticDemo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect()
    spring(ref.current!, {
      x: (e.clientX - r.left - r.width / 2) * 0.4,
      y: (e.clientY - r.top - r.height / 2) * 0.4,
    }, 'snappy')
  }
  return (
    <ShowcaseCard
      name="Magnetic follow"
      description="Spring cursor tracking"
      code={`const dx = (e.clientX - cx) * 0.4\nconst dy = (e.clientY - cy) * 0.4\nspring(el, { x: dx, y: dy }, 'snappy')`}
      hint="move cursor over"
    >
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => spring(ref.current!, { x: 0, y: 0 }, 'gentle')}
        className="absolute inset-0 flex items-center justify-center cursor-none"
      >
        <div ref={ref} className="w-14 h-14 rounded-full bg-white/[0.07] border border-white/[0.1] pointer-events-none" />
      </div>
    </ShowcaseCard>
  )
}

function RotateDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const val = useRef(0)
  const run = () => {
    val.current += 90
    spring(ref.current!, { rotate: val.current }, 'bouncy')
  }
  return (
    <ShowcaseCard
      name="Spring rotate"
      description="Physics-based rotation with bounce"
      code={`spring(el, { rotate: 90 }, 'bouncy')`}
      onAnimate={run}
      actionLabel="Rotate"
    >
      <div ref={ref} className="w-14 h-14 rounded-xl bg-white/[0.07] border border-white/[0.1] flex items-center justify-center">
        <div className="w-6 h-px bg-white/35 rounded-full" />
      </div>
    </ShowcaseCard>
  )
}

function SequenceDemo() {
  const refs = useRef<HTMLDivElement[]>([])
  const items = ['Header', 'Body text', 'Call to action']
  const run = async () => {
    const els = refs.current.filter(Boolean)
    els.forEach(el => snap(el, { x: -16, opacity: 0 }))
    await sequence(els.map(el => () => spring(el, { x: 0, opacity: 1 }, 'gentle')))
  }
  return (
    <ShowcaseCard
      name="Sequence"
      description="Serial animations, one settles before the next"
      code={`await sequence([\n  () => spring(a, { x: 0, opacity: 1 }, 'gentle'),\n  () => spring(b, { x: 0, opacity: 1 }, 'gentle'),\n])`}
      onAnimate={run}
      actionLabel="Play"
    >
      <div className="flex flex-col gap-2.5 w-44">
        {items.map((label, i) => (
          <div
            key={i}
            ref={el => { if (el) refs.current[i] = el }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"
          >
            <div className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
            <span className="text-[11px] text-white/35 font-mono">{label}</span>
          </div>
        ))}
      </div>
    </ShowcaseCard>
  )
}

// ─── Nav ─────────────────────────────────────────────────────────────────────

function ShowcaseNav() {
  return (
    <div className="flex justify-end items-center gap-2 px-6 pt-5 pb-2">
      <Link
        href="/docs"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[11px] font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
      >
        Docs
      </Link>
      <a
        href="https://github.com/rjcuff/tweens"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.07] text-[11px] font-medium text-white/40 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
        </svg>
        GitHub
      </a>
      <a
        href="https://x.com/rcuffdev"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.07] text-white/35 hover:text-white/65 hover:bg-white/[0.07] transition-colors"
        aria-label="@rcuffdev on X"
      >
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.261 5.632L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
        </svg>
      </a>
    </div>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

function ShowcaseHeader() {
  return (
    <div className="flex flex-col items-center text-center pt-10 pb-12">
      <div className="w-12 h-12 rounded-xl bg-[#111] border border-white/[0.08] flex items-center justify-center mb-4">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2 10 C2 5, 7 5, 10 10 C13 15, 18 15, 18 10"
            stroke="rgba(255,255,255,0.6)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-white/85 tracking-tight mb-2">tweens</h1>
      <p className="text-sm text-white/35 max-w-xs leading-relaxed">
        Spring animations for the DOM. Built with physics, not timers.
      </p>
    </div>
  )
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

const DEMOS = [
  ButtonPressDemo,
  HoverLiftDemo,
  StaggerDemo,
  ToastDemo,
  InterruptDemo,
  ColorDemo,
  MagneticDemo,
  RotateDemo,
  SequenceDemo,
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomeShowcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ShowcaseNav />
      <main className="max-w-[1000px] mx-auto px-6">
        <ShowcaseHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-20">
          {DEMOS.map((Demo, i) => (
            <Demo key={i} />
          ))}
        </div>
      </main>
    </div>
  )
}
