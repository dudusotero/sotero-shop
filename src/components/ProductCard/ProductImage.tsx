import Image from 'next/image'

type Props = {
  image: any
}

function ProductImage({ image }: Props) {
  return (
    <div className="product-image">
      <Image
        src={image.url}
        alt={image.alt || ''}
        width={image.width}
        height={image.height}
      />
    </div>
  )
}

export default ProductImage
