import style from "../css/Hours.module.css";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState, useEffect } from "react";
import useFetchStore from "../store/fetchStore";

const Hours = () => {
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useState("cycle");
  const [activeFilter, setActiveFilter] = useState("cycle");
  const {
    location,
    regionFirstName,
    regionSecondName,
    tempData,
    skyData,
    ptyData,
    popData,
    dust,
    fetchLocation,
    fetchWeatherData,
  } = useFetchStore();
  const { kakao } = window;

  const btnToggle = () => {
    setChecked(!checked);
  };

  const activityClick = (activity) => {
    setSelected(activity);
    setActiveFilter(activity);
  };

  const date = new Date();
  const hour = date.getHours();
  const weatherHour = Array.from({ length: 12 }, (_, i) => (hour + i) % 24);

  useEffect(() => {
    fetchLocation();
  }, []);

  useEffect(() => {
    if (location.latitude && location.longitude) {
      const geocoder = new kakao.maps.services.Geocoder();
      const coords = new kakao.maps.LatLng(
        location.latitude,
        location.longitude
      );

      geocoder.coord2RegionCode(
        coords.getLng(),
        coords.getLat(),
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const region = result.find((item) => item.region_type === "H");
            if (region) {
              useFetchStore.setState({
                regionFirstName: region.region_1depth_name,
                regionSecondName: region.region_2depth_name,
              });
            } else {
              useFetchStore.setState({
                regionFirstName: result[0].region_1depth_name,
                regionSecondName: result[0].region_2depth_name,
              });
            }
          }
        }
      );
    }
  }, [location]);

  useEffect(() => {
    if (
      location.latitude &&
      location.longitude &&
      regionFirstName &&
      regionSecondName
    ) {
      fetchWeatherData();
    }
  }, [location, regionFirstName, regionSecondName]);

  const activityIcons = {
    cycle: {
      good: "img/icons/exercise/cycle_good.svg",
      bad: "img/icons/exercise/cycle_bad.svg",
    },
    running: {
      good: "img/icons/exercise/running_good.svg",
      bad: "img/icons/exercise/running_bad.svg",
    },
    hikng: {
      good: "img/icons/exercise/hikng_good.svg",
      bad: "img/icons/exercise/hikng_bad.svg",
    },
    laundry: {
      good: "img/icons/exercise/laundry_good.svg",
      bad: "img/icons/exercise/laundry_bad.svg",
    },
    walk: {
      good: "img/icons/exercise/walk_good.svg",
      bad: "img/icons/exercise/walk_bad.svg",
    },
  };

  return (
    <section className={`mw ${style.wrap}`}>
      <div className={style.hours}>
        <div className={style.top}>
          <h2 className="fontHead3">시간별 날씨!</h2>
          <span className="fontTitleS">활동</span>
          <label className={style.switch}>
            <input type="checkbox" onChange={btnToggle} />
            <span className={`fontBodyS ${style.slider}`}></span>
          </label>
        </div>
        <ul
          className={`${style.filterCon} ${
            checked ? style.visible : style.hidden
          }`}
        >
          <li
            className={`fontBodyM ${style.filter} ${
              activeFilter === "cycle" ? style.active : ""
            }`}
            onClick={() => activityClick("cycle")}
          >
            싸이클
          </li>
          <li
            className={`fontBodyM ${style.filter} ${
              activeFilter === "running" ? style.active : ""
            }`}
            onClick={() => activityClick("running")}
          >
            러닝
          </li>
          <li
            className={`fontBodyM ${style.filter} ${
              activeFilter === "hikng" ? style.active : ""
            }`}
            onClick={() => activityClick("hikng")}
          >
            등산
          </li>
          <li
            className={`fontBodyM ${style.filter} ${
              activeFilter === "laundry" ? style.active : ""
            }`}
            onClick={() => activityClick("laundry")}
          >
            빨래
          </li>
          <li
            className={`fontBodyM ${style.filter} ${
              activeFilter === "walk" ? style.active : ""
            }`}
            onClick={() => activityClick("walk")}
          >
            반려동물 산책
          </li>
        </ul>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          className={`mySwiper ${style.weatherCon}`}
        >
          {weatherHour.map((h, index) => {
            const skyValue = skyData?.find(
              (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
            );
            const ptyValue = ptyData?.find(
              (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
            );
            const tempValue = tempData?.find(
              (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
            );
            const popValue = popData?.find(
              (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
            );
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
            const imgSrc =
              weatherIcons[`${skyValue?.fcstValue}_${ptyValue?.fcstValue}`] ||
              "img/icons/weather/clear.svg"; // 기본 이미지 맑음으로 설정
            const activityStates = {
              cycle:
                (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
                (dust === "좋음" || "보통") &&
                popValue?.fcstValue <= 50
                  ? "좋음"
                  : "나쁨",
              running:
                (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
                (dust === "좋음" || "보통") &&
                popValue?.fcstValue <= 50
                  ? "좋음"
                  : "나쁨",
              hikng:
                (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
                (dust === "좋음" || "보통") &&
                popValue?.fcstValue <= 50
                  ? "좋음"
                  : "나쁨",
              laundry:
                (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 15) &&
                popValue?.fcstValue <= 30
                  ? "좋음"
                  : "나쁨",
              walk:
                (tempValue?.fcstValue <= 30 || tempValue?.fcstValue >= 5) &&
                (dust === "좋음" || "보통") &&
                popValue?.fcstValue <= 30
                  ? "좋음"
                  : "나쁨",
            };
            const activityClass =
              activityStates[selected] === "좋음"
                ? style.activityGood
                : style.activityBad;
            const iconUrl =
              activityStates[selected] === "좋음"
                ? activityIcons[selected].good
                : activityIcons[selected].bad;
            return (
              <SwiperSlide key={index}>
                <div className={style.weatherItem}>
                  <p className="fontTitleS">{h}시</p>
                  <div id="imgCon">
                    <img src={imgSrc} alt="날씨 이미지" />
                  </div>
                  <p className="fontTitleM">
                    {tempValue ? `${tempValue.fcstValue}°C` : "-°C"}
                  </p>
                </div>
                <div
                  className={`${style.exItem} ${
                    style.activity
                  } ${activityClass} ${checked ? style.visible : style.hidden}`}
                >
                  <img src={iconUrl} alt={selected} />
                  <p className="fontTitleS">{activityStates[selected]}</p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};

export default Hours;
