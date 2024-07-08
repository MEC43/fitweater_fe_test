import { create } from 'zustand'

export const useRewriteStore = create((set) => ({
  isRwrtCofirm: false,
  onRwrtCofirm: () => set(() => ({ isRwrtCofirm: true })),
  offRwrtCofirm: () => set(() => ({ isRwrtCofirm: false }))
}))
