import { create } from 'zustand'

interface CartSliderState {
  opened: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useMenu = create<CartSliderState>((set) => ({
  opened: false,
  open: () => set(() => ({ opened: true })),
  close: () => set(() => ({ opened: false })),
  toggle: () => set((state) => ({ opened: !state.opened })),
}))

export default useMenu
