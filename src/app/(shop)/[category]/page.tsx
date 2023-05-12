import ProductCard from '@/components/ProductCard'
import { getCategoryBySlug } from '@/lib/swell/categories'
import { getProductsByCategorySlug } from '@/lib/swell/products'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 1800

type Props = {
  params: {
    category: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = params

  const categoryData = await getCategoryBySlug(category)

  return {
    title: categoryData?.name,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(categoryData?.name || '')}`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
  }
}

export default async function Category({ params }: Props) {
  const { category } = params

  const [categoryData, productsData] = await Promise.all([
    getCategoryBySlug(category),
    getProductsByCategorySlug(category),
  ])

  if (!categoryData || !productsData) {
    notFound()
  }

  return (
    <div className="mt-4 grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 md:mt-8 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 xl:grid-cols-5">
      {productsData.results.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product, categories: [categoryData] }}
        />
      ))}
    </div>
  )
}
