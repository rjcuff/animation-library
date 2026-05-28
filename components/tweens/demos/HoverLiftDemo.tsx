'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { scale: 1.04, y: -8 }, 'snappy')
spring(el, { scale: 1, y: 0 }, 'snappy')`

export function HoverLiftDemo() {
  const cardRef = useRef<HTMLDivElement>(null)

  const animate = () => {
    if (!cardRef.current) return
    spring(cardRef.current, { scale: 1.04, y: -8 }, 'snappy')
    setTimeout(() => spring(cardRef.current!, { scale: 1, y: 0 }, 'gentle'), 600)
  }

  return (
    <DemoCard
      title="Hover lift"
      description="Scale and translate on hover with spring"
      code={CODE}
      onAnimate={animate}
    >
      <div
        ref={cardRef}
        onMouseEnter={() => spring(cardRef.current!, { scale: 1.04, y: -8 }, 'snappy')}
        onMouseLeave={() => spring(cardRef.current!, { scale: 1, y: 0 }, 'snappy')}
        className="w-44 rounded-xl border border-white/10 bg-white/[0.04] p-5 cursor-default"
      >
        <div className="h-2 rounded-full bg-white/15 mb-3 w-3/4" />
        <div className="h-2 rounded-full bg-white/10 mb-3" />
        <div className="h-2 rounded-full bg-white/10 mb-3 w-5/6" />
        <div className="h-2 rounded-full bg-white/10 w-1/2" />
      </div>
    </DemoCard>
  )
}
