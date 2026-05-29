'use client'
import { useRef } from 'react'
import { animate, snap } from '@tweens/tweens'
import { RotateCcw } from 'lucide-react'

function AnimBox({
  color,
  label,
  onPlay,
  demoRef,
}: {
  color: string
  label: string
  onPlay: () => void
  demoRef: React.RefObject<HTMLDivElement | null>
}) {
  return (
    <div className="not-prose flex-1">
      <div className="relative rounded-xl border border-white/[0.07] bg-[#0d0d0d] h-[220px] flex items-center justify-center overflow-hidden">
        <div ref={demoRef} className={`w-16 h-16 rounded-2xl ${color}`} />
        <button
          onClick={onPlay}
          className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
          aria-label="Replay"
        >
          <RotateCcw size={13} />
        </button>
      </div>
      <p className="mt-2 text-[11px] font-mono text-white/35">{label}</p>
    </div>
  )
}

export function AnimateDemo() {
  const springRef = useRef<HTMLDivElement>(null)
  const easingRef = useRef<HTMLDivElement>(null)

  const playSpring = async () => {
    const el = springRef.current
    if (!el) return
    snap(el, { x: -56 })
    await animate(el, { x: 56 }, 'snappy')
    // return home so the demo resets cleanly
    setTimeout(() => animate(el, { x: 0 }, { duration: 0.5, bounce: 0 }), 400)
  }

  const playEasing = async () => {
    const el = easingRef.current
    if (!el) return
    snap(el, { x: -56 })
    await animate(el, { x: 56 }, { duration: 0.35, ease: 'easeOutExpo' })
    setTimeout(() => animate(el, { x: 0 }, { duration: 0.5, ease: 'easeInOutCubic' }), 400)
  }

  return (
    <div className="not-prose my-8 flex flex-col sm:flex-row gap-4">
      <AnimBox
        color="bg-violet-400/70"
        label="spring 'snappy'"
        onPlay={playSpring}
        demoRef={springRef}
      />
      <AnimBox
        color="bg-blue-400/70"
        label="easeOutExpo 350ms"
        onPlay={playEasing}
        demoRef={easingRef}
      />
    </div>
  )
}
