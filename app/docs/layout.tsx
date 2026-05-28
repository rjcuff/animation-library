import { DocsLayout } from 'fumadocs-ui/layouts/docs'
import type { ReactNode } from 'react'
import { source } from '@/lib/source'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <span className="font-semibold text-sm tracking-tight text-white">tweens</span>
        ),
        transparentMode: 'none',
      }}
      sidebar={{
        defaultOpenLevel: 1,
      }}
      links={[
        {
          text: 'GitHub',
          url: 'https://github.com/rjcuff/tweens',
          external: true,
        },
        {
          text: 'npm',
          url: 'https://www.npmjs.com/package/@tweens/tweens',
          external: true,
        },
      ]}
    >
      {children}
    </DocsLayout>
  )
}
