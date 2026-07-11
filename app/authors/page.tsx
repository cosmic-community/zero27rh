import { getAllAuthors } from '@/lib/cosmic'
import AuthorCard from '@/components/AuthorCard'

export const revalidate = 60

export const metadata = {
  title: 'Authors — zero27rh',
  description: 'Meet the authors behind zero27rh.',
}

export default async function AuthorsPage() {
  const authors = await getAllAuthors()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Authors
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          The creative minds behind the stories.
        </p>
      </header>

      {authors.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No authors available yet.</p>
      )}
    </div>
  )
}