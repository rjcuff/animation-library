'use client'
import { useState } from 'react'
import { Check, Copy, RotateCcw } from 'lucide-react'

interface DemoCardProps {
  onAnimate?: () => void
  hint?: string
  code: string
  children: React.ReactNode
}

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }
  return (
    <button
      onClick={copy}
      className="flex items-center gap-1.5 text-[11px] font-mono text-white/20 hover:text-white/55 transition-colors"
    >
      {copied ? <Check size={11} /> : <Copy size={11} />}
      {copied ? 'copied' : 'copy'}
    </button>
  )
}

export function DemoCard({ onAnimate, hint, code, children }: DemoCardProps) {
  return (
    <div className="not-prose my-8">
      {/* Preview — large, completely clean */}
      <div className="relative rounded-xl border border-white/[0.07] bg-[#0d0d0d] h-[320px] flex items-center justify-center overflow-hidden">
        {children}

        {/* Replay in bottom-right corner, like Motion */}
        {onAnimate && (
          <button
            onClick={onAnimate}
            className="absolute bottom-3 right-3 flex items-center justify-center w-8 h-8 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-colors"
            aria-label="Replay"
          >
            <RotateCcw size={14} />
          </button>
        )}

        {/* Hover hint in bottom-right when no button */}
        {!onAnimate && hint && (
          <span className="absolute bottom-3 right-3 text-[10px] font-mono text-white/20">
            {hint}
          </span>
        )}
      </div>

      {/* Code + copy row below */}
      <div className="mt-3 rounded-lg border border-white/[0.05] bg-[#0a0a0a] px-4 py-3">
        <div className="flex items-start justify-between gap-4 mb-2">
          <CopyButton code={code} />
        </div>
        <pre className="text-[11px] font-mono text-white/40 leading-relaxed overflow-x-auto">
          {code.trim()}
        </pre>
      </div>
    </div>
  )
}
