import swell from '@/lib/swell'

export const getProducts = (input?: swell.ProductQuery) =>
  swell.products.list({
    ...input,
    expand: ['categories'],
  }) as Promise<
    swell.ResultsResponse<swell.Product & { categories: swell.Category[] }>
  >

export const getProductsByCategorySlug = (slug: string) =>
  swell.products.list({
    category: slug,
  })

export const getProductBySlug = (slug: string) =>
  swell.products.get(slug, {
    expand: ['categories'],
  }) as Promise<swell.Product & { categories: swell.Category[] }>
