import swell from '@/lib/swell'

export const getProducts = () =>
  swell.products.list({
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
