import swell from '@/lib/swell'

export const getCategories = () => swell.categories.list()

export const getCategoryBySlug = (slug: string) => swell.categories.get(slug)
