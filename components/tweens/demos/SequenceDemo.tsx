'use client'
import { useRef } from 'react'
import { sequence, spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `await sequence([
  () => spring(card1, { x: 0, opacity: 1 }, 'snappy'),
  () => spring(card2, { x: 0, opacity: 1 }, 'snappy'),
  () => spring(card3, { x: 0, opacity: 1 }, 'snappy'),
])`

const LABELS = ['Install', 'Import', 'Animate']

export function SequenceDemo() {
  const refs = useRef<HTMLDivElement[]>([])

  const runAnimate = async () => {
    const els = refs.current.filter(Boolean)
    els.forEach(el => snap(el, { x: -32, opacity: 0 }))

    await sequence(
      els.map(el => () => spring(el, { x: 0, opacity: 1 }, 'snappy'))
    )
  }

  return (
    <DemoCard
      title="sequence()"
      description="Run animations one after another, in order"
      code={CODE}
      onAnimate={runAnimate}
    >
      <div className="flex flex-col gap-2 w-40">
        {LABELS.map((label, i) => (
          <div
            key={label}
            ref={el => { if (el) refs.current[i] = el }}
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06]"
          >
            <span className="text-[10px] font-mono text-white/20 w-4 shrink-0">{i + 1}</span>
            <span className="text-xs text-white/50">{label}</span>
          </div>
        ))}
      </div>
    </DemoCard>
  )
}
