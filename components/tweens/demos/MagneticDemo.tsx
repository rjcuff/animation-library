'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `const dx = (e.clientX - cx) * 0.45
const dy = (e.clientY - cy) * 0.45
spring(el, { x: dx, y: dy }, 'snappy')`

export function MagneticDemo() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)
  const onMove = (e: React.MouseEvent) => {
    const r = wrapRef.current!.getBoundingClientRect()
    spring(ref.current!, {
      x: (e.clientX - r.left - r.width / 2) * 0.45,
      y: (e.clientY - r.top - r.height / 2) * 0.45,
    }, 'snappy')
  }
  return (
    <DemoCard code={CODE} hint="move over the area">
      <div
        ref={wrapRef}
        onMouseMove={onMove}
        onMouseLeave={() => spring(ref.current!, { x: 0, y: 0 }, 'gentle')}
        className="w-full h-full flex items-center justify-center cursor-none absolute inset-0"
      >
        <div ref={ref} className="w-24 h-24 rounded-2xl bg-white/10 border border-white/[0.12] pointer-events-none" />
      </div>
    </DemoCard>
  )
}
