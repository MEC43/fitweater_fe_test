import React, { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoBackStore } from '../store/goBackStore';

import style from "../css/H2.module.css";

const H2CodiLog = ({ codiView, setCodiView }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const goBack = useGoBackStore((state) => state.goBack);


  const handleGoBack = () => {
    goBack(location, navigate);
  };

  useEffect(() => {
    const switchBG = document.querySelector(`.${style.switchBG}`);
    // console.log(`zzz ${codiView} ${switchBG}`);
    if (codiView === "gallery") {
      switchBG.style.left = "calc(100% - 42px)";
      document.querySelector(`.${style.switchGallery}`).style.color =
        "var(--white)";
      document.querySelector(`.${style.switchCalendar}`).style.color =
        "var(--grey-600)";
    } else if (codiView === "calendar") {
      switchBG.style.left = "2px";
      document.querySelector(`.${style.switchCalendar}`).style.color =
        "var(--white)";
      document.querySelector(`.${style.switchGallery}`).style.color =
        "var(--grey-600)";
    }
  }, [codiView]);


  return (
    <section className={style.header2}>
      <img
        src="img/icons/common/goBack.svg"
        onClick={handleGoBack}
        className={style.btnGoBack}
        alt="goBack"
      />
      <h2 className="fontHead2">내 코디 기록</h2>
      <div className={` ${style.switchCodiView} fontBodyS`}>
        <a
          href="#"
          className={style.switchCalendar}
          onClick={() => setCodiView("calendar")}
        >
          달력
        </a>
        <a
          href="#"
          className={style.switchGallery}
          onClick={() => setCodiView("gallery")}
        >
          갤러리
        </a>
        <span className={style.switchBG}>{/* 배경색 */}</span>
      </div>
    </section>
  );
};

export default H2CodiLog;
