import style from '../css/CommunitySubCategory.module.css';

function CommunitySubCategory({ category }) {
  return (
    <div>
      <span
        className={`fontTitleS ${style.weatherCate} ${
          category === 'weather' ? style.on : ''
        }`}
      >
        오늘날씨
      </span>
      <span
        className={`fontTitleS ${style.coordiCate} ${
          category === 'coordi' ? style.on : ''
        }`}
      >
        오늘코디
      </span>
    </div>
  );
}

export default CommunitySubCategory;
