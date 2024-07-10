import { Link } from "react-router-dom";
import { useState } from "react";
import style from "../css/Codi.module.css";
import bgStyle from "../css/MainWeatherBG.module.css";
import Footer from "../components/Footer";

import CodiGuidelineBox from "../components/CodiGuidelineBox";
import MainweatherBG from "../components/MainWeatherBG";
import Header from "../components/Header";
import H2Codi from "../components/H2Codi";
import CodyWeather from "../components/CodyWeather";
import CodiTalk from "../components/CodiTalk";
import Avatar from "../components/Avatar";
import CodiLogBoxsMain from "../components/CodiLogBoxsMain";

const CodiMain = () => {
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}${month}${day}`;
  };
  const today = new Date();
  const [selectDate, setSelectDate] = useState(0);

  const [matchingUrl, setMatchingUrl] = useState({
    tops: "",
    bottoms: "",
    outers: "",
  });

  const [codiGuidelineBox, setCodiGuidelineBox] = useState(false);

  return (
    <main className={`mw ${style.codiMain}`}>
      <Header />
      <div className={bgStyle.MainweatherBGcon}>
        <H2Codi setSelectDate={setSelectDate} />
        <MainweatherBG />

        <div className={bgStyle.WeatherCon}>
          <CodyWeather selectDate={selectDate} setSelectDate={setSelectDate} />
        </div>
        <div className={bgStyle.MainAvatar}>
          <CodiTalk setMatchingUrl={setMatchingUrl} />
          <Avatar
            topUrl={matchingUrl.tops}
            bottomUrl={matchingUrl.bottoms}
            outerUrl={matchingUrl.outers}
          />
        </div>
      </div>

      <CodiLogBoxsMain />

      <div className={style.bigBtnCon}>
        <Link to={"/codiLog"} className={`fontBodyM ${style.bigBtn}`}>
          <span>내 코디 기록</span>
          <img src="img/icons/common/calendar.svg" alt="" />
        </Link>
        <button
          className={`fontBodyM ${style.bigBtn}`}
          onClick={() => setCodiGuidelineBox(true)}
        >
          <span>기온별 추천 의류 전체보기</span>
          <img src="img/icons/common/alertSquare.svg" alt="" />
        </button>
      </div>

      <Footer />

      {codiGuidelineBox === true ? (
        <CodiGuidelineBox
          codiGuidelineBox={codiGuidelineBox}
          setCodiGuidelineBox={setCodiGuidelineBox}
        />
      ) : (
        ""
      )}
    </main>
  );
};

export default CodiMain;
