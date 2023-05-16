import { create } from 'zustand'

interface FilterSliderState {
  opened: boolean
  open: () => void
  close: () => void
  toggle: () => void
}

const useFilterSlider = create<FilterSliderState>((set) => ({
  opened: false,
  open: () => set(() => ({ opened: true })),
  close: () => set(() => ({ opened: false })),
  toggle: () => set((state) => ({ opened: !state.opened })),
}))

export default useFilterSlider
