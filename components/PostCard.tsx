import Link from 'next/link'
import type { Post } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const date =
    post.metadata?.publication_date || post.created_at || ''

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Link href={`/posts/${post.slug}`} className="block">
        <div className="aspect-[16/10] w-full overflow-hidden bg-gray-100">
          {featuredImage ? (
            <img
              src={`${featuredImage.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
              alt={post.title}
              width={400}
              height={250}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-brand-400">
              <span className="text-4xl font-bold">z</span>
            </div>
          )}
        </div>
      </Link>
      <div className="p-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="mb-3 inline-block rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600 transition-colors hover:bg-brand-100"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <Link href={`/posts/${post.slug}`}>
          <h3 className="mb-2 text-xl font-bold leading-snug text-gray-900 transition-colors group-hover:text-brand-600">
            {post.title}
          </h3>
        </Link>
        <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
          {author && (
            <>
              <span className="font-medium text-gray-700">
                {getMetafieldValue(author.metadata?.name) || author.title}
              </span>
              <span>·</span>
            </>
          )}
          {date && <time>{formatDate(date)}</time>}
        </div>
      </div>
    </article>
  )
}