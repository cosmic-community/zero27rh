import Link from 'next/link'
import { getAllPosts, getAllCategories, getMetafieldValue } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'

export const revalidate = 60

export default async function HomePage() {
  const [posts, categories] = await Promise.all([
    getAllPosts(),
    getAllCategories(),
  ])

  const featured: Post | undefined = posts[0]
  const rest = posts.slice(1, 7)

  return (
    <div>
      {/* Hero */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            Creative Portfolio &amp; Blog
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Stories, ideas &amp; work
            <br />
            from <span className="text-brand-600">zero27rh</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Explore thoughtful writing on design, technology, and creativity — all
            crafted and managed with care.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/posts"
              className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Read the Blog
            </Link>
            <Link
              href="/categories"
              className="rounded-lg border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Browse Categories
            </Link>
          </div>
        </div>
      </section>

      {/* Featured post */}
      {featured && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-sm font-bold uppercase tracking-widest text-brand-600">
            Featured
          </h2>
          <Link
            href={`/posts/${featured.slug}`}
            className="group grid gap-8 overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-lg md:grid-cols-2"
          >
            <div className="aspect-[16/10] overflow-hidden bg-gray-100 md:aspect-auto">
              {featured.metadata?.featured_image ? (
                <img
                  src={`${featured.metadata.featured_image.imgix_url}?w=1000&h=700&fit=crop&auto=format,compress`}
                  alt={featured.title}
                  width={500}
                  height={350}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-[240px] w-full items-center justify-center bg-gradient-to-br from-brand-100 to-brand-200 text-6xl font-bold text-brand-400">
                  z
                </div>
              )}
            </div>
            <div className="flex flex-col justify-center p-8">
              {featured.metadata?.category && (
                <span className="mb-3 inline-block w-fit rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-600">
                  {getMetafieldValue(featured.metadata.category.metadata?.name) ||
                    featured.metadata.category.title}
                </span>
              )}
              <h3 className="text-3xl font-extrabold leading-tight text-gray-900 transition-colors group-hover:text-brand-600">
                {featured.title}
              </h3>
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                {featured.metadata?.author && (
                  <>
                    <span className="font-medium text-gray-700">
                      {getMetafieldValue(featured.metadata.author.metadata?.name) ||
                        featured.metadata.author.title}
                    </span>
                    <span>·</span>
                  </>
                )}
                {(featured.metadata?.publication_date || featured.created_at) && (
                  <time>
                    {formatDate(
                      featured.metadata?.publication_date || featured.created_at
                    )}
                  </time>
                )}
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Latest posts */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-gray-900">Latest Posts</h2>
          <Link
            href="/posts"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            View all →
          </Link>
        </div>
        {rest.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No additional posts yet.</p>
        )}
      </section>

      {/* Categories preview */}
      {categories.length > 0 && (
        <section className="border-t border-gray-100 bg-gray-50">
          <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-extrabold text-gray-900">
                Explore Categories
              </h2>
              <Link
                href="/categories"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View all →
              </Link>
            </div>
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/categories/${category.slug}`}
                  className="rounded-full border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition-all hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600"
                >
                  {getMetafieldValue(category.metadata?.name) || category.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}