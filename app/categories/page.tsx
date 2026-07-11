import { getAllCategories } from '@/lib/cosmic'
import CategoryCard from '@/components/CategoryCard'

export const revalidate = 60

export const metadata = {
  title: 'Categories — zero27rh',
  description: 'Browse posts by category.',
}

export default async function CategoriesPage() {
  const categories = await getAllCategories()

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <header className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
          Categories
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          Find posts grouped by topic.
        </p>
      </header>

      {categories.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No categories available yet.</p>
      )}
    </div>
  )
}