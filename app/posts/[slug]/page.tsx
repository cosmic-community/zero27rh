// app/posts/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getPostBySlug,
  getMetafieldValue,
  normalizeTags,
} from '@/lib/cosmic'
import { formatDate } from '@/lib/utils'

export const revalidate = 60

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const featuredImage = post.metadata?.featured_image
  const author = post.metadata?.author
  const category = post.metadata?.category
  const content = getMetafieldValue(post.metadata?.content)
  const tags = normalizeTags(post.metadata?.tags)
  const date = post.metadata?.publication_date || post.created_at || ''

  return (
    <article>
      {/* Header */}
      <div className="mx-auto max-w-3xl px-4 pt-16 text-center sm:px-6">
        {category && (
          <Link
            href={`/categories/${category.slug}`}
            className="mb-5 inline-block rounded-full bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-brand-600 transition-colors hover:bg-brand-100"
          >
            {getMetafieldValue(category.metadata?.name) || category.title}
          </Link>
        )}
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          {post.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-gray-500">
          {author && (
            <Link
              href={`/authors/${author.slug}`}
              className="flex items-center gap-2 font-medium text-gray-700 hover:text-brand-600"
            >
              {author.metadata?.avatar && (
                <img
                  src={`${author.metadata.avatar.imgix_url}?w=64&h=64&fit=crop&auto=format,compress`}
                  alt={getMetafieldValue(author.metadata?.name) || author.title}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full object-cover"
                />
              )}
              {getMetafieldValue(author.metadata?.name) || author.title}
            </Link>
          )}
          {date && (
            <>
              <span>·</span>
              <time>{formatDate(date)}</time>
            </>
          )}
        </div>
      </div>

      {/* Featured image */}
      {featuredImage && (
        <div className="mx-auto mt-12 max-w-4xl px-4 sm:px-6">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl bg-gray-100">
            <img
              src={`${featuredImage.imgix_url}?w=1600&h=900&fit=crop&auto=format,compress`}
              alt={post.title}
              width={800}
              height={450}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {content ? (
          <div
            className="prose prose-lg prose-brand max-w-none"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        ) : (
          <p className="text-gray-500">No content available for this post.</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author bio */}
        {author && (
          <div className="mt-12 flex items-start gap-4 rounded-2xl border border-gray-100 bg-gray-50 p-6">
            {author.metadata?.avatar ? (
              <img
                src={`${author.metadata.avatar.imgix_url}?w=128&h=128&fit=crop&auto=format,compress`}
                alt={getMetafieldValue(author.metadata?.name) || author.title}
                width={64}
                height={64}
                className="h-16 w-16 flex-shrink-0 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-brand-100 text-xl font-bold text-brand-500">
                {(getMetafieldValue(author.metadata?.name) || author.title).charAt(0)}
              </div>
            )}
            <div>
              <Link
                href={`/authors/${author.slug}`}
                className="text-lg font-bold text-gray-900 hover:text-brand-600"
              >
                {getMetafieldValue(author.metadata?.name) || author.title}
              </Link>
              {getMetafieldValue(author.metadata?.bio) && (
                <p className="mt-1 text-sm text-gray-600">
                  {getMetafieldValue(author.metadata?.bio)}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="mt-12">
          <Link
            href="/posts"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            ← Back to all posts
          </Link>
        </div>
      </div>
    </article>
  )
}