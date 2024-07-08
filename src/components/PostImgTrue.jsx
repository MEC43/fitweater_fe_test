import style from '../css/PostImgTrue.module.css';

function PostImgTrue({ src }) {
  return (
    <div className={style.postImgTrue}>
      <img src={src} alt="미리보기이미지" />
    </div>
  );
}

export default PostImgTrue;
