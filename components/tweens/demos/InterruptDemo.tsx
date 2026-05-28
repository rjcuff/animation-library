'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Call again mid-animation — velocity carries through
spring(el, { x:  80 }, 'bouncy')
spring(el, { x: -80 }, 'bouncy')`

export function InterruptDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const dir = useRef(1)
  const animate = () => {
    if (!ref.current) return
    dir.current *= -1
    spring(ref.current, { x: dir.current * 80 }, 'bouncy')
  }
  return (
    <DemoCard code={CODE} onAnimate={animate}>
      <div ref={ref} className="w-24 h-24 rounded-2xl bg-white/10 border border-white/[0.12]" />
    </DemoCard>
  )
}
