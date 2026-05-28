'use client'
import { useRef } from 'react'
import { sequence, spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `await sequence([
  () => spring(a, { x: 0, opacity: 1 }, 'snappy'),
  () => spring(b, { x: 0, opacity: 1 }, 'snappy'),
  () => spring(c, { x: 0, opacity: 1 }, 'snappy'),
])`

const ITEMS = ['First item', 'Second item', 'Third item']

export function SequenceDemo() {
  const refs = useRef<HTMLDivElement[]>([])
  const run = async () => {
    const els = refs.current.filter(Boolean)
    els.forEach(el => snap(el, { x: -24, opacity: 0 }))
    await sequence(els.map(el => () => spring(el, { x: 0, opacity: 1 }, 'snappy')))
  }
  return (
    <DemoCard code={CODE} onAnimate={run}>
      <div className="flex flex-col gap-3 w-52">
        {ITEMS.map((label, i) => (
          <div
            key={i}
            ref={el => { if (el) refs.current[i] = el }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/[0.07]"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/25 flex-shrink-0" />
            <span className="text-xs text-white/45 font-mono">{label}</span>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}
