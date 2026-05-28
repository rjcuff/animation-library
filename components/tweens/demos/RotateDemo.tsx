'use client'
import { useRef } from 'react'
import { spring, snap } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `spring(el, { rotate: 360 }, 'bouncy')`

export function RotateDemo() {
  const iconRef = useRef<HTMLDivElement>(null)

  const animate = () => {
    if (!iconRef.current) return
    snap(iconRef.current, { rotate: 0 })
    requestAnimationFrame(() => {
      spring(iconRef.current!, { rotate: 360 }, 'bouncy')
    })
  }

  return (
    <DemoCard
      title="Spring rotate"
      description="Overshoot rotation with bouncy preset"
      code={CODE}
      onAnimate={animate}
    >
      <div
        ref={iconRef}
        className="w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center cursor-default"
      >
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
          <path
            d="M11 4C7.13 4 4 7.13 4 11C4 14.87 7.13 18 11 18C14.87 18 18 14.87 18 11"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M18 4V8H14"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </DemoCard>
  )
}
