import style from '../css/CommunityPost.module.css';
import CommunityCategory from './CommunitySubCategory';
import { useNavigate } from 'react-router-dom';
import { url } from '../store/ref';
import React from 'react';

const CommunityPost = React.forwardRef(({ post }, ref) => {
  const navigate = useNavigate();
  const goDetail = () => {
    navigate(`/detail/${post._id}`);
  };

  const date = new Date(post.createdAt);
  const formatDate = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <li className={style.comuList} onClick={goDetail} ref={ref}>
      <CommunityCategory category={post.category} />
      <strong className="fontTitleS">{post.title}</strong>
      <div className={`fontTitleXS ${style.postInfo}`}>
        <span>{post.username || post.userId}</span>
        <span>{formatDate}</span>
        <div className={style.commentIcon}>
          <i className="fa-regular fa-comment"></i>
          <span>{post.commentsCount}</span>
        </div>
        <div className={style.likeIcon}>
          <i className="fa-regular fa-heart"></i>
          <span>{post.likeCount}</span>
        </div>
      </div>
      <div className={style.postImg}>
        {post.image ? <img src={`${url}/${post.image}`} alt="이미지" /> : ''}
        {/* <img src="/img/img1.jpg" alt="이미지" /> */}
      </div>
    </li>
  );
});

export default CommunityPost;
