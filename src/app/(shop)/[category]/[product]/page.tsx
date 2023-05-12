import ProductOverview from '@/components/ProductOverview'
import { getProductBySlug } from '@/lib/swell/products'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 1800

type Props = {
  params: {
    product: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { product } = params

  const productData = await getProductBySlug(product)

  return {
    title: productData?.name,
    openGraph: {
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(productData?.name || '')}`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'website',
    },
  }
}

export default async function Product({ params }: Props) {
  const { product } = params

  const data = await getProductBySlug(product)

  if (!data) {
    notFound()
  }

  return (
    <div className="mt-4 grid md:mt-8 lg:mt-12">
      <ProductOverview product={data} />
    </div>
  )
}
