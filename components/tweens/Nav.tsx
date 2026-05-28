import Link from 'next/link'

export function Nav() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-3.5 border-b border-white/[0.05] bg-[#0a0a0a]/90 backdrop-blur-md">
      <Link href="/" className="text-white font-semibold text-sm tracking-tight hover:text-white/60 transition-colors">
        tweens
      </Link>
      <div className="flex items-center gap-5">
        <Link href="/docs" className="text-sm text-white/40 hover:text-white/70 transition-colors">
          Docs
        </Link>
        <a
          href="https://github.com/rjcuff/tweens"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white/30 hover:text-white/60 transition-colors"
        >
          GitHub
        </a>
      </div>
    </header>
  )
}
