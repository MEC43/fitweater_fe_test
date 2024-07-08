import style from '../css/DetailPage.module.css';

import DetailCommentsCon from '../components/DetailCommentsCon';
import DetailContentCon from '../components/DetailContentCon';
import PagesHeader from '../components/PagesHeader';

import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../components/Footer';

function DetailPage() {
  const { postDetail, setPostDetail, setLikes, setOriginImgPath } =
    usePostData();
  const { postId } = useParams();

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`${url}/posts/postDetail/${postId}`); //
      const data = await response.json();
      if (response.ok) {
        setPostDetail(data);
        setLikes(data.likeCount);
        setOriginImgPath(data.image);
        console.log(postDetail);
      }
    } catch (error) {
      console.error('상세페이지 오류', error);
    }
  };

  useEffect(() => {
    fetchPostDetail();
  }, []);

  return (
    <>
      <PagesHeader title={'날씨패션톡'} />
      <main className={`mw ${style.detailPage}`}>
        <DetailContentCon fetchPostDetail={fetchPostDetail} />
        <DetailCommentsCon fetchPostDetail={fetchPostDetail} />
      </main>
      <Footer />
    </>
  );
}

export default DetailPage;
