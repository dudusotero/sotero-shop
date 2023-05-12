import ProductCard from '@/components/ProductCard'
import { getProducts } from '@/lib/swell/products'

export const revalidate = 1800

export default async function Home() {
  const data = await getProducts()

  return (
    <div className="mt-4 grid grid-cols-1 border-l border-t border-gray-200 sm:grid-cols-2 md:mt-8 md:grid-cols-3 lg:mt-12 lg:grid-cols-4 xl:grid-cols-5">
      {data.results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
