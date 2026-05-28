import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: {
    default: 'tweens — The lightweight animation library for the web',
    template: '%s — tweens',
  },
  description:
    'Spring animations that feel alive. Interruptible, Promise-based, ~2kb gzipped, zero dependencies. Works with React, Vue, Svelte, or plain JavaScript.',
  keywords: [
    'animation',
    'spring animation',
    'physics animation',
    'dom animation',
    'javascript animation',
    'lightweight animation',
    'motion',
    'tweens',
    'react animation',
    'web animation',
  ],
  authors: [{ name: 'tweens', url: 'https://tweens.dev' }],
  creator: 'tweens',
  metadataBase: new URL('https://tweens.dev'),
  alternates: { canonical: 'https://tweens.dev' },
  openGraph: {
    type: 'website',
    url: 'https://tweens.dev',
    siteName: 'tweens',
    title: 'tweens — The lightweight animation library for the web',
    description:
      'Spring animations that feel alive. Interruptible, Promise-based, ~2kb gzipped, zero dependencies. Works with React, Vue, Svelte, or plain JavaScript.',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'tweens — The lightweight animation library for the web',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@rcuffdev',
    creator: '@rcuffdev',
    title: 'tweens — The lightweight animation library for the web',
    description:
      'Spring animations that feel alive. Interruptible, Promise-based, ~2kb gzipped, zero dependencies. Works with React, Vue, Svelte, or plain JavaScript.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body>
        <RootProvider theme={{ defaultTheme: 'dark', enableSystem: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
