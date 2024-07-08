import style from "../css/H2.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const H2Codi = ({ setSelectDate }) => {
  // M/D 형식
  const getDate = (addDay) => {
    const date = new Date();
    date.setDate(date.getDate() + addDay);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}`;
  };

  // YYYYMMDD 형식
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };

  const dateClick = (addDay) => {
    const date = new Date();
    date.setDate(date.getDate() + addDay);
    setSelectDate(formatDate(date));
    console.log("YYYYMMDD---", formatDate(date));
  };

  return (
    <section className={style.header2Main}>
      <div className={style.h2Con}>
        <h2 className="fontHead2">코디</h2>
        <div className={style.btnCon}>
          <button
            className={`fontBodyM ${style.btnDate} ${style.active}`}
            onClick={() => dateClick(0)}
          >
            오늘
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(1)}
          >
            {getDate(1)}
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(2)}
          >
            {getDate(2)}
          </button>
          <button
            className={`fontBodyM ${style.btnDate}`}
            onClick={() => dateClick(3)}
          >
            {getDate(3)}
          </button>
        </div>
      </div>
    </section>
  );
};

export default H2Codi;
