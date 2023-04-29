import { StarIcon } from '@heroicons/react/20/solid'
import classNames from 'classnames'
import Image from 'next/image'
import type { ReactNode } from 'react'
import ProductImage from './ProductImage'
import ProductInfo from './ProductInfo'

type Props = {
  product: any
  image?: ReactNode
  info?: ReactNode
  action?: ReactNode
}

function ProductCard(props: Props) {
  const product = { ...props.product, rating: 4, reviewCount: 28 }
  return (
    <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
        <Image
          src={product.images[0].file.url}
          alt={product.images[0].id}
          width={product.images[0].file.width}
          height={product.images[0].file.height}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="pb-4 pt-10 text-center">
        <h3 className="text-sm font-medium text-gray-900">
          <a href={`/${product.slug}`}>
            <span aria-hidden="true" className="absolute inset-0" />
            {product.name}
          </a>
        </h3>
        <div className="mt-3 flex flex-col items-center">
          <p className="sr-only">{product.rating} out of 5 stars</p>
          <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
              <StarIcon
                key={rating}
                className={classNames(
                  product.rating > rating ? 'text-yellow-400' : 'text-gray-200',
                  'h-5 w-5 flex-shrink-0'
                )}
                aria-hidden="true"
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {product.reviewCount} reviews
          </p>
        </div>
        <p className="mt-4 text-base font-medium text-gray-900">
          {new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: product.currency,
          }).format(product.price)}
        </p>
      </div>
    </div>
  )
}

ProductCard.Image = ProductImage
ProductCard.Info = ProductInfo

export default ProductCard
