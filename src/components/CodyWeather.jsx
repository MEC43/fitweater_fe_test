import style from "../css/CodyWeather.module.css";
import { useEffect } from "react";
import useFetchStore from "../store/fetchStore";

const CodyWeather = ({ selectDate, setSelectDate }) => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    fetchWeatherData,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
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
    <section className={style.present}>
      <div className={style.temperature}>
        <span>{temperature}°C</span>
        <div className={style.minmax}>
          <p className="fontTitleS">최고/최저</p>
          <p className="fontTitleXL">
            {maxTemp}°C/{minTemp}°C
          </p>
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

export default CodyWeather;
