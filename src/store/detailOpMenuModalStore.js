import { create } from 'zustand'

export const useOpenMenuModal = create((set) => ({
  isModalOpen: false,
  isOpMenuOn: false,
  modalOpen: () => set(() => ({ isModalOpen: true })),
  modalClose: () => set(() => ({ isModalOpen: false })),
  opMenuOpen: () => set(() => ({ isOpMenuOn: true })),
  opMenuClose: () => set(() => ({ isOpMenuOn: false })),
}))
