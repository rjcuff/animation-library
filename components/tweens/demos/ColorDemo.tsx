'use client'
import { useRef } from 'react'
import { animate } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `animate(el, { backgroundColor: '#8b5cf6' }, {
  duration: 0.25,
  ease: 'easeOut',
})`

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

export function ColorDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const idx = useRef(0)
  const run = () => {
    if (!ref.current) return
    idx.current = (idx.current + 1) % COLORS.length
    animate(ref.current, { backgroundColor: COLORS[idx.current] }, { duration: 0.25, ease: 'easeOut' })
  }
  return (
    <DemoCard code={CODE} onAnimate={run}>
      <div ref={ref} className="w-24 h-24 rounded-2xl" style={{ backgroundColor: '#3b82f6' }} />
    </DemoCard>
  )
}
