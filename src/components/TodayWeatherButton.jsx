import style from '../css/TodayWeatherButton.module.css';
import { buttonStore } from '../store/talkbuttonStore';

function TodayWeatherButton({ onClick }) {
  const { onBtn, setOnBtn } = buttonStore();

  return (
    <button
      id="todayW"
      className={`fontBodyM ${style.todayW} ${
        onBtn === 'weather' ? style.on : ''
      }`}
      onClick={onClick}
    >
      오늘날씨
    </button>
  );
}

export default TodayWeatherButton;
