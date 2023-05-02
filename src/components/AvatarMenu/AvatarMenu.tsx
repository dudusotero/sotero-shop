'use client'

import { signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  onClick?: () => void
}

function AvatarMenu({ onClick }: Props) {
  const session = useSession()

  if (session.status === 'unauthenticated') {
    return (
      <Link
        href="/signin"
        onClick={onClick}
        className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50 lg:mx-0 lg:rounded-none lg:p-0 lg:text-sm lg:leading-6 lg:hover:bg-transparent"
      >
        Log in{' '}
        <span className="hidden lg:inline-block" aria-hidden="true">
          &rarr;
        </span>
      </Link>
    )
  }
  if (session.status === 'authenticated') {
    return (
      <div className="-mx-3 lg:mx-0">
        <button
          className="block w-full flex-shrink-0 rounded-lg px-3 py-1.5 hover:bg-gray-50 lg:w-auto lg:rounded-none lg:p-0 lg:hover:bg-transparent"
          onClick={async () => {
            await signOut({ redirect: false })
            typeof onClick === 'function' && onClick()
          }}
        >
          <div className="flex items-center">
            <div>
              <Image
                priority
                className="inline-block h-8 w-8 rounded-full bg-gray-200"
                src={session.data.user?.image || '/images/ss-logo.png'}
                alt=""
                width={32}
                height={32}
              />
            </div>
            <div className="ml-3">
              <p className="text-base font-semibold leading-7 text-gray-900 lg:text-sm lg:leading-6">
                {session.data.user?.name}
              </p>
            </div>
          </div>
        </button>
      </div>
    )
  }

  return null
}

export default AvatarMenu
