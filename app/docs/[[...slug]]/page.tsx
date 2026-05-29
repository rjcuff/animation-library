import { source } from '@/lib/source'
import { DocsPage, DocsBody, DocsTitle, DocsDescription } from 'fumadocs-ui/page'
import { notFound } from 'next/navigation'
import { getMDXComponents } from '@/mdx-components'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug?: string[] }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  const MDX = page.data.body
  return (
    <DocsPage toc={page.data.toc} full={false}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDX components={getMDXComponents()} />
      </DocsBody>
    </DocsPage>
  )
}

export async function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = source.getPage(slug)
  if (!page) notFound()

  // Use the bare page title here — the root layout template adds "— tweens"
  // Manually including "— tweens" here caused "Welcome — tweens — tweens" in the tab
  const pageTitle = page.data.title
  const fullTitle = `${page.data.title} — tweens`  // for OG/Twitter sharing cards
  const description = page.data.description
  const url = `https://tweens.dev/docs/${slug?.join('/') ?? ''}`

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/opengraph-image'],
    },
  }
}
