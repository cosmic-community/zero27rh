import Link from 'next/link'
import type { Category } from '@/types'
import { getMetafieldValue } from '@/lib/cosmic'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = getMetafieldValue(category.metadata?.name) || category.title
  const description = getMetafieldValue(category.metadata?.description)

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block rounded-2xl border border-gray-100 bg-gradient-to-br from-white to-brand-50 p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-xl font-bold text-white">
        🏷️
      </div>
      <h3 className="text-lg font-bold text-gray-900 transition-colors group-hover:text-brand-600">
        {name}
      </h3>
      {description && (
        <p className="mt-2 line-clamp-2 text-sm text-gray-500">{description}</p>
      )}
    </Link>
  )
}