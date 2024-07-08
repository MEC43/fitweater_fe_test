import style from '../css/DetailContentCon.module.css';

import DetailContentArea from './DetailContentArea';
import DetailTitleArea from './DetailTitleArea';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function DetailContentCon({ fetchPostDetail }) {
  const { postId } = useParams();

  useEffect(() => {
    fetchPostDetail();
  }, [postId]);

  return (
    <section className={style.detailContent}>
      <DetailTitleArea fetchPostDetail={fetchPostDetail} postId={postId} />
      <DetailContentArea fetchPostDetail={fetchPostDetail} />
    </section>
  );
}

export default DetailContentCon;
