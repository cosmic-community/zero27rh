// app/authors/[slug]/page.tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  getAuthorBySlug,
  getPostsByAuthor,
  getMetafieldValue,
} from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const author = await getAuthorBySlug(slug)

  if (!author) {
    notFound()
  }

  const posts = await getPostsByAuthor(author.id)
  const avatar = author.metadata?.avatar
  const name = getMetafieldValue(author.metadata?.name) || author.title
  const bio = getMetafieldValue(author.metadata?.bio)
  const email = getMetafieldValue(author.metadata?.email)

  return (
    <div>
      {/* Author header */}
      <section className="border-b border-gray-100 bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
          <div className="mx-auto h-28 w-28 overflow-hidden rounded-full bg-gray-100 ring-4 ring-white shadow-md">
            {avatar ? (
              <img
                src={`${avatar.imgix_url}?w=256&h=256&fit=crop&auto=format,compress`}
                alt={name}
                width={112}
                height={112}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-brand-100 text-3xl font-bold text-brand-500">
                {name.charAt(0)}
              </div>
            )}
          </div>
          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
            {name}
          </h1>
          {bio && (
            <p className="mx-auto mt-4 max-w-xl text-gray-600">{bio}</p>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              {email}
            </a>
          )}
        </div>
      </section>

      {/* Author posts */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <h2 className="mb-8 text-2xl font-extrabold text-gray-900">
          Posts by {name}
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts by this author yet.</p>
        )}

        <div className="mt-12">
          <Link
            href="/authors"
            className="text-sm font-semibold text-brand-600 hover:text-brand-700"
          >
            ← Back to all authors
          </Link>
        </div>
      </section>
    </div>
  )
}