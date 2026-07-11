import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div>
            <span className="text-lg font-extrabold text-gray-900">zero27rh</span>
            <p className="mt-1 text-sm text-gray-500">
              A creative portfolio &amp; blog.
            </p>
          </div>
          <nav className="flex gap-6 text-sm font-medium text-gray-600">
            <Link href="/posts" className="hover:text-brand-600">
              Posts
            </Link>
            <Link href="/categories" className="hover:text-brand-600">
              Categories
            </Link>
            <Link href="/authors" className="hover:text-brand-600">
              Authors
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-xs text-gray-400">
          © {year} zero27rh. Built with Cosmic.
        </p>
      </div>
    </footer>
  )
}