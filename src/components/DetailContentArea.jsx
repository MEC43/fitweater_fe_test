import style from '../css/DetailContentArea.module.css';
import DetailCoordiReview from './DetailCoordiReview';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';
import React from 'react';

function DetailContentArea({ fetchPostDetail }) {
  const { postDetail } = usePostData();

  function formatPostContent(content) {
    if (!content) {
      return null; // 혹은 빈 배열 또는 다른 적절한 반환값
    }

    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  }

  return (
    <div className={style.contentArea}>
      {postDetail.image ? (
        <>
          <p className="fontBodyM">{formatPostContent(postDetail.content)}</p>
          <div className={style.imgCon}>
            <img src={`${url}/${postDetail.image}`} alt="이미지" />
          </div>
        </>
      ) : (
        <p className="fontBodyM" style={{ minHeight: '10rem' }}>
          {formatPostContent(postDetail.content)}
        </p>
      )}
      {postDetail.coordiReview && (
        <DetailCoordiReview fetchPostDetail={fetchPostDetail} />
      )}
    </div>
  );
}

export default DetailContentArea;
