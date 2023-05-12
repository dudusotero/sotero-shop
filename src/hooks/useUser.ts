import { getCurrentUser } from '@/lib/swell/account'
import useSWR from 'swr'

export default function useUser() {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR<swell.Account | null>('/api/me', getCurrentUser)

  return {
    user: data,
    error,
    isLoading,
    isValidating,
    mutate,
  }
}
