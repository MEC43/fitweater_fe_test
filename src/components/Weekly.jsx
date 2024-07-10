import style from "../css/Weekly.module.css";
import useFetchStore from "../store/fetchStore";
import { useEffect } from "react";

const Weekly = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
    maxTemp,
    secTMX,
    thiTMX,
    minTemp,
    secTMN,
    thiTMN,
    amSKY,
    amPTY,
    pmSKY,
    pmPTY,
    secAmSKY,
    secAmPTY,
    thiAmSKY,
    thiAmPTY,
    secPmSKY,
    secPmPTY,
    thiPmSKY,
    thiPmPTY,
    firPOP,
    secPOP,
    thiPOP,
  } = useFetchStore();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      fetchWeatherData(
        location.latitude,
        location.longitude,
        regionFirstName,
        regionSecondName
      );
    }
  }, [location, regionFirstName, regionSecondName, fetchWeatherData]);

  const getDayName = (addDays) => {
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const today = new Date();
    const targetDate = new Date(
      today.getTime() + addDays * 24 * 60 * 60 * 1000
    );
    return days[targetDate.getDay()] + "요일";
  };

  const weatherIcons = {
    "1_0": "img/icons/weather/clear.svg", // 맑음
    "4_0": "img/icons/weather/overcast.svg", // 흐림
    "3_0": "img/icons/weather/cloudy.svg", // 구름많음
    "3_1": "img/icons/weather/cloudyNrain.svg", // 구름많고 비
    "4_1": "img/icons/weather/overcastNrain.svg", // 흐리고 비
    "3_4": "img/icons/weather/cloudyNshower.svg", // 구름많고 소나기
    "4_4": "img/icons/weather/overcastNshower.svg", // 흐리고 소나기
    "4_3": "img/icons/weather/overcastNsnow.svg", // 흐리고 눈
    "3_3": "img/icons/weather/cloudyNsnow.svg", // 구름많고 눈
    "3_2": "img/icons/weather/cloudyNsleet.svg", // 구름많고 비/눈
    "4_2": "img/icons/weather/overcastNsleet.svg", // 흐리고 비/눈
  };

  const getWeatherIcon = (sky, pty) => {
    const key = `${sky}_${pty}`;
    return weatherIcons[key] || weatherIcons["1_0"]; // 기본값으로 맑음 아이콘 사용
  };

  const getPOPIcon = (pop) => {
    if (pop >= 0 && pop <= 29) {
      return "img/icons/common/probUpto30.svg";
    } else if (pop >= 30 && pop <= 69) {
      return "img/icons/common/probUpto80.svg";
    } else if (pop >= 70 && pop <= 100) {
      return "img/icons/common/probUpto100.svg";
    } else {
      return "img/icons/common/probUpto30.svg"; // 기본값으로 30 아이콘 사용
    }
  };

  return (
    <section className={style.wrap}>
      <div className={style.weekly}>
        <h2 className="fontHead3">주간별 날씨!</h2>
        <ul className={style.con}>
          <li className={style.list}>
            <span className="fontTitleS">{getDayName(0)}</span>
            <div className={style.prob}>
              <img src={getPOPIcon(firPOP)} alt="강수확률" />
              <span className="fontTitleS">{firPOP}%</span>
            </div>
            <div className={style.icons}>
              <img src={getWeatherIcon(amSKY, amPTY)} alt="오전날씨" />
              <img src={getWeatherIcon(pmSKY, pmPTY)} alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">{maxTemp}°C</span>
              <span className="fontTitleL">{minTemp}°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">{getDayName(1)}</span>
            <div className={style.prob}>
              <img src={getPOPIcon(secPOP)} alt="강수확률" />
              <span className="fontTitleS">{secPOP}%</span>
            </div>
            <div className={style.icons}>
              <img src={getWeatherIcon(secAmSKY, secAmPTY)} alt="오전날씨" />
              <img src={getWeatherIcon(secPmSKY, secPmPTY)} alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">{secTMX}°C</span>
              <span className="fontTitleL">{secTMN}°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">{getDayName(2)}</span>
            <div className={style.prob}>
              <img src={getPOPIcon(thiPOP)} alt="강수확률" />
              <span className="fontTitleS">{thiPOP}%</span>
            </div>
            <div className={style.icons}>
              <img src={getWeatherIcon(thiAmSKY, thiAmPTY)} alt="오전날씨" />
              <img src={getWeatherIcon(thiPmSKY, thiPmPTY)} alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">{thiTMX}°C</span>
              <span className="fontTitleL">{thiTMN}°C</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Weekly;
