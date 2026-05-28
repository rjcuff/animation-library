'use client'
import { useRef } from 'react'
import { cascade, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `cascade(els, { y: 0, opacity: 1 }, 'snappy', 0.07)`

const AVATARS = [
  'from-violet-400/40 to-purple-600/20',
  'from-blue-400/40 to-cyan-600/20',
  'from-emerald-400/40 to-teal-600/20',
  'from-amber-400/40 to-orange-600/20',
  'from-pink-400/40 to-rose-600/20',
]

export function CascadeDemo() {
  const refs = useRef<HTMLDivElement[]>([])
  const animate = () => {
    const els = refs.current.filter(Boolean)
    els.forEach(el => snap(el, { y: 20, opacity: 0 }))
    requestAnimationFrame(() => cascade(els, { y: 0, opacity: 1 }, 'snappy', 0.07))
  }
  return (
    <DemoCard code={CODE} onAnimate={animate}>
      <div className="flex gap-3">
        {AVATARS.map((gradient, i) => (
          <div
            key={i}
            ref={el => { if (el) refs.current[i] = el }}
            className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} border border-white/[0.08]`}
          />
        ))}
      </div>
    </DemoCard>
  )
}
