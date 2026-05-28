'use client'
import { useRef } from 'react'
import { animate, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Spring — physics-based, no fixed duration
animate(el, { x: 60 }, 'bouncy')

// Easing — fixed duration + curve
animate(el, { x: 60 }, { duration: 0.4, ease: 'easeOutBack' })`

export function AnimateDemo() {
  const springRef = useRef<HTMLDivElement>(null)
  const easingRef = useRef<HTMLDivElement>(null)

  const runAnimate = () => {
    if (springRef.current) {
      snap(springRef.current, { x: -48 })
      setTimeout(() => animate(springRef.current!, { x: 48 }, 'bouncy'), 30)
    }
    if (easingRef.current) {
      snap(easingRef.current, { x: -48 })
      setTimeout(() => animate(easingRef.current!, { x: 48 }, { duration: 0.5, ease: 'easeOutBack' }), 30)
    }
  }

  return (
    <DemoCard
      title="animate()"
      description="Spring mode vs easing mode — same function, different feel"
      code={CODE}
      onAnimate={runAnimate}
    >
      <div className="flex flex-col gap-5 w-48">
        <div className="flex items-center gap-3">
          <div
            ref={springRef}
            className="w-3 h-3 rounded-full bg-violet-400 shrink-0"
          />
          <span className="text-xs font-mono text-white/25">spring</span>
        </div>
        <div className="flex items-center gap-3">
          <div
            ref={easingRef}
            className="w-3 h-3 rounded-full bg-blue-400 shrink-0"
          />
          <span className="text-xs font-mono text-white/25">easeOutBack</span>
        </div>
      </div>
    </DemoCard>
  )
}
