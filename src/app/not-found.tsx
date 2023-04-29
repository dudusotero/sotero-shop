import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex flex-col items-start gap-4">
      <h1 className="text-4xl">404 - Not found</h1>
      <Link href="/">Back to Home</Link>
    </main>
  )
}
