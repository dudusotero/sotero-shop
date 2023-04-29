import type { ReactNode } from 'react'

export type Props = {
  children: ReactNode
}

function ProductInfo({ children }: Props) {
  return <div className="product-info">{children}</div>
}

export default ProductInfo
