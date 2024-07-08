import style from '../css/TalkPage.module.css';
import CommunityFilter from '../components/CommunityFilter';
import CommunityPostCon from '../components/CommunityPostCon';

import { buttonStore } from '../store/talkbuttonStore';
import { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';

function TalkPage() {
  const { setOnBtn } = buttonStore();
  const { setOnCommuCate } = useCategoryStore();

  const goPostWrite = () => {
    window.location = '/postWrite';
  };
  useEffect(() => {
    setOnBtn('all');
    setOnCommuCate('talk');
  }, []);

  return (
    <main className={`mw ${style.talkPage}`}>
      <CommunityFilter />
      <CommunityPostCon />
      <button className={style.writeBtn} onClick={goPostWrite}>
        글쓰기
      </button>
    </main>
  );
}

export default TalkPage;
