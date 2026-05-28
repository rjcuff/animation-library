'use client'
import { useRef } from 'react'
import { spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Springs carry velocity when interrupted —
// click again mid-animation to see
spring(el, { x: 80 }, 'bouncy')
spring(el, { x: -80 }, 'bouncy')`

export function InterruptDemo() {
  const ballRef = useRef<HTMLDivElement>(null)
  const dirRef = useRef(1)

  const animate = () => {
    if (!ballRef.current) return
    dirRef.current = dirRef.current * -1
    spring(ballRef.current, { x: dirRef.current * 72 }, 'bouncy')
  }

  const reset = () => {
    if (!ballRef.current) return
    snap(ballRef.current, { x: 0 })
    dirRef.current = 1
  }

  return (
    <DemoCard
      title="Interruptible"
      description="Click repeatedly — velocity carries through"
      code={CODE}
      onAnimate={animate}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          ref={ballRef}
          className="w-10 h-10 rounded-full bg-white/10 border border-white/15"
        />
        <button
          onClick={reset}
          className="text-xs text-white/20 hover:text-white/40 transition-colors"
        >
          reset
        </button>
      </div>
    </DemoCard>
  )
}
