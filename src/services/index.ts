import { BASE_URL } from '@/constants'
import { swellFetch } from '@/instances/swell'

type GetAllProductsProps = {
  expand?: ('categories' | 'stock')[] | string[]
}

export async function getAllProducts({
  expand,
}: GetAllProductsProps = {}): Promise<
  swell.ResultsResponse<
    swell.Product & { categories?: swell.ResultsResponse<swell.Category> }
  >
> {
  const input = new URL('/products', BASE_URL)

  if (expand) input.searchParams.set('expand', expand.join(','))

  const res = await swellFetch(`${input.pathname}${input.search}`, {
    next: { revalidate: 10 },
  })

  return res.json()
}

export async function getAllCategories(): Promise<
  swell.ResultsResponse<swell.Category>
> {
  const input = new URL('/categories', BASE_URL)

  const res = await swellFetch(`${input.pathname}${input.search}`, {
    next: { revalidate: 10 },
  })

  return res.json()
}
