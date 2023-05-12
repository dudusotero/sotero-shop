import Link from 'next/link'

export default function StoreFooter() {
  return (
    <footer aria-labelledby="footer-heading" className="bg-white">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mt-4 md:mt-8 lg:mt-12">
        <div className="border-t border-gray-200 py-10">
          <p className="text-sm text-gray-500">
            Copyright &copy; {new Date().getFullYear()}{' '}
            {process.env.NEXT_PUBLIC_SITE_NAME}, Inc.
          </p>
          <p className="pt-4 text-xs text-gray-500">
            Made with ❤️ by{' '}
            <Link
              className="font-bold hover:underline"
              href="https://github.com/dudusotero"
              target="_blank"
            >
              Eduardo Sotero (@dudusotero)
            </Link>
          </p>
        </div>
      </div>
    </footer>
  )
}
