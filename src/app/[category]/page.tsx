import { ProductCard } from '@/components'
import swell from '@/instances/swell'
import { notFound } from 'next/navigation'

async function getProductsByCategory(slug: string) {
  return Promise.all([
    swell.categories.get(slug),
    swell.products.list({
      category: slug,
    }),
  ])
}

export const revalidate = 60

type PageProps = {
  params: {
    category: string
  }
}

export default async function Category({ params }: PageProps) {
  const { category } = params

  const [categoryData, productsData] = await getProductsByCategory(category)

  if (!categoryData || !productsData) {
    notFound()
  }

  return (
    <div className="grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {productsData.results.map((product) => (
        <ProductCard
          key={product.id}
          product={{ ...product, categories: [categoryData] }}
        />
      ))}
    </div>
  )
}
