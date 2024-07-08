import style from '../css/CommuCollTalk.module.css';

import { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';
import CommuCollectionCon from '../components/CommuCollectionCon';

function CommuCollTalk() {
  const { setOnMyPageCate } = useCategoryStore();
  useEffect(() => {
    setOnMyPageCate('talk');
  }, []);

  return (
    <main className={`mw ${style.commuCollTalk}`}>
      <CommuCollectionCon />
    </main>
  );
}

export default CommuCollTalk;
