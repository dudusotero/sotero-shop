import swell from '@/lib/swell'

export const getCurrentUser = () => swell.account.get()

export const loginUser = ({
  email,
  password,
}: {
  email: string
  password: string
}) => swell.account.login(email, password)

export const createUser = (input: swell.Account) => swell.account.create(input)

export const logoutUser = () => swell.account.logout()

export const updateAccount = (input: swell.Account) =>
  swell.account.update(input)
