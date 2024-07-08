import style from '../css/CommunityFilter.module.css';
import TodayCoordiButton from './TodayCoordiButton';
import TodayWeatherButton from './TodayWeatherButton';
import { buttonStore } from '../store/talkbuttonStore';
import { usePostData } from '../store/postDataStore';

function CommunityFilter() {
  const { resetPosts, applyFilter, fetchPosts, setPostsData, originalData } =
    usePostData();
  const { onBtn, setOnBtn } = buttonStore();

  const handleFilter = (filter) => {
    setOnBtn(filter);
    resetPosts();
    applyFilter(filter);
    fetchPosts(filter);
  };

  return (
    <div className={style.commuCategory}>
      <h3 className="fontHead3">날씨패션 톡</h3>
      <div className={style.commuCateBtnCon}>
        <button
          className={`fontBodyM ${style.all} ${
            onBtn === 'all' ? style.on : ''
          } `}
          onClick={() => {
            handleFilter('all');
          }}
        >
          전체
        </button>
        <TodayWeatherButton
          onClick={() => {
            handleFilter('weather');
          }}
        />
        <TodayCoordiButton
          onClick={() => {
            handleFilter('coordi');
          }}
        />
      </div>
    </div>
  );
}

export default CommunityFilter;
