'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `el.addEventListener('mousedown', () => spring(el, { scale: 0.95 }, 'stiff'))
el.addEventListener('mouseup',   () => spring(el, { scale: 1   }, 'snappy'))`

export function ButtonPressDemo() {
  const ref = useRef<HTMLDivElement>(null)
  const press = () => spring(ref.current!, { scale: 0.95 }, 'stiff')
  const release = () => spring(ref.current!, { scale: 1 }, 'snappy')

  return (
    <DemoCard code={CODE} onAnimate={() => { press(); setTimeout(release, 120) }}>
      <div
        ref={ref}
        onMouseDown={press}
        onMouseUp={release}
        onMouseLeave={release}
        onTouchStart={press}
        onTouchEnd={release}
        className="px-8 py-3.5 rounded-xl bg-white/[0.07] border border-white/[0.1] cursor-pointer select-none"
      >
        <span className="text-sm font-medium text-white/60 tracking-tight">Press me</span>
      </div>
    </DemoCard>
  )
}
