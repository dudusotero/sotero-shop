import { Header } from '@/components'
import swell from '@/instances/swell'
import { Analytics } from '@vercel/analytics/react'
import classNames from 'classnames'
import { Inter, Roboto_Mono } from 'next/font/google'
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

const { SITE_NAME } = process.env

export const metadata = {
  title: {
    default: SITE_NAME!,
    template: `%s | ${SITE_NAME}`,
  },
  robots: {
    follow: true,
    index: true,
  },
  description: 'High-performance ecommerce store built with Next.js and Swell.',
  openGraph: {
    images: [
      {
        url: `/api/og?title=${encodeURIComponent(process.env.SITE_NAME || '')}`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
}

export const revalidate = 60

async function getCategories() {
  return swell.categories.list()
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const data = await getCategories()

  return (
    <html
      lang="en"
      className={classNames(inter.variable, roboto_mono.variable)}
    >
      <body>
        <Header categories={data.results} />
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 lg:pt-16">
          {children}
          <Analytics />
        </div>
      </body>
    </html>
  )
}
