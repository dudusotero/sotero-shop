import { StoreFooter, StoreNavigation } from '@/components'
import { BASE_URL } from '@/constants'
import { getCategories } from '@/lib/swell/categories'
import { Analytics } from '@vercel/analytics/react'
import classNames from 'classnames'
import type { Metadata } from 'next'
import { Inter, Roboto_Mono } from 'next/font/google'
import NextTopLoader from 'nextjs-toploader'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  display: 'swap',
  subsets: ['latin'],
})

const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  display: 'swap',
  subsets: ['latin'],
})

const { NEXT_PUBLIC_SITE_NAME } = process.env

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: NEXT_PUBLIC_SITE_NAME!,
    template: `%s | ${NEXT_PUBLIC_SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  description: 'High-performance ecommerce store built with Next.js and Swell.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(
          process.env.NEXT_PUBLIC_SITE_NAME || ''
        )}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export const revalidate = 1800

type Props = {
  children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
  const data = await getCategories()

  return (
    <html
      lang="en-US"
      className={classNames(
        inter.variable,
        roboto_mono.variable,
        'h-full bg-white'
      )}
    >
      <body className="h-full">
        <div className="mx-auto flex h-full max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
          <NextTopLoader showSpinner={false} color="rgb(79 70 229)" />
          <StoreNavigation categories={data.results} />
          {children}
          <StoreFooter />
          <Analytics />
        </div>
      </body>
    </html>
  )
}
