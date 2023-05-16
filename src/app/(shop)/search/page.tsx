import { SidebarFilter } from '@/components'
import ProductCard from '@/components/ProductCard'
import { getAttributes } from '@/lib/swell/attributes'
import { getCategories } from '@/lib/swell/categories'
import { getProducts } from '@/lib/swell/products'

export default async function Search() {
  const [productsData, categoriesData, attributesData] = await Promise.all([
    getProducts(),
    getCategories(),
    getAttributes(),
  ])

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
        <SidebarFilter
          filters={[
            {
              id: 'category',
              name: 'Category',
              options: categoriesData.results.map((category) => ({
                value: category.slug,
                label: category.name,
              })),
            },
            ...(attributesData.results.map((attribute) => ({
              id: attribute.id!,
              name: attribute.name!,
              options: attribute.values?.map((value) => ({
                value,
                label: value,
              })),
            })) as any),
          ]}
        />

        <div className="lg:col-span-2 xl:col-span-3">
          <div className="grid grid-cols-1 border-l border-t border-gray-200 md:grid-cols-2 lg:col-span-2 lg:grid-cols-3 xl:col-span-3 xl:grid-cols-4">
            {productsData.results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
