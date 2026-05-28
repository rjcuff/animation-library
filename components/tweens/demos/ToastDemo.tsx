'use client'
import { useRef } from 'react'
import { enter, spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `enter(el, { y: 20, opacity: 0 }, 'snappy')
// after 1.8s:
spring(el, { y: -10, opacity: 0 }, 'snappy')`

export function ToastDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const animate = () => {
    const el = ref.current
    if (!el) return
    snap(el, { y: 20, opacity: 0 })
    requestAnimationFrame(() => {
      enter(el, { y: 20, opacity: 0 }, 'snappy')
      setTimeout(() => spring(el, { y: -10, opacity: 0 }, 'snappy'), 1800)
    })
  }
  return (
    <DemoCard code={CODE} onAnimate={animate}>
      <div
        ref={ref}
        style={{ opacity: 0 }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-[#111] border border-white/[0.1] shadow-xl shadow-black/40"
      >
        <div className="w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/35 flex items-center justify-center flex-shrink-0">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="#10b981" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <span className="text-sm font-medium text-white/65 whitespace-nowrap">Changes saved</span>
      </div>
    </DemoCard>
  )
}
