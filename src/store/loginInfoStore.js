import { create } from "zustand";
import { persist, createJSONStorage } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { url } from './ref';

const useLoginInfoStore = create(persist((set, get) => ({
  userInfo: {
    userid: null,
    username: null,
    userprofile: null,
    shortBio: null,
    usergender: null,
  },
  token: localStorage.getItem('token'),

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
  setUserid: (info) => set((state) => ({
    userInfo: { ...state.userInfo, userid: info },
  })),
  setUsername: (info) => set((state) => ({
    userInfo: { ...state.userInfo, username: info },
  })),
  setUserprofile: (info) => set((state) => ({
    userInfo: { ...state.userInfo, userprofile: info },
  })),
  setShortBio: (info) => set((state) => ({
    userInfo: { ...state.userInfo, shortBio: info },
  })),
  setUsergender: (info) => set((state) => ({
    userInfo: { ...state.userInfo, usergender: info },
  })),

  // 새로운 함수들
  setToken: (token) => set({ token }),

  loginWithToken: async (token) => {
    console.log("token 확인", token);
    if (token.includes('.')) {
      //일반 로그인
      try {
        const decodedToken = jwtDecode(token);
        console.log('디코딩토큰', decodedToken);
        set({
          token,
          userInfo: {
            userid: decodedToken.userid,
            username: decodedToken.username,
            userprofile: decodedToken.userprofile,
            shortBio: decodedToken.shortBio,
            usergender: decodedToken.usergender,
          },
        });
      } catch (error) {
        console.error('Invalid token', error);
        get().logout();
      }
    } else {
      try {
        //카카오 로그인
        await get().getUserData(token);
        set({ token });
        document.cookie = `token=${token}; path=/;`;//쿠키에도 토큰 저장!!
        console.log("카카오 로그인으로 분류됨");
      } catch (err) {
        console.log(err);
        get().logout();
      }
    }
  },
  getUserData: async (token) => {
    const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });
    const user = await response.json();
    set({
      userInfo: {
        userid: user.id,
        username: user.properties.nickname,
        userprofile: user.properties.profile_image,
        shortBio: null,
        usergender: null,
      },
    });
    await get().registerKakaoUser(
      user.id,
      user.properties.nickname,
      user.properties.profile_image
    );
    console.log("카카오로그인 정보 확인 ", user);
    return user;
  },
  registerKakaoUser: async (userid, username, profile_image) => {
    try {
      const response = await fetch(`${url}/kakao-register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userid, username, profile_image }),
      });
      if (!response.ok) {
        throw new Error('Failed to register Kakao user');
      }
      set((state) => ({
        userInfo: {
          ...state.userInfo,
          userid,
          username,
          userprofile: profile_image
        },
      }));
    } catch (error) {
      console.error('Error registering Kakao user', error);
    }
  },
  //로그아웃
  logout: async () => {
    const response = await fetch(`${url}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      document.cookie =
        'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'; //쿠키 만료 시점을 과거로 설정하여 덮어쓰는 방식으로 삭제
      localStorage.removeItem('token');
      localStorage.removeItem('login-info-storage');
      get().setUserInfoAll(null, null, null); // 사용자 정보 초기화
      // navigate("/");
      window.location.href = '/';
    } else {
      console.error('Failed to logout');
    }
  },

  //사용자 정보 get요청
  fetchUserInfo: async (navigate) => {
    const { userInfo } = get()
    const userId = userInfo.userid
    try {
      const response = await fetch(`${url}/user/getUserInfo?userId=${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('마이페이지 받아온 유저정보', data);
      if (data) {
        set({
          userInfo: {
            userid: data.userid,
            username: data.username,
            userprofile: data.userprofile,
            shortBio: data.shortBio,
            usergender: data.usergender,
          },
        });
      }


    } catch (error) {
      console.error('Error fetching user info:', error);
      if (error.message === 'No token found') {
        navigate('/login');
      }
    }
  },
}),
  {
    name: 'login-info-storage',
    storage: createJSONStorage(() => localStorage),

  }
)
);

export { useLoginInfoStore };
