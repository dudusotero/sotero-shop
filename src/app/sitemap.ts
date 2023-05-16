import { BASE_URL } from '@/constants'
import { getCategories } from '@/lib/swell/categories'
import { getProducts } from '@/lib/swell/products'
import { MetadataRoute } from 'next'

export const revalidate = 1800

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routesMap = [
    '',
    '/signin',
    '/signup',
    '/forgot-password',
    '/search',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  const categoriesPromise = getCategories().then((categories) =>
    categories.results.map((category) => ({
      url: `${BASE_URL}/${category.slug}`,
      lastModified: new Date().toISOString(),
    }))
  )

  const productsPromise = getProducts().then((products) =>
    products.results.map((product) => ({
      url: `${BASE_URL}/${product.categories[0].slug}/${product.slug}`,
      lastModified: new Date().toISOString(),
    }))
  )

  const fetchedRoutes = (
    await Promise.all([categoriesPromise, productsPromise])
  ).flat()

  return [...routesMap, ...fetchedRoutes]
}
