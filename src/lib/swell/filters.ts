import swell from '@/lib/swell'

export const getProductFilters = (products: swell.FlexibleProductInput) =>
  swell.products.filters(products) as unknown as Promise<
    {
      id: string
      label: string
      type: 'range' | 'select'
      options: {
        value: string | number
        label: string | number
      }[]
      interval?: number
    }[]
  >
