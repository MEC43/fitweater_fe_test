import { create } from "zustand";

const useLoginInfoStore = create((set) => ({
  userInfo: {
    userid: null,
    username: null,
    userprofile: null,
    shortBio: null,
    usergender: null,
  },

  setUserInfoAll: (id, name, profile, bio, gender) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userid: id,
        username: name,
        userprofile: profile,
        shortBio: bio,
        usergender: gender,
      },
    })),
  setUserid: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userid: info,
      },
    })),
  setUsername: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        username: info,
      },
    })),
  setUserprofile: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        userprofile: info,
      },
    })),
  setShortBio: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        shortBio: info,
      },
    })),
  setUsergender: (info) =>
    set((state) => ({
      userInfo: {
        ...state.userInfo,
        usergender: info,
      },
    })),
}));

export { useLoginInfoStore };
