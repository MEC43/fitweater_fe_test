import style from '../css/FashionFeedPage.module.css';
import { useEffect } from 'react';
import { useCategoryStore } from '../store/categoryStore';

function FashionFeedPage() {
  const { setOnCommuCate } = useCategoryStore();
  useEffect(() => {
    setOnCommuCate('feed');
  }, []);

  return (
    <main className={`mw ${style.fashionFeedPage}`}>
      <div>
        <iframe
          src="https://www.musinsa.com/app/stylecontents/lists?sortType=RECENT"
          className={style.embedded}
          title="External Website"
        />
      </div>
    </main>
  );
}

export default FashionFeedPage;
