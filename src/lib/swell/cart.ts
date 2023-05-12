import swell from '@/lib/swell'

export const getCart = async () => {
  return await swell.cart.get()
}

export const addToCart = async (item: swell.CartItem) => {
  return await swell.cart.addItem(item)
}

export const removeFromCart = async (itemId: string) => {
  return await swell.cart.removeItem(itemId)
}
