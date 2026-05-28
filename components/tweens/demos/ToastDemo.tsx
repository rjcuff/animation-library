'use client'
import { useRef } from 'react'
import { enter, spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Enter from below
enter(el, { y: 20, opacity: 0 }, 'snappy')

// Exit upward
spring(el, { y: -12, opacity: 0 }, 'snappy')`

export function ToastDemo() {
  const toastRef = useRef<HTMLDivElement>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const animate = () => {
    const el = toastRef.current
    if (!el) return
    if (timerRef.current) clearTimeout(timerRef.current)

    snap(el, { y: 20, opacity: 0 })
    requestAnimationFrame(() => {
      enter(el, { y: 20, opacity: 0 }, 'snappy')
      timerRef.current = setTimeout(() => {
        spring(el, { y: -12, opacity: 0 }, 'snappy')
      }, 2000)
    })
  }

  return (
    <DemoCard
      title="Toast notification"
      description="Slide in with enter, dismiss with spring"
      code={CODE}
      onAnimate={animate}
    >
      <div
        ref={toastRef}
        style={{ opacity: 0 }}
        className="flex items-start gap-3 w-52 px-4 py-3 rounded-xl border border-white/[0.08] bg-[#1a1a1a]"
      >
        <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-500/80 shrink-0 flex items-center justify-center">
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-white/70">Saved</p>
          <p className="text-xs text-white/30 mt-0.5">Changes applied</p>
        </div>
      </div>
    </DemoCard>
  )
}
