import { create } from "zustand";

export const useVerifyPost = create((set) => ({
  postTitle: "",
  setPostTitle: (postTitle) => set({ postTitle }),
  postContent: "",
  setPostContent: (postContent) => set({ postContent }),
  file: null,
  setFile: (file) => set({ file }),
  titleErrMsg: "",
  setTitleErrMsg: (titleErrMsg) => set({ titleErrMsg }),
  contentErrMsg: "",
  setContentErrMsg: (contentErrMsg) => set({ contentErrMsg }),
  onReview: "no",
  setOnReview: (text) => set({ onReview: text }),
  selectPostCate: "weather",
  setSelectPostCate: (text) => set({ selectPostCate: text }),
}))
