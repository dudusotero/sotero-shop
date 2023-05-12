export default function NotFound() {
  return (
    <main className="mt-4 grid place-items-center bg-white px-6 py-24 sm:py-32 md:mt-8 lg:px-8">
      <div className="text-center">
        <p className="text-base font-semibold text-indigo-600">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-gray-600">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
    </main>
  )
}
