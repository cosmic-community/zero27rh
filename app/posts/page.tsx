import { getAllPosts } from '@/lib/cosmic'
import PostCard from '@/components/PostCard'

export const revalidate = 60

export const metadata = {
  title: 'Posts — zero27rh',
  description: 'All blog posts from zero27rh.',
}

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          All Posts
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Every story, idea, and update in one place.
        </p>
      </header>

      {posts.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No posts available yet.</p>
      )}
    </div>
  )
}