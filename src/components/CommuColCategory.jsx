import style from '../css/CommuColCategory.module.css';
import { Link, Outlet } from 'react-router-dom';
import { useCategoryStore } from '../store/categoryStore';

function CommuColCategory() {
  const { onMyPageCate, setOnMyPageCate } = useCategoryStore();

  return (
    <div className={`mw ${style.commuCollCate}`}>
      <div className={style.commuCollCateHd}>
        <div className={style.buttonCon}>
          <Link
            to="/comuCollect?referrer=clctn"
            className={`fontBodyM ${onMyPageCate === 'talk' ? style.on : ''}`}
            onClick={() => {
              setOnMyPageCate('talk');
            }}
          >
            작성글
          </Link>
          <Link
            to="/comuCollect/comment?referrer=clctn"
            className={`fontBodyM ${
              onMyPageCate === 'comment' ? style.on : ''
            }`}
            onClick={() => {
              setOnMyPageCate('comment');
            }}
          >
            작성댓글
          </Link>
          <Link
            to="/comuCollect/like?referrer=clctn"
            className={`fontBodyM ${onMyPageCate === 'like' ? style.on : ''}`}
            onClick={() => {
              setOnMyPageCate('like');
            }}
          >
            좋아요
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default CommuColCategory;
