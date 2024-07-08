import style from '../css/FashionFeedPage.module.css';
import FashionFeedModal from '../components/FashionFeedModal';
import { useEffect, useState } from 'react';
import { url } from '../store/ref';
import { useCategoryStore } from '../store/categoryStore';

function FashionFeedPage() {
  const { setOnCommuCate } = useCategoryStore();
  useEffect(() => {
    setOnCommuCate('feed');
  }, []);

  //  시도해보는 중
  const [onFshModal, setOnFshModal] = useState(false);
  const [feeds, setFeeds] = useState(true);
  const [error, serError] = useState(null);

  // const INSTA_ACCOUNT_ID = '17841466980397718';
  // const INSTA_ACCESS_TOKEN =
  //   'EABwxhKkQmXQBOxS5Tyh1nLr96AUsZAEzoa1ZAI1ZBGizJXvTGgZBzmCZAqo7KO9hDHFbYyyBRP12NmZBrW7gmryZAhcVjJKoWC4B5zqLXQOsTZBuaKY7t7ZCJZCHv2WcUZBNMlOaPvBEXMPUVYqvxtZBTZBK7FxXZCipf8O9padf6yj6ZC3WJk61SSHCVFS9jnOGoPwFyZBn';
  // const fetchFeeds = async () => {
  //   try {
  //     const response = await fetch(
  //       `https://graph.facebook.com/v20.0/${INSTA_ACCOUNT_ID}?fields=business_discovery.username(rimjunhee){id,media.limit(10),username}&access_token=${INSTA_ACCESS_TOKEN}`
  //     );
  //     const data = await response.json();
  //     const mediaData = data.business_discovery.media.data;
  //     const mediaId = mediaData.map((media) => media.id);
  //     console.log('인스타로 요청한 응답', response);
  //     console.log('인스타로 요청한 데이터', data);
  //     console.log('인스타로 요청한 미디어 데이터 배열', mediaData);
  //     console.log('인스타로 요청한 미디어 아이디', mediaId);
  //     // getMediaUrls(mediaId);
  //   } catch (error) {
  //     console.error('인스타 피드 불러오기 에러', error);
  //   }
  // };

  // const getMediaUrls = async (mediaId) => {
  //   mediaId.map(async (mid) => {
  //     const response = await fetch(
  //       `https://graph.facebook.com/v20.0/${mid}?fields=username&access_token=${INSTA_ACCESS_TOKEN}`
  //     );
  //     const data = await response.json();
  //     console.log('미디어아이디로 요청한 res', response);
  //     console.log('미디어아이디로 요청한 data', data);
  //     // return { ...item, ...data };
  //   });
  // };

  // useEffect(() => {
  //   fetchFeeds();
  // }, []);

  // const clickOneFeed = () => {
  //   setOnFshModal(true);
  // };

  return (
    <main className={`mw ${style.fashionFeedPage}`}>
      <div>
        <iframe
          src="https://www.musinsa.com/app/stylecontents/lists?sortType=RECENT"
          className={style.embedded}
          title="External Website"
        />
      </div>
      {/* <h3 className={`fontHead3 ${style.fshFeedTitle}`}>
        패션 인플루언서의 코디
      </h3>
      <ul className={style.fshFeedCon}>
        <li onClick={clickOneFeed}>피드</li>
        <li>피드</li>
        <li>피드</li>
        <li>피드</li>
      </ul>
      <FashionFeedModal onFshModal={onFshModal} setOnFshModal={setOnFshModal} /> */}
    </main>
  );
}

export default FashionFeedPage;
