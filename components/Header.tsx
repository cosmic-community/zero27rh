import Link from 'next/link'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-lg font-bold text-white">
            z
          </span>
          <span className="text-xl font-extrabold tracking-tight text-gray-900">
            zero27rh
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/" className="transition-colors hover:text-brand-600">
            Home
          </Link>
          <Link href="/posts" className="transition-colors hover:text-brand-600">
            Posts
          </Link>
          <Link href="/categories" className="transition-colors hover:text-brand-600">
            Categories
          </Link>
          <Link href="/authors" className="transition-colors hover:text-brand-600">
            Authors
          </Link>
        </nav>
      </div>
    </header>
  )
}