import style from '../css/CommuCollectionCon.module.css';

import { useEffect } from 'react';

import CommunityPost from './CommunityPost';
import { url } from '../store/ref';
import Pagination from './Pagination';
import { usePagination } from '../store/paginationStore';
import { useLoginInfoStore } from '../store/loginInfoStore';

function CommuCollectionCon() {
  const {
    talkPostData,
    setTalkPostData,
    totalResults,
    setTotalResults,
    currentPage,
    setCurrentPage,
    setTotalPages,
  } = usePagination();

  useEffect(() => {
    return () => {
      setCurrentPage(1);
    };
  }, []);
  useEffect(() => {
    fecthTalkData();
  }, [currentPage]);

  const { userInfo } = useLoginInfoStore();
  const userId = userInfo.userid;
  const fecthTalkData = async () => {
    try {
      const response = await fetch(
        `${url}/mypage/talk/${userId}?page=${currentPage}`,
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      const talkPostList = data.talkPostList;
      console.log('받아온 데이터', data);
      console.log('내 작성글 데이터', talkPostList);
      console.log('총 데이터 수', data.totalPosts);
      if (response.ok) {
        setTalkPostData(talkPostList);
        setTotalResults(data.totalPosts);
        setTotalPages(data.totalPages);
      }
      // 현재 페이지가 총 페이지 수보다 크면 마지막 페이지로 이동
      if (currentPage > data.totalPages) {
        setCurrentPage(data.totalPages);
      }
    } catch (error) {
      console.error('작성글 get요청 오류', error);
    }
  };

  return (
    <>
      {talkPostData.length === 0 ? (
        <p className={style.loadingMsg}>작성글이 없습니다.</p>
      ) : (
        <>
          <p className={`fontBodyM ${style.myTotal}`}>총 {totalResults} 개</p>
          <ul className={style.talkListCon}>
            {talkPostData &&
              talkPostData.map((post) => (
                <CommunityPost key={post._id} post={post} />
              ))}
          </ul>
          <Pagination />
        </>
      )}
    </>
  );
}

export default CommuCollectionCon;
