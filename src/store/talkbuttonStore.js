import { create } from 'zustand'

export const buttonStore = create((set) => ({
  onBtn: 'all',
  setOnBtn: (buttonId) => set({ onBtn: buttonId })
}))
