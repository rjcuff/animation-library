import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      themeSwitch={{ enabled: false }}
      nav={{
        title: (
          <span className="flex items-center gap-1.5 font-semibold text-sm tracking-tight">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M2 10 C2 5, 7 5, 10 10 C13 15, 18 15, 18 10"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
            tweens
          </span>
        ),
      }}
      sidebar={{ defaultOpenLevel: 1 }}
      links={[
        { text: '@rcuffdev', url: 'https://x.com/rcuffdev', external: true },
        { text: 'npm', url: 'https://www.npmjs.com/package/@tweens/tweens', external: true },
      ]}
    >
      {children}
    </DocsLayout>
  )
}
