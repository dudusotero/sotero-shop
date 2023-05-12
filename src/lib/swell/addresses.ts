import swell from '@/lib/swell'

export const createAddress = (input: swell.Address) =>
  swell.account.createAddress(input)

export const updateAddress = (id: string, input: swell.Address) =>
  swell.account.updateAddress(id, input)
