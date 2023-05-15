'use client'

import { createUser } from '@/lib/swell/account'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useSWRConfig } from 'swr'

type FormValues = {
  first_name: string
  last_name: string
  email: string
  email_optin: boolean
  password: string
}

export default function SignUpForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { mutate } = useSWRConfig()
  const { register, handleSubmit } = useForm<FormValues>()
  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const response = await createUser(data)

    startTransition(() => {
      mutate('/api/me', response)
      router.refresh()
      router.push('/')
    })
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="firstName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          First name
        </label>
        <div className="mt-2">
          <input
            id="firstName"
            type="text"
            autoComplete="given-name"
            {...register('first_name', {
              required: true,
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="lastName"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Last name
        </label>
        <div className="mt-2">
          <input
            id="lastName"
            type="text"
            autoComplete="family-name"
            {...register('last_name', {
              required: true,
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="flex items-center">
            <label
              htmlFor="emailOptin"
              className="text-sm font-medium leading-6 text-gray-900"
            >
              Opt-in
            </label>
            <input
              id="emailOptin"
              type="checkbox"
              {...register('email_optin')}
              className="ml-3 h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            />
          </div>
        </div>
        <div className="mt-2">
          <input
            id="email"
            type="email"
            autoComplete="email"
            {...register('email', {
              required: true,
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            {...register('password', {
              required: true,
            })}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <button
          disabled={isPending}
          type="submit"
          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign up
        </button>
      </div>
    </form>
  )
}
