import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center justify-center px-4 py-32 text-center sm:px-6">
      <span className="text-7xl font-extrabold text-brand-600">404</span>
      <h1 className="mt-4 text-3xl font-extrabold text-gray-900">
        Page not found
      </h1>
      <p className="mt-3 text-gray-600">
        The page you&apos;re looking for doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
      >
        Go back home
      </Link>
    </div>
  )
}