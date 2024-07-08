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
    pmSKY,
    pmPTY,
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

  return (
    <section className={style.wrap}>
      <div className={style.weekly}>
        <h2 className="fontHead3">주간별 날씨!</h2>
        <ul className={style.con}>
          <li className={style.list}>
            <span className="fontTitleS">토요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto100.svg" alt="강수확률" />
              <span className="fontTitleS">80%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/overcastNrain.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcastNrain.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">29°C</span>
              <span className="fontTitleL">23°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">일요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
              <span className="fontTitleS">30%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/cloudy.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcast.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">29°C</span>
              <span className="fontTitleL">24°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">월요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto100.svg" alt="강수확률" />
              <span className="fontTitleS">80%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/overcastNrain.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcastNrain.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">27°C</span>
              <span className="fontTitleL">24°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">화요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto100.svg" alt="강수확률" />
              <span className="fontTitleS">80%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/overcastNrain.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcastNrain.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">29°C</span>
              <span className="fontTitleL">23°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">수요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
              <span className="fontTitleS">40%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/overcast.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcast.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">29°C</span>
              <span className="fontTitleL">23°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">목요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
              <span className="fontTitleS">60%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/cloudy.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcastNrain.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">29°C</span>
              <span className="fontTitleL">22°C</span>
            </div>
          </li>
          <li className={style.list}>
            <span className="fontTitleS">금요일</span>
            <div className={style.prob}>
              <img src="img/icons/common/probUpto80.svg" alt="강수확률" />
              <span className="fontTitleS">60%</span>
            </div>
            <div className={style.icons}>
              <img src="img/icons/weather/cloudy.svg" alt="오전날씨" />
              <img src="img/icons/weather/overcastNrain.svg" alt="오후날씨" />
            </div>
            <div className={style.maxmin}>
              <span className="fontTitleL">30°C</span>
              <span className="fontTitleL">23°C</span>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Weekly;
