'use client'
import { useRef } from 'react'
import { spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { x: 0 }, 'bouncy')
spring(el, { x: 0 }, 'snappy')
spring(el, { x: 0 }, 'gentle')
spring(el, { x: 0 }, 'stiff')`

const PRESETS = [
  { name: 'bouncy', color: 'bg-violet-400' },
  { name: 'snappy', color: 'bg-blue-400' },
  { name: 'gentle', color: 'bg-emerald-400' },
  { name: 'stiff',  color: 'bg-orange-400' },
] as const

export function PresetsDemo() {
  const dotRefs = useRef<HTMLDivElement[]>([])

  const animate = () => {
    dotRefs.current.forEach((el, i) => {
      if (!el) return
      snap(el, { x: -52 })
      setTimeout(() => {
        spring(el, { x: 0 }, PRESETS[i].name)
      }, 30)
    })
  }

  return (
    <DemoCard
      title="Presets"
      description="bouncy · snappy · gentle · stiff"
      code={CODE}
      onAnimate={animate}
    >
      <div className="flex flex-col gap-3 w-44">
        {PRESETS.map(({ name, color }, i) => (
          <div key={name} className="flex items-center gap-3">
            <div
              ref={el => { if (el) dotRefs.current[i] = el }}
              className={`w-3 h-3 rounded-full ${color} shrink-0`}
            />
            <span className="text-xs font-mono text-white/30">{name}</span>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}
