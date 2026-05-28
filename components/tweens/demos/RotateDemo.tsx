'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { rotate: 180 }, 'bouncy')
spring(el, { rotate:   0 }, 'bouncy')`

export function RotateDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const val = useRef(0)
  const animate = () => {
    val.current = val.current === 0 ? 180 : 0
    if (ref.current) spring(ref.current, { rotate: val.current }, 'bouncy')
  }
  return (
    <DemoCard code={CODE} onAnimate={animate}>
      <div ref={ref} className="w-24 h-24 rounded-2xl bg-white/10 border border-white/[0.12] flex items-center justify-center">
        <div className="w-8 h-px bg-white/40 rounded-full" />
      </div>
    </DemoCard>
  )
}
