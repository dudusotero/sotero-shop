import { BASE_URL } from '@/constants'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const routesMap = ['', '/search'].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date().toISOString(),
  }))

  return [...routesMap]
}
