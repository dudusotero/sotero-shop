import { SidebarFilter } from '@/components'
import ProductCard from '@/components/ProductCard'
import { getProductFilters } from '@/lib/swell/filters'
import { getProducts } from '@/lib/swell/products'
import { redirect } from 'next/navigation'

type Props = {
  searchParams: {
    search?: string
    category?: string
    sizes?: string
  }
}

export default async function Search({ searchParams }: Props) {
  const search = searchParams.search
  const category = searchParams.category?.split(',')
  const sizes = searchParams.sizes?.split(',')

  const products = await getProducts({
    search,
    $filters: {
      category,
      sizes,
    },
  })
  if (products.results.length === 0) {
    redirect('/search')
  }
  const filters = await getProductFilters(products)

  return (
    <main className="mt-4 md:mt-8 lg:mt-12">
      <div className="border-b border-gray-200 pb-10">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          Search products
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Checkout out our products!
        </p>
      </div>

      <div className="pt-12 lg:grid lg:grid-cols-3 lg:gap-x-8 xl:grid-cols-4">
        <SidebarFilter filters={filters} />

        <div className="lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 border-l border-t border-gray-200 md:grid-cols-2 lg:col-span-2 lg:grid-cols-3 xl:col-span-3 xl:grid-cols-4">
            {products.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
