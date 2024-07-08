import { create } from 'zustand'

export const useCategoryStore = create((set) => ({
  //마이페이지 커뮤니티 활동 카테고리
  onMyPageCate: 'talk',
  setOnMyPageCate: (onMyPageCate) => set({ onMyPageCate }),

  //커뮤니티 카테고리
  onCommuCate: 'talk',
  setOnCommuCate: (onCommuCate) => set({ onCommuCate })
}))
