import './globals.css'

export const metadata = {
  title: 'Sotero Shop',
  description: 'An e-commerce built with Next.js 13 + Swell.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
