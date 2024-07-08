import { create } from "zustand";

const useLoginInfoStore = create((set) => ({
  userInfo: {
    userid: null,
    username: null,
    userprofile: null,
  },

  setUserInfoAll: (id, name, profile) => set((state) => ({
    userInfo: {
      ...state.userInfo,
      userid: id,
      username: name,
      userprofile: profile
    }
  })),
  setUserid: (info) => set((state) => ({
    userInfo: {
      ...state.userInfo,
      userid: info
    }
  })),
  setUsername: (info) => set((state) => ({
    userInfo: {
      ...state.userInfo,
      username: info
    }
  })),
  setUserprofile: (info) => set((state) => ({
    userInfo: {
      ...state.userInfo,
      userprofile: info
    }
  })),
}));

export { useLoginInfoStore };
