import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sotero-shop.vercel.app/sitemap.xml',
      lastModified: new Date(),
    },
  ]
}
