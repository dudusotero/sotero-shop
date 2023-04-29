'use client'

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div>
      <h1 className="text-4xl">Something went wrong.</h1>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
