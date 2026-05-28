'use client'
import { useRef, useState } from 'react'
import { spring, snap } from '@tweens/tweens'
import { RotateCcw } from 'lucide-react'

const PRESETS = [
  { name: 'bouncy', color: '#a78bfa' },
  { name: 'snappy', color: '#60a5fa' },
  { name: 'gentle', color: '#34d399' },
  { name: 'stiff',  color: '#fbbf24' },
] as const

function PresetBox({ name, color }: { name: typeof PRESETS[number]['name'], color: string }) {
  const ref = useRef<HTMLDivElement>(null)

  const animate = () => {
    if (!ref.current) return
    snap(ref.current, { x: -70 })
    setTimeout(() => spring(ref.current!, { x: 0 }, name), 30)
  }

  return (
    <div className="not-prose flex-1">
      {/* Preview */}
      <div className="relative rounded-xl border border-white/[0.07] bg-[#0d0d0d] h-[200px] flex items-center justify-center overflow-hidden">
        <div
          ref={ref}
          className="w-16 h-16 rounded-2xl"
          style={{ backgroundColor: color + '33', border: `1px solid ${color}44` }}
        />
        <button
          onClick={animate}
          className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
          aria-label="Replay"
        >
          <RotateCcw size={13} />
        </button>
      </div>
      {/* Label outside */}
      <p className="mt-2 text-[11px] font-mono text-white/35">'{name}'</p>
    </div>
  )
}

export function PresetsDemo() {
  return (
    <div className="not-prose my-8">
      <div className="grid grid-cols-2 gap-4">
        {PRESETS.map(p => (
          <PresetBox key={p.name} name={p.name} color={p.color} />
        ))}
      </div>
    </div>
  )
}
