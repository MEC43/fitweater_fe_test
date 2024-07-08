import style from '../css/CommunityPostCon.module.css';
import CommunityPost from './CommunityPost';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePostData } from '../store/postDataStore';

function CommunityPostCon() {
  const { allPostsData, fetchPosts, hasMore, currentFilter, page, resetPosts } =
    usePostData();
  console.log('불러온 글', allPostsData);
  console.log('필터 카테고리', currentFilter);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef(null);
  const loadingRef = useRef(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && hasMore) {
        fetchPosts(currentFilter);
      }
    },
    [isLoading, hasMore, fetchPosts, currentFilter]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0.5,
    });
    if (observerRef.current) {
      observer.observe(observerRef.current);
    }
    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [handleObserver]);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      await resetPosts();
      await fetchPosts(currentFilter, 1);
      console.log('지금 페이지', page);
      setIsLoading(false);
    };
    loadInitialData();
  }, [resetPosts, fetchPosts, currentFilter]);

  useEffect(() => {
    return () => {
      console.log('컴포넌트 언마운트. fetchPosts 실행');
      fetchPosts();
    };
  }, []);

  if (!Array.isArray(allPostsData)) {
    console.error('allPostsData is not an array:', allPostsData);
    return (
      <p>
        데이터를 불러오는 중 오류가 발생했습니다. 페이지를 새로고침해 주세요.
      </p>
    );
  }

  return (
    <ul className={style.commuListCon}>
      {allPostsData &&
        allPostsData.map((post) => (
          <CommunityPost key={post._id} post={post} />
        ))}
      {(hasMore || isLoading) && (
        <li ref={observerRef} className={style.loadingContainer}>
          <div
            ref={loadingRef}
            className={`fontBodyM ${style.loadingIndicator}`}
          >
            패션날씨 톡 게시글 불러오는 중☁️☁️
          </div>
        </li>
      )}
      {!hasMore && (
        <li className={`fontBodyM ${style.endMessage}`}>
          ☁️ 모든 게시물을 불러왔습니다 ☁️
        </li>
      )}
    </ul>
  );
}

export default CommunityPostCon;
