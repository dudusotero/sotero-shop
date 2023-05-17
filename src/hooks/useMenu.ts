import { create } from 'zustand'

type Key = 'cart' | 'header' | 'filter'

type State = {
  [key in Key]: boolean
}

type Actions = {
  open: (key: Key) => void
  close: (key: Key) => void
  toggle: (key: Key) => void
}

const useMenu = create<State & Actions>((set) => ({
  cart: false,
  header: false,
  filter: false,
  open: (key) => set(() => ({ [key]: true })),
  close: (key) => set(() => ({ [key]: false })),
  toggle: (key) => set((state) => ({ [key]: !state[key] })),
}))

export default useMenu
