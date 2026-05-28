'use client'
import { useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { spring } from '@tweens/tweens'

interface DemoCardProps {
  title: string
  description: string
  code: string
  onAnimate?: () => void
  children: React.ReactNode
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  const copy = async () => {
    if (ref.current) {
      spring(ref.current, { scale: 0.88 }, 'stiff')
      setTimeout(() => spring(ref.current!, { scale: 1 }, 'bouncy'), 80)
    }
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <button
      ref={ref}
      onClick={copy}
      className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg text-white/30 hover:text-white/60 hover:bg-white/[0.06] transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  )
}

export function DemoCard({ title, description, code, onAnimate, children }: DemoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  const onMouseEnter = () => {
    if (cardRef.current) spring(cardRef.current, { y: -3, scale: 1.008 }, 'snappy')
  }
  const onMouseLeave = () => {
    if (cardRef.current) spring(cardRef.current, { y: 0, scale: 1 }, 'gentle')
  }
  const onMouseDown = () => {
    if (btnRef.current) spring(btnRef.current, { scale: 0.94 }, 'stiff')
  }
  const onMouseUp = () => {
    if (btnRef.current) spring(btnRef.current, { scale: 1 }, 'bouncy')
  }

  return (
    <div
      ref={cardRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="rounded-2xl border border-white/[0.07] bg-[#111111] overflow-hidden not-prose"
    >
      <div className="relative flex items-center justify-center h-[220px] p-6">
        {children}
        {onAnimate && (
          <button
            ref={btnRef}
            onClick={onAnimate}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
            className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-white text-black text-xs font-medium"
          >
            Animate
          </button>
        )}
      </div>
      <div className="flex items-start justify-between px-4 py-3.5 border-t border-white/[0.05]">
        <div>
          <p className="text-sm text-white/70 font-medium leading-tight">{title}</p>
          <p className="text-xs text-white/30 mt-0.5 leading-relaxed">{description}</p>
        </div>
        <CopyButton code={code} />
      </div>
    </div>
  )
}
