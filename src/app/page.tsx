import swell from '@/instances/swell'

async function getProducts() {
  const products = await swell.products.list()
  return products
}

export default async function Home() {
  const products = await getProducts()

  return (
    <main>
      <h1 className="text-4xl">Sotero Shop</h1>
      <pre>{JSON.stringify(products, null, 2)}</pre>
    </main>
  )
}
