import Link from 'next/link'
import type { Author } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface AuthorCardProps {
  author: Author
}

export default function AuthorCard({ author }: AuthorCardProps) {
  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)

  return (
    <Link
      href={`/authors/${author.slug}`}
      className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="h-24 w-24 overflow-hidden rounded-full bg-gray-100 ring-4 ring-brand-50">
        {avatar ? (
          <img
            src={`${avatar.imgix_url}?w=200&h=200&fit=crop&auto=format,compress`}
            alt={name}
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-brand-100 text-2xl font-bold text-brand-500">
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 className="mt-4 text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-600">
        {name}
      </h3>
      {bio && (
        <p className="mt-2 line-clamp-3 text-sm text-gray-500">{bio}</p>
      )}
    </Link>
  )
}