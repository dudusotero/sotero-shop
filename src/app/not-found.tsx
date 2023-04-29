export default function NotFound() {
  return (
    <div>
      <h1 className="text-4xl">404 - Not found</h1>

      {/* Using <a /> until Vercel doesn't fix the <Link /> navigation issue */}
      {/* <Link href="/">Go to Home</Link> */}
      <a href="/">Go to Home</a>
    </div>
  )
}
