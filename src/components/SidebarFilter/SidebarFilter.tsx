'use client'

import useMenu from '@/hooks/useMenu'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/20/solid'
import { XMarkIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import type { ChangeEvent } from 'react'
import { Fragment } from 'react'

type Props = {
  filters: {
    id: string
    label: string
    type: 'range' | 'select'
    options: {
      value: string | number
      label: string | number
    }[]
    interval?: number
  }[]
}

export default function SidebarFilter({ filters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const opened = useMenu((state) => state.filter)
  const open = useMenu((state) => state.open)
  const close = useMenu((state) => state.close)

  const handleOpen = () => open('filter')
  const handleClose = () => close('filter')

  const checkIfValueExists = (key: string, value: string | number) => {
    const values = searchParams.get(key)?.split(',') || []
    return values.includes(String(value))
  }

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    const array = newSearchParams.get(key)?.split(',') || []
    if (e.target.checked) {
      array.push(e.target.value)
      newSearchParams.set(key, array.toString() || e.target.value)
    } else {
      const newArray = array.filter((value) => value !== e.target.value)
      if (newArray.length > 0) {
        newSearchParams.set(key, newArray.toString())
      } else {
        newSearchParams.delete(key)
      }
    }
    router.push(
      pathname + (newSearchParams.size > 0 ? `?${newSearchParams}` : '')
    )
  }

  return (
    <>
      <Transition.Root show={opened} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40 lg:hidden"
          onClose={handleClose}
        >
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
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-6 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center p-2 text-gray-400 hover:text-gray-500"
                    onClick={handleClose}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  {filters
                    .filter((filter) => filter.type !== 'range')
                    .map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border-t border-gray-200 pb-4 pt-4"
                      >
                        {({ open }) => (
                          <fieldset>
                            <legend className="w-full px-2">
                              <Disclosure.Button className="flex w-full items-center justify-between p-2 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">
                                  {section.label}
                                </span>
                                <span className="ml-6 flex h-7 items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? '-rotate-180' : 'rotate-0',
                                      'h-5 w-5 transform'
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </legend>
                            <Disclosure.Panel className="px-4 pb-2 pt-4">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`${section.id}-${optionIdx}-mobile`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      defaultChecked={checkIfValueExists(
                                        section.id,
                                        option.value
                                      )}
                                      type="checkbox"
                                      onChange={(e) =>
                                        handleFilterChange(e, section.id)
                                      }
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`${section.id}-${optionIdx}-mobile`}
                                      className="ml-3 text-sm text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </fieldset>
                        )}
                      </Disclosure>
                    ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <aside>
        <h2 className="sr-only">Filters</h2>

        <button
          type="button"
          className="inline-flex items-center lg:hidden"
          onClick={handleOpen}
        >
          <span className="text-sm font-medium text-gray-700">Filters</span>
          <PlusIcon
            className="ml-1 h-5 w-5 flex-shrink-0 text-gray-400"
            aria-hidden="true"
          />
        </button>

        <div className="hidden pb-2 lg:block">
          <form className="space-y-10 divide-y divide-gray-200">
            {filters
              .filter((filter) => filter.type !== 'range')
              .map((section, sectionIdx) => (
                <div
                  key={section.id}
                  className={sectionIdx === 0 ? undefined : 'pt-10'}
                >
                  <fieldset>
                    <legend className="block text-sm font-medium text-gray-900">
                      {section.label}
                    </legend>
                    <div className="space-y-3 pt-6">
                      {section.options.map((option, optionIdx) => (
                        <div key={option.value} className="flex items-center">
                          <input
                            id={`${section.id}-${optionIdx}`}
                            name={`${section.id}[]`}
                            defaultValue={option.value}
                            defaultChecked={checkIfValueExists(
                              section.id,
                              option.value
                            )}
                            type="checkbox"
                            onChange={(e) => handleFilterChange(e, section.id)}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                          />
                          <label
                            htmlFor={`${section.id}-${optionIdx}`}
                            className="ml-3 text-sm text-gray-600"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              ))}
          </form>
        </div>
      </aside>
    </>
  )
}
