import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { RootProvider } from 'fumadocs-ui/provider/next'
import './globals.css'

const inter = Inter({ variable: '--font-sans', subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'tweens.dev',
  description: 'Spring animations that feel alive. Lightweight, interruptible, zero dependencies.',
  metadataBase: new URL('https://tweens.dev'),
  alternates: { canonical: 'https://tweens.dev' },
  openGraph: {
    title: 'tweens.dev',
    description: 'Spring animations that feel alive. Lightweight, interruptible, zero dependencies.',
    url: 'https://tweens.dev',
    siteName: 'tweens.dev',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'tweens.dev',
    description: 'Spring animations that feel alive. Lightweight, interruptible, zero dependencies.',
    creator: '@rcuffdev',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] antialiased">
        <RootProvider theme={{ defaultTheme: 'dark', enableSystem: false }}>
          {children}
        </RootProvider>
      </body>
    </html>
  )
}
