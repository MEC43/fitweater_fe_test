import { create } from 'zustand'
import { url } from './ref';

export const usePostData = create((set, get) => ({
  //날씨패션톡 리스트용
  allPostsData: [],
  setPostsData: (newPosts) => set({ allPostsData: newPosts }),

  originalData: [],
  setOriginalData: (originalData) => set({ originalData }),

  page: 1,
  hasMore: true,
  currentFilter: 'all',
  resetPosts: () => set({ allPostsData: [], page: 1, hasMore: true }),

  //서버에서 날씨패션톡 게시물 데이터 가져오는 함수
  fetchPosts: async (filter = 'all', requestedPage) => {
    const { page } = get();
    console.log('fetchPosts 호출됨:', filter, requestedPage);

    // 페이지가 명시적으로 요청되지 않았다면 현재 상태의 페이지를 사용
    const currentPage = requestedPage !== undefined ? requestedPage : page;

    try {
      const response = await fetch(`${url}/posts/getAllPosts?page=${currentPage}&filter=${filter}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      const newPosts = data.postsList;
      console.log('데이터', data);
      console.log('받아온 포스트', newPosts);
      set((state) => ({
        allPostsData: page === 1 ? newPosts : [...state.allPostsData, ...newPosts],
        originalData: page === 1 ? newPosts : [...state.originalData, ...newPosts],
        hasMore: data.hasMore,
        currentFilter: filter,
        page: currentPage + 1
      }))
    } catch (error) {
      console.error('데이터를 불러오는 중 오류 발생', error);
    }
  },

  applyFilter: (filter) => {
    const { originalData } = get();
    if (filter === 'all') {
      set({ allPostsData: originalData, currentFilter: 'all' })
    } else {
      const filtered = originalData.filter((post) => post.category === filter)
      set({ allPostsData: filtered, currentFilter: filter })
    }

  },

  //상세페이지용
  postDetail: [],
  setPostDetail: (postDetail) => set({ postDetail }),

  newPostId: null,
  setNewPostId: (postId) => set({ newPostId: postId }),
  clearNewPostId: () => set({ newPostId: null }),

  isLike: false,
  setLiketoggle: (isLike) => set({ isLike }),
  likes: 0,
  setLikes: (updatelikes) => set({ likes: updatelikes }),

  originImgPath: null,
  setOriginImgPath: (path) => set({ originImgPath: path }),
}))
