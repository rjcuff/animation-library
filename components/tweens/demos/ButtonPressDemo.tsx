'use client'
import { useRef } from 'react'
import { spring } from '@tweens/tweens'
import { DemoCard } from '../DemoCard'

const CODE = `// mousedown
spring(el, { scale: 0.92 }, 'stiff')

// mouseup
spring(el, { scale: 1 }, 'bouncy')`

export function ButtonPressDemo() {
  const btnRef = useRef<HTMLButtonElement>(null)

  const animate = () => {
    if (!btnRef.current) return
    spring(btnRef.current, { scale: 0.92 }, 'stiff')
    setTimeout(() => spring(btnRef.current!, { scale: 1 }, 'bouncy'), 120)
  }

  return (
    <DemoCard
      title="Button press"
      description="Physical spring feedback on click"
      code={CODE}
      onAnimate={animate}
    >
      <button
        ref={btnRef}
        onMouseDown={() => spring(btnRef.current!, { scale: 0.92 }, 'stiff')}
        onMouseUp={() => spring(btnRef.current!, { scale: 1 }, 'bouncy')}
        onMouseLeave={() => spring(btnRef.current!, { scale: 1 }, 'bouncy')}
        className="px-6 py-2.5 rounded-xl bg-white text-black text-sm font-medium"
      >
        Click me
      </button>
    </DemoCard>
  )
}
