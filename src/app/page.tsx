import { ProductCard } from '@/components'
import swell from '@/instances/swell'
import type { Product } from '@/types'

async function getProducts() {
  return swell.products.list({
    expand: ['categories'],
  }) as unknown as swell.ResultsResponse<Product>
}

export const revalidate = 60

export default async function Home() {
  const data = await getProducts()

  return (
    <div className="grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {data.results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
