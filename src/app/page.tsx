import swell from '@/instances/swell'

async function getProducts() {
  return await swell.products.list({ expand: ['categories'] })
}

export const runtime = 'edge'

export default async function Home() {
  const data = await getProducts()

  return (
    <div>
      <h1 className="text-4xl">Sotero Shop</h1>
      {/* <ProductCard product={data.results[0]} /> */}
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
