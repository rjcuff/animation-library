'use client'

import { useRef, useState } from 'react'
import Link from 'next/link'
import { spring, enter, cascade, sequence, snap, animate } from '@tweens/tweens'
import { Check, Copy } from 'lucide-react'

const canHover = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: hover) and (pointer: fine)').matches

// ─── Copy Button ──────────────────────────────────────────────────────────────

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
      {copied ? <Check size={11} /> : <Copy size={11} />}
    </button>
  )
}

// ─── Showcase Card ────────────────────────────────────────────────────────────

interface ShowcaseCardProps {
  name: string
  description: string
  code: string
  onAnimate?: () => void
  hint?: string
  actionLabel?: string
  disableTilt?: boolean
  children: React.ReactNode
}

function ShowcaseCard({
  name,
  description,
  code,
  onAnimate,
  hint,
  actionLabel = 'Animate',
  disableTilt = false,
  children,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  const tilt = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover() || disableTilt) return
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = ((e.clientY - r.top) / r.height - 0.5) * -5
    const y = ((e.clientX - r.left) / r.width - 0.5) * 5
    el.style.transform = `perspective(700px) rotateX(${x}deg) rotateY(${y}deg) scale(1.01)`
  }

  const flat = () => {
    const el = cardRef.current
    if (!el) return
    el.style.transition = 'transform 0.45s cubic-bezier(0.215, 0.61, 0.355, 1)'
    el.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)'
    setTimeout(() => { if (el) el.style.transition = '' }, 450)
  }

  return (
    <div>
      <div
        ref={cardRef}
        onMouseMove={tilt}
        onMouseLeave={flat}
        style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        className="rounded-2xl border border-white/[0.07] bg-[#141414] overflow-hidden shadow-xl shadow-black/30"
      >
        {/* Preview */}
        <div
          className="relative h-[220px] flex items-center justify-center overflow-hidden"
          style={{ background: 'radial-gradient(ellipse at 50% 60%, #1c1c1c 0%, #0d0d0d 100%)' }}
        >
          {/* Subtle top highlight */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          {children}
        </div>

        {/* Action bar */}
        <div className="flex justify-center py-3 border-t border-white/[0.05] bg-[#141414]">
          {onAnimate ? (
            <button
              onClick={onAnimate}
              className="px-5 py-1.5 rounded-full bg-[#1e1e1e] border border-white/[0.08] text-[11px] font-medium text-white/40 hover:text-white/70 hover:border-white/[0.14] hover:bg-[#222] transition-all"
            >
              {actionLabel}
            </button>
          ) : (
            <span className="text-[10px] font-mono text-white/18 tracking-wide">{hint}</span>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="flex items-start justify-between mt-3 px-0.5">
        <div>
          <p className="text-[13px] font-medium text-white/65 leading-tight">{name}</p>
          <p className="text-[11px] text-white/25 mt-0.5 leading-snug">{description}</p>
        </div>
        <CopyButton code={code} />
      </div>
    </div>
  )
}

// ─── Demo 1: Button Press ─────────────────────────────────────────────────────

function ButtonPressDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const press = () => spring(ref.current!, { scale: 0.93 }, 'stiff')
  const release = () => spring(ref.current!, { scale: 1 }, 'snappy')

  return (
    <ShowcaseCard
      name="Press feedback"
      description="Instant compress, spring release"
      code={`spring(el, { scale: 0.93 }, 'stiff')\nspring(el, { scale: 1 }, 'snappy')`}
      onAnimate={() => { press(); setTimeout(release, 130) }}
      actionLabel="Press"
    >
      <div
        ref={ref}
        onMouseDown={press}
        onMouseUp={release}
        onMouseLeave={release}
        onTouchStart={press}
        onTouchEnd={release}
        className="group flex items-center gap-2.5 px-6 py-3 rounded-xl bg-white text-[#0a0a0a] cursor-pointer select-none"
      >
        <span className="text-sm font-semibold tracking-tight">Confirm order</span>
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 2: Number Pop-in ────────────────────────────────────────────────────

function NumberPopIn() {
  const numRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)

  const run = () => {
    const num = numRef.current
    const label = labelRef.current
    if (!num || !label) return
    snap(num, { y: 24, opacity: 0, scale: 0.7 })
    snap(label, { y: 10, opacity: 0 })
    requestAnimationFrame(() => {
      enter(num, { y: 24, opacity: 0, scale: 0.7 }, 'snappy')
      setTimeout(() => enter(label, { y: 10, opacity: 0 }, 'gentle'), 120)
    })
  }

  return (
    <ShowcaseCard
      name="Number pop-in"
      description="Spring entrance with staggered label"
      code={`snap(el, { y: 24, opacity: 0, scale: 0.7 })\nenter(el, { y: 24, opacity: 0, scale: 0.7 }, 'snappy')`}
      onAnimate={run}
    >
      <div className="text-center">
        <div ref={numRef} className="text-5xl font-bold text-white/90 tracking-tight tabular-nums">
          2,847
        </div>
        <div ref={labelRef} className="text-xs text-white/25 font-mono mt-2 tracking-wide uppercase">
          active users
        </div>
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 3: Notification Badge ───────────────────────────────────────────────

function NotificationBadge() {
  const badgeRef = useRef<HTMLDivElement>(null)
  const count = useRef(0)
  const [display, setDisplay] = useState(3)

  const run = () => {
    const badge = badgeRef.current
    if (!badge) return
    count.current = (count.current % 9) + 1
    setDisplay(count.current)
    snap(badge, { scale: 0, rotate: -20, opacity: 0 })
    requestAnimationFrame(() =>
      spring(badge, { scale: 1, rotate: 0, opacity: 1 }, { duration: 0.45, bounce: 0.35 })
    )
  }

  return (
    <ShowcaseCard
      name="Notification badge"
      description="Spring pop-in with rotation"
      code={`spring(badge, { scale: 1, rotate: 0 }, {\n  duration: 0.45, bounce: 0.35,\n})`}
      onAnimate={run}
      actionLabel="Notify"
    >
      <div className="relative">
        {/* Bell */}
        <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.8" strokeLinecap="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
        </div>
        {/* Badge */}
        <div
          ref={badgeRef}
          className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 rounded-full bg-red-500 flex items-center justify-center px-1.5"
        >
          <span className="text-[10px] font-bold text-white leading-none">{display}</span>
        </div>
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 4: Text Swap ────────────────────────────────────────────────────────

const TEXT_STATES = ['Save changes', 'Saving…', 'Saved']

function TextSwapDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const idx = useRef(0)
  const [label, setLabel] = useState(TEXT_STATES[0])

  const run = async () => {
    const el = ref.current
    if (!el) return
    // Blur out
    await animate(el, { opacity: 0, blur: 5, y: -6, scale: 0.95 }, { duration: 0.15, ease: 'easeIn' })
    // Swap text
    idx.current = (idx.current + 1) % TEXT_STATES.length
    setLabel(TEXT_STATES[idx.current])
    // Snap to below, blur in
    snap(el, { y: 8, blur: 5, scale: 0.95 })
    animate(el, { opacity: 1, blur: 0, y: 0, scale: 1 }, { duration: 0.22, ease: 'easeOutCubic' })
  }

  return (
    <ShowcaseCard
      name="Text swap"
      description="Blur and translate between states"
      code={`await animate(el, { opacity: 0, blur: 5 }, { duration: 0.15 })\nsetLabel(nextState)\nsnap(el, { blur: 5, y: 8 })\nanimate(el, { opacity: 1, blur: 0, y: 0 }, { duration: 0.22 })`}
      onAnimate={run}
    >
      <div className="px-6 py-3 rounded-xl bg-white/[0.06] border border-white/[0.08]">
        <div ref={ref} className="text-sm font-medium text-white/65 whitespace-nowrap tabular-nums">
          {label}
        </div>
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 5: Menu Dropdown ────────────────────────────────────────────────────

const MENU_ITEMS = ['Edit', 'Duplicate', 'Archive', 'Delete']

function MenuDropdown() {
  const itemRefs = useRef<HTMLDivElement[]>([])
  const [open, setOpen] = useState(false)

  const toggle = () => {
    const els = itemRefs.current.filter(Boolean)
    if (!open) {
      setOpen(true)
      els.forEach(el => snap(el, { y: -8, opacity: 0, scale: 0.92 }))
      requestAnimationFrame(() => cascade(els, { y: 0, opacity: 1, scale: 1 }, 'snappy', 0.04))
    } else {
      // Stagger out (reversed)
      Promise.all(
        [...els].reverse().map((el, i) =>
          new Promise<void>(res => setTimeout(async () => {
            await animate(el, { y: -6, opacity: 0, scale: 0.94 }, { duration: 0.12, ease: 'easeIn' })
            res()
          }, i * 30))
        )
      ).then(() => setOpen(false))
    }
  }

  return (
    <ShowcaseCard
      name="Menu dropdown"
      description="Stagger open from origin"
      code={`cascade(items, { y: 0, opacity: 1, scale: 1 }, 'snappy', 0.04)`}
      onAnimate={toggle}
      actionLabel={open ? 'Close' : 'Open'}
    >
      <div className="relative flex flex-col items-center">
        {/* Trigger */}
        <div className="px-4 py-2 rounded-lg bg-white/[0.07] border border-white/[0.09] text-sm font-medium text-white/55 mb-2">
          Options
        </div>
        {/* Items */}
        {open && (
          <div className="flex flex-col gap-1 w-32">
            {MENU_ITEMS.map((item, i) => (
              <div
                key={item}
                ref={el => { if (el) itemRefs.current[i] = el }}
                className="px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.07] text-xs text-white/45 cursor-pointer hover:bg-white/[0.08] hover:text-white/65 transition-colors"
              >
                {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 6: Avatar Group Hover ───────────────────────────────────────────────

const AVATARS = [
  { color: '#a78bfa', letter: 'A' },
  { color: '#60a5fa', letter: 'B' },
  { color: '#34d399', letter: 'C' },
  { color: '#fbbf24', letter: 'D' },
  { color: '#f87171', letter: 'E' },
]

function AvatarGroupDemo() {
  const refs = useRef<HTMLDivElement[]>([])

  const onHover = (idx: number) => {
    if (!canHover()) return
    refs.current.filter(Boolean).forEach((el, i) => {
      const dist = Math.abs(i - idx)
      const lift = Math.max(0, 14 - dist * 6)
      const scale = 1 + lift * 0.006
      spring(el, { y: -lift, scale }, 'bouncy')
    })
  }

  const onLeave = () => {
    refs.current.filter(Boolean).forEach(el => spring(el, { y: 0, scale: 1 }, 'snappy'))
  }

  return (
    <ShowcaseCard
      name="Avatar group hover"
      description="Distance-falloff lift with bouncy return"
      code={`const lift = Math.max(0, 14 - distance * 6)\nspring(el, { y: -lift, scale: 1 + lift * 0.006 }, 'bouncy')`}
      hint="hover the avatars"
    >
      <div className="flex gap-2" onMouseLeave={onLeave}>
        {AVATARS.map(({ color, letter }, i) => (
          <div
            key={letter}
            ref={el => { if (el) refs.current[i] = el }}
            onMouseEnter={() => onHover(i)}
            className="w-11 h-11 rounded-full flex items-center justify-center text-xs font-semibold text-white/80 cursor-pointer select-none border border-white/[0.1]"
            style={{ backgroundColor: color + '33', borderColor: color + '55' }}
          >
            {letter}
          </div>
        ))}
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 7: Success State ────────────────────────────────────────────────────

function SuccessStateDemo() {
  const btnRef = useRef<HTMLDivElement>(null)
  const checkRef = useRef<HTMLDivElement>(null)
  const labelRef = useRef<HTMLSpanElement>(null)
  const [done, setDone] = useState(false)

  const run = async () => {
    if (done) {
      // Reset
      const btn = btnRef.current!
      await animate(btn, { scale: 0.9, opacity: 0 }, { duration: 0.15, ease: 'easeIn' })
      setDone(false)
      snap(btn, { scale: 0.9 })
      animate(btn, { scale: 1, opacity: 1 }, { duration: 0.2, ease: 'easeOutCubic' })
      return
    }
    setDone(true)
    const check = checkRef.current!
    snap(check, { scale: 0, rotate: -45, opacity: 0, blur: 8 })
    requestAnimationFrame(() =>
      spring(check, { scale: 1, rotate: 0, opacity: 1, blur: 0 }, { duration: 0.5, bounce: 0.25 })
    )
  }

  return (
    <ShowcaseCard
      name="Success state"
      description="Checkmark springs in with blur and rotation"
      code={`spring(check, { scale: 1, rotate: 0, opacity: 1, blur: 0 }, {\n  duration: 0.5, bounce: 0.25,\n})`}
      onAnimate={run}
      actionLabel={done ? 'Reset' : 'Submit'}
    >
      <div
        ref={btnRef}
        className="flex items-center gap-2.5 px-6 py-3 rounded-xl border transition-colors"
        style={{
          backgroundColor: done ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.06)',
          borderColor: done ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255,255,255,0.08)',
        }}
      >
        {done ? (
          <div ref={checkRef} className="flex items-center gap-2">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.5 7l3 3 6-6" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm font-medium text-emerald-400">Complete</span>
          </div>
        ) : (
          <span ref={labelRef} className="text-sm font-medium text-white/55">Submit form</span>
        )}
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 8: Error Shake ──────────────────────────────────────────────────────

function ErrorShakeDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const shaking = useRef(false)

  const run = async () => {
    if (shaking.current) return
    shaking.current = true
    const el = ref.current!
    await sequence([
      () => spring(el, { x: -8 }, 'stiff'),
      () => spring(el, { x:  8 }, 'stiff'),
      () => spring(el, { x: -6 }, 'stiff'),
      () => spring(el, { x:  6 }, 'stiff'),
      () => spring(el, { x: -3 }, 'stiff'),
      () => spring(el, { x:  0 }, 'snappy'),
    ])
    shaking.current = false
  }

  return (
    <ShowcaseCard
      name="Error shake"
      description="Spring-sequenced shake on invalid input"
      code={`await sequence([\n  () => spring(el, { x: -8 }, 'stiff'),\n  () => spring(el, { x:  8 }, 'stiff'),\n  () => spring(el, { x:  0 }, 'snappy'),\n])`}
      onAnimate={run}
      actionLabel="Trigger"
    >
      <div
        ref={ref}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/[0.07] border border-red-500/20 w-52"
      >
        <div className="w-4 h-4 rounded-full border border-red-400/40 flex items-center justify-center flex-shrink-0">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400/60" />
        </div>
        <div>
          <p className="text-xs font-medium text-red-400/70">Invalid input</p>
          <p className="text-[10px] text-red-400/40 mt-0.5">Check your entry</p>
        </div>
      </div>
    </ShowcaseCard>
  )
}

// ─── Demo 9: Magnetic Follow ──────────────────────────────────────────────────
// disableTilt — the card itself doesn't tilt since the inner element tracks cursor

function MagneticFollowDemo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const pendingRaf = useRef(0)

  const onMove = (e: React.MouseEvent) => {
    if (!canHover()) return
    const { clientX, clientY } = e
    cancelAnimationFrame(pendingRaf.current)
    pendingRaf.current = requestAnimationFrame(() => {
      if (!wrapRef.current || !ref.current) return
      const r = wrapRef.current.getBoundingClientRect()
      spring(ref.current, {
        x: (clientX - r.left - r.width / 2) * 0.38,
        y: (clientY - r.top - r.height / 2) * 0.38,
      }, 'snappy')
    })
  }

  return (
    <ShowcaseCard
      name="Magnetic follow"
      description="Spring cursor tracking, one RAF per frame"
      code={`cancelAnimationFrame(raf)\nraf = requestAnimationFrame(() =>\n  spring(el, { x: dx, y: dy }, 'snappy')\n)`}
      hint="move cursor over"
      disableTilt
    >
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => spring(ref.current!, { x: 0, y: 0 }, 'gentle')}
        className="absolute inset-0 flex items-center justify-center cursor-none"
      >
        <div ref={ref} className="w-14 h-14 rounded-full bg-white/[0.08] border border-white/[0.12] pointer-events-none flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white/30" />
        </div>
      </div>
    </ShowcaseCard>
  )
}

// ─── Nav ──────────────────────────────────────────────────────────────────────

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
    <div className="flex flex-col items-center text-center pt-8 pb-12">
      <div className="w-11 h-11 rounded-xl bg-[#161616] border border-white/[0.08] flex items-center justify-center mb-4 shadow-lg shadow-black/40">
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path
            d="M2 10 C2 5, 7 5, 10 10 C13 15, 18 15, 18 10"
            stroke="rgba(255,255,255,0.55)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-semibold text-white/85 tracking-tight mb-2">tweens</h1>
      <p className="text-sm text-white/30 max-w-[260px] leading-relaxed">
        Spring animations for the DOM. Physics, not timers.
      </p>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export function HomeShowcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <ShowcaseNav />
      <main className="max-w-[1000px] mx-auto px-5">
        <ShowcaseHeader />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-20">
          <ButtonPressDemo />
          <NumberPopIn />
          <NotificationBadge />
          <TextSwapDemo />
          <MenuDropdown />
          <AvatarGroupDemo />
          <SuccessStateDemo />
          <ErrorShakeDemo />
          <MagneticFollowDemo />
        </div>
      </main>
    </div>
  )
}
