import style from "../css/H2.module.css";
import { useState } from "react";

const H2Codi = ({ setSelectDate }) => {
  const [activeButton, setActiveButton] = useState(0);

  // M/D 형식
  const getDate = (addDay) => {
    const date = new Date();
    date.setDate(date.getDate() + addDay);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  const dateClick = (day) => {
    setActiveButton(day);
    setSelectDate(day);
  };

  return (
    <section className={style.header2Main}>
      <div className={style.h2Con}>
        <h2 className="fontHead2">코디</h2>
        <div className={style.btnCon}>
          {[0, 1, 2].map((day, index) => (
            <button
              key={index}
              className={`fontBodyM ${style.btnDate} ${
                activeButton === day ? style.active : ""
              }`}
              onClick={() => dateClick(day)}
            >
              {day === 0 ? "오늘" : getDate(day)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default H2Codi;
