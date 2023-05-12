'use client'

import { AvatarDropdown } from '@/components/StoreNavigation/AvatarDropdown'
import useMenu from '@/hooks/useMenu'
import useUser from '@/hooks/useUser'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { CartButton } from './CartButton'

type Props = {
  categories: swell.Category[]
}

export default function StoreNavigation({ categories }: Props) {
  const opened = useMenu((state) => state.opened)
  const open = useMenu((state) => state.open)
  const close = useMenu((state) => state.close)
  const { user, isLoading } = useUser()

  return (
    <>
      <Transition.Root show={opened} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                <div className="flex px-4 pb-2 pt-5">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={close}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                <div className="mt-2 space-y-6 border-gray-200 px-4 py-6">
                  {categories.map((category) => (
                    <div key={category.id} className="flow-root">
                      <Link
                        href={`/${category.slug}`}
                        onClick={close}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        {category.name}
                      </Link>
                    </div>
                  ))}
                </div>

                {!isLoading && !user && (
                  <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                    <div className="flow-root">
                      <Link
                        href="/signin"
                        onClick={close}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Sign in
                      </Link>
                    </div>
                    <div className="flow-root">
                      <Link
                        href="/signup"
                        onClick={close}
                        className="-m-2 block p-2 font-medium text-gray-900"
                      >
                        Create account
                      </Link>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className="bg-white">
        <nav aria-label="Top">
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={open}
              >
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
              </button>

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <span className="sr-only">
                    {process.env.NEXT_PUBLIC_SITE_NAME}
                  </span>
                  <Image
                    priority
                    className="mx-auto h-10 w-auto"
                    src="/ss-logo.png"
                    alt=""
                    width={40}
                    height={40}
                  />
                </Link>
              </div>

              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  {categories.map((category) => (
                    <Link
                      key={category.id}
                      href={`/${category.slug}`}
                      className="flex items-center self-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="ml-auto flex items-center">
                {!isLoading && (
                  <>
                    {user ? (
                      <div className="flex">
                        <AvatarDropdown />
                      </div>
                    ) : (
                      <div className="mr-2 hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                        <Link
                          href="/signin"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Sign in
                        </Link>
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                        <Link
                          href="/signup"
                          className="text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Create account
                        </Link>
                      </div>
                    )}
                  </>
                )}

                <div className="ml-4 flow-root lg:ml-6">
                  <CartButton />
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  )
}
