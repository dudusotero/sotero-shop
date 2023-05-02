import { ProductOverview } from '@/components'
import swell from '@/instances/swell'
import type { Product } from '@/types'
import { notFound } from 'next/navigation'

async function getProductBySlug(slug: string) {
  return swell.products.get(slug, {
    expand: ['categories'],
  }) as unknown as Product
}

export const revalidate = 10

export const runtime = 'edge'

type PageProps = {
  params: {
    product: string
  }
}

export default async function Product({ params }: PageProps) {
  const { product } = params

  const data = await getProductBySlug(product)

  if (!data) {
    notFound()
  }

  return (
    <div className="grid">
      <ProductOverview product={data} />
    </div>
  )
}
