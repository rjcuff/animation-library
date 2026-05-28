'use client'
import { useRef } from 'react'
import { cascade, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// Reset state first
items.forEach(el => snap(el, { y: 16, opacity: 0 }))

// Cascade in with stagger
cascade(items, { y: 0, opacity: 1 }, 'snappy', 0.06)`

const LABELS = ['Design system', 'Spring physics', 'Zero deps', 'TypeScript', 'React ready']

export function CascadeDemo() {
  const itemRefs = useRef<HTMLDivElement[]>([])

  const animate = () => {
    const els = itemRefs.current.filter(Boolean)
    els.forEach(el => snap(el, { y: 16, opacity: 0 }))
    requestAnimationFrame(() => {
      cascade(els, { y: 0, opacity: 1 }, 'snappy', 0.06)
    })
  }

  return (
    <DemoCard
      title="Cascade"
      description="Staggered entrance across multiple elements"
      code={CODE}
      onAnimate={animate}
    >
      <div className="flex flex-col gap-1.5 w-44">
        {LABELS.map((label, i) => (
          <div
            key={label}
            ref={el => { if (el) itemRefs.current[i] = el }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 shrink-0" />
            <span className="text-xs text-white/50">{label}</span>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}
