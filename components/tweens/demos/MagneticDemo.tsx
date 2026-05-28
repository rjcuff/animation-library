'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `const dx = (e.clientX - centerX) * 0.4
const dy = (e.clientY - centerY) * 0.4
spring(el, { x: dx, y: dy }, 'snappy')`

export function MagneticDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const magnetRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current!.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.4
    const dy = (e.clientY - cy) * 0.4
    spring(magnetRef.current!, { x: dx, y: dy }, 'snappy')
  }

  const onMouseLeave = () => {
    spring(magnetRef.current!, { x: 0, y: 0 }, 'gentle')
  }

  const animate = () => {
    if (!magnetRef.current) return
    spring(magnetRef.current, { x: 20, y: -12 }, 'snappy')
    setTimeout(() => spring(magnetRef.current!, { x: 0, y: 0 }, 'gentle'), 400)
  }

  return (
    <DemoCard
      title="Magnetic"
      description="Element follows cursor using spring tracking"
      code={CODE}
      onAnimate={animate}
    >
      <div
        ref={containerRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className="flex items-center justify-center w-full h-full cursor-none"
      >
        <div
          ref={magnetRef}
          className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.06] flex items-center justify-center pointer-events-none"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 10H15M10 5L15 10L10 15" stroke="white" strokeOpacity="0.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </DemoCard>
  )
}
