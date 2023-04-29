import { getAllCategories, getAllProducts } from '@/services'

export const runtime = 'edge'

export default async function Products() {
  const [categoriesData, productsData] = await Promise.all([
    getAllCategories(),
    getAllProducts({ expand: ['categories.slug'] }),
  ])

  return (
    <div>
      {/* <h1 className="text-4xl">Products</h1> */}
      {/* {productsData.results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))} */}

      {/* <pre>{JSON.stringify(categoriesData, null, 2)}</pre> */}
      <pre>{JSON.stringify(productsData, null, 2)}</pre>
    </div>
  )
}
