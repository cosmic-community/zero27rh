// app/categories/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getCategoryBySlug,
  getPostsByCategory,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const posts = await getPostsByCategory(category.id)
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <div>
      <section className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <span className="inline-block rounded-full bg-brand-100 px-4 py-1.5 text-sm font-semibold text-brand-700">
            🏷️ Category
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900">
            {name}
          </h1>
          {description && (
            <p className="mx-auto mt-4 max-w-xl text-gray-600">{description}</p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts in this category yet.</p>
        )}

        <div className="mt-12">
          <Link
            href="/categories"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            ← Back to all categories
          </Link>
        </div>
      </section>
    </div>
  )
}