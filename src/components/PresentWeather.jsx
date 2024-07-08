import style from "../css/PresentWeather.module.css";
import { useEffect } from "react";
import useFetchStore from "../store/fetchStore";

const PresentWeather = () => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
    temperature,
    maxTemp,
    minTemp,
    dust,
    uv,
    popValue,
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
  }, [
    location.latitude,
    location.longitude,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
  ]);

  return (
    <section className={style.present}>
      <div className={style.temperature}>
        <p>{temperature}°C</p>
        <div className={style.minmax}>
          <span className="fontTitleS">최고</span>
          <span className="fontTitleXL">{maxTemp}°C</span>
          <br />
          <span className="fontTitleS">최저</span>
          <span className="fontTitleXL">{minTemp}°C</span>
        </div>
      </div>
      <div className={style.others}>
        <div className={style.con}>
          <span className="fontTitleS">강수확률</span>
          <p className="fontTitleXL">{popValue}%</p>
        </div>
        <div className={style.con}>
          <span className="fontTitleS">미세먼지</span>
          <p className="fontTitleXL">{dust}</p>
        </div>
        <div className={style.con}>
          <span className="fontTitleS">자외선</span>
          <p className="fontTitleXL">{uv}</p>
        </div>
      </div>
    </section>
  );
};

export default PresentWeather;
