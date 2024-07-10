
import style from "../css/TodayCoordiButton.module.css";
import { buttonStore } from "../store/talkbuttonStore";


function TodayCoordiButton({ onClick }) {
  const { onBtn } = buttonStore();

  return (
    <button
      id="todayC"

      className={`fontBodyM ${style.todayC} ${onBtn === "coordi" ? style.on : ""
        }`}

      onClick={onClick}
    >
      오늘코디
    </button>
  );
}

export default TodayCoordiButton;
