'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { scale: 0.88 }, 'stiff')
setTimeout(() => spring(el, { scale: 1 }, 'bouncy'), 100)`

export function ButtonPressDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const animate = () => {
    if (!ref.current) return
    spring(ref.current, { scale: 0.88 }, 'stiff')
    setTimeout(() => spring(ref.current!, { scale: 1 }, 'bouncy'), 100)
  }
  return (
    <DemoCard code={CODE} onAnimate={animate}>
      <div
        ref={ref}
        onClick={animate}
        className="px-8 py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.1] cursor-pointer select-none"
      >
        <span className="text-sm font-medium text-white/60 tracking-tight">Press me</span>
      </div>
    </DemoCard>
  )
}
