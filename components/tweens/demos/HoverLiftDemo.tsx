'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { y: -4, scale: 1.03 }, 'snappy')
spring(el, { y:  0, scale: 1    }, 'snappy')`

export function HoverLiftDemo() {
  const ref = useRef<HTMLDivElement>(null)
  return (
    <DemoCard code={CODE} hint="hover the card">
      <div
        ref={ref}
        onMouseEnter={() => spring(ref.current!, { y: -4, scale: 1.03 }, 'snappy')}
        onMouseLeave={() => spring(ref.current!, { y: 0, scale: 1 }, 'snappy')}
        className="w-40 rounded-2xl bg-[#111] border border-white/[0.1] p-5 cursor-pointer"
      >
        <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] mb-4 flex items-center justify-center">
          <div className="w-3 h-px bg-white/30 rounded-full" />
        </div>
        <p className="text-sm font-medium text-white/65 mb-1 tracking-tight">Hover lift</p>
        <p className="text-[11px] text-white/25 font-mono">spring physics</p>
      </div>
    </DemoCard>
  )
}
