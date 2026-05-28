'use client'
import { useRef } from 'react'
import { animate } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Color animation — hex or rgb() strings
animate(el, { backgroundColor: '#3b82f6' }, {
  duration: 0.4,
  ease: 'easeInOut',
})`

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444']

export function ColorDemo() {
  const cardRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef(0)

  const runAnimate = () => {
    if (!cardRef.current) return
    indexRef.current = (indexRef.current + 1) % COLORS.length
    animate(cardRef.current, { backgroundColor: COLORS[indexRef.current] }, {
      duration: 0.5,
      ease: 'easeInOut',
    })
  }

  return (
    <DemoCard
      title="Color animation"
      description="Animate backgroundColor and color with easing"
      code={CODE}
      onAnimate={runAnimate}
    >
      <div
        ref={cardRef}
        className="w-24 h-24 rounded-2xl"
        style={{ backgroundColor: '#3b82f6' }}
      />
    </DemoCard>
  )
}
