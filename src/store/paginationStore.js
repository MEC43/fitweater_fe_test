import { create } from 'zustand'

export const usePagination = create((set) => ({
  talkPostData: [],
  setTalkPostData: (data) => set({ talkPostData: data }),
  totalResults: 0,
  setTotalResults: (results) => set({ totalResults: results }),
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),
  groupSize: 5,
  setGroupSize: (size) => set({ groupSize: size }),
  totalPages: 0,
  setTotalPages: (pages) => set({ totalPages: pages }),
}))
