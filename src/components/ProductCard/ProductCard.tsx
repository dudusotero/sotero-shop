import type { Product } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

type Props = {
  product: Product
  image?: React.ReactNode
  info?: React.ReactNode
  action?: React.ReactNode
}

function ProductCard({ product }: Props) {
  return (
    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        {product.images && (
          <Image
            src={product.images[0].file?.url || ''}
            alt={product.name}
            width={product.images[0].file?.width}
            height={product.images[0].file?.height}
            className="h-full w-full object-cover object-center"
          />
        )}
      </div>
      <div className="pb-4 pt-10 text-center">
        <p className="text-sm font-medium text-gray-900">
          {product.categories && (
            <Link href={`/${product.categories[0].slug}/${product.slug}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          )}
        </p>
        <p className="mt-4 text-base font-medium text-gray-900">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.currency,
          }).format(product.price || 0)}
        </p>
      </div>
    </div>
  )
}

ProductCard.Image = ProductImage
ProductCard.Info = ProductInfo

export default ProductCard
