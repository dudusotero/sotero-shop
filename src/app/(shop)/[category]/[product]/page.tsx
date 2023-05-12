import ProductOverview from '@/components/ProductOverview'
import { getProductBySlug } from '@/lib/swell/products'
import { notFound } from 'next/navigation'

export const revalidate = 1800

type Props = {
  params: {
    product: string
  }
}

export default async function Product({ params }: Props) {
  const { product } = params

  const data = await getProductBySlug(product)

  if (!data) {
    notFound()
  }

  return (
    <div className="mt-4 grid pb-8 md:mt-8 lg:mt-12">
      <ProductOverview product={data} />
    </div>
  )
}
