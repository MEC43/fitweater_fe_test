import style from '../css/CommunityCategory.module.css';

import { Link, Outlet } from "react-router-dom";
import { buttonStore } from "../store/talkbuttonStore";
import { useCategoryStore } from "../store/categoryStore";


function CommunityCategory() {
  const { onCommuCate, setOnCommuCate } = useCategoryStore();

  const { setOnBtn } = buttonStore();
  const talkOn = () => {
    setOnCommuCate('talk');
  };
  const feedOn = () => {
    setOnBtn('all');
    setOnCommuCate('feed');
  };

  return (
    <div className={`mw ${style.communityCategory}`}>
      <div className={style.communityHd}>
        <span className="fontHead2">커뮤니티</span>
        <div className={style.buttonCon}>
          <Link
            to="/community"
            className={`fontBodyM ${onCommuCate === 'talk' ? style.on : ''}`}
            onClick={talkOn}
          >
            날씨패션 톡
          </Link>
          <Link
            to="/community/feed"
            className={`fontBodyM ${onCommuCate === 'feed' ? style.on : ''}`}
            onClick={feedOn}
          >
            스타일 모아보기
            <p className="fontBodyS">from musinsa</p>
          </Link>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default CommunityCategory;
