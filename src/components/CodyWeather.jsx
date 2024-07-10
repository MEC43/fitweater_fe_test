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
    secTMX,
    thiTMX,
    minTemp,
    secTMN,
    thiTMN,
    popValue,
    secPOP,
    thiPOP,
    dust,
    uv,
  } = useFetchStore();
  // console.log(popValue);

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

  const getTempRange = () => {
    switch (selectDate) {
      case 0:
        return `${maxTemp}°C/${minTemp}°C`;
      case 1:
        return `${secTMX}°C/${secTMN}°C`;
      case 2:
        return `${thiTMX}°C/${thiTMN}°C`;
      default:
        return `${maxTemp}°C/${minTemp}°C`;
    }
  };

  const getPOPRange = () => {
    switch (selectDate) {
      case 0:
        return `${popValue}%`;
      case 1:
        return `${secPOP}%`;
      case 2:
        return `${thiPOP}%`;
      default:
        return `${popValue}%`;
    }
  };

  return (
    <section className={style.present}>
      <div className={style.temperature}>
        <span>{temperature}°C</span>
        <div className={style.minmax}>
          <p className="fontTitleS">최고/최저</p>
          <p className="fontTitleXL">{getTempRange()}</p>
        </div>
      </div>
      <div className={style.others}>
        <div className={style.con}>
          <span className="fontTitleS">강수확률</span>
          <p className="fontTitleXL">{getPOPRange()}</p>
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
