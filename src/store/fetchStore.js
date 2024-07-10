import { create } from "zustand";
import { dfs_xy_conv } from "../utils/coordinateConversion"; // 좌표 변환 함수 분리
import { regionCodes } from "../utils/regionCodes"; // 지역 코드 분리

const API_KEY =
  "GHL4EyAD%2B1JXd4bO0mbvcE28GOOhWZmfhkdcqWe63mC02FDwcKPaePr38d5RZyGhW8yO6AE4gcW5F2lyAJ06jA%3D%3D";

const useFetchStore = create((set, get) => ({
  location: {},
  temperature: "",
  maxTemp: "",
  minTemp: "",
  dust: "",
  uv: "",
  regionFirstName: "",
  regionSecondName: "",
  tempData: [], // temp 데이터를 저장할 상태 추가
  skyData: [], // sky 데이터를 저장할 상태 추가
  popValue: null, // popValue 상태 추가

  setLocation: (location) => set({ location }),
  setWeatherData: (data) => set(data),
  setRegionFirstName: (name) => set({ regionFirstName: name }),
  setRegionSecondName: (name) => set({ regionSecondName: name }),
  setTempData: (tempData) => set({ tempData }),
  setSkyData: (skyData) => set({ skyData }),
  setPopValue: (popValue) => set({ popValue }),

  fetchLocation: () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        set({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      });
    } else {
      console.log("현재 브라우저는 위치정보를 가져올 수 없습니다.");
    }
  },

  fetchWeatherData: async () => {
    const { location, regionFirstName, regionSecondName, setPopValue } = get();

    if (
      !location.latitude ||
      !location.longitude ||
      !regionFirstName ||
      !regionSecondName
    ) {
      console.warn("Location or region information is missing.");
      return;
    }

    const { x, y } = dfs_xy_conv("toXY", location.latitude, location.longitude);
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const today = year + month + day;
    const hours = ("0" + date.getHours()).slice(-2) + "00";

    const fetchWeather = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=${hours}&nx=${x}&ny=${y}`
        );
        const res = await fetch(url);
        if (!res.ok) {
          console.error("Error fetching weather data:", res.statusText);
          return { temperature: "" };
        }
        const data = await res.json();
        if (data.response?.body?.items?.item) {
          const presentTemp = data.response.body.items.item;
          return { temperature: presentTemp[3].obsrValue.substr(0, 2) };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
      return { temperature: "" };
    };

    const fetchShortWeather = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${API_KEY}&pageNo=1&numOfRows=1000&dataType=JSON&base_date=${today}&base_time=0200&nx=${x}&ny=${y}`
        );
        const res = await fetch(url);
        const data = await res.json();
        if (data.response?.body?.items?.item) {
          const shortWeather = data.response.body.items.item;

          //로컬스토리지에 저장
          localStorage.setItem(
            "maxTemp",
            shortWeather[157].fcstValue.substr(0, 2)
          );
          localStorage.setItem(
            "minTemp",
            shortWeather[48].fcstValue.substr(0, 2)
          );

          const tempArry = shortWeather.filter(
            (item) => item.category === "TMP"
          );
          const skyArry = shortWeather.filter(
            (item) => item.category === "SKY"
          );
          const ptyArry = shortWeather.filter(
            (item) => item.category === "PTY"
          );
          const popArry = shortWeather.filter(
            (item) => item.category === "POP"
          );
          // console.log(temp);
          // console.log(shortWeather);
          // console.log(popArry);

          const pmSKY = shortWeather[175].fcstValue;
          const pmPTY = shortWeather[176].fcstValue;
          // 날씨 텍스트 객체
          const weatherObj = {
            "1_0": "맑음",
            "4_0": "흐림",
            "3_0": "구름많음",
            "3_1": "구름많고 비",
            "4_1": "흐리고 비",
            "3_4": "구름많고 소나기",
            "4_4": "흐리고 소나기",
            "4_3": "흐리고 눈",
            "3_3": "구름많고 눈",
            "3_2": "구름많고 비/눈",
            "4_2": "흐리고 비/눈",
          };
          const weatherText = weatherObj[`${pmSKY}_${pmPTY}`] || "로딩중";
          // 로컬 스토리지에 저장
          localStorage.setItem("weatherText", weatherText);
          localStorage.setItem("pmSKY", pmSKY);
          localStorage.setItem("pmPTY", pmPTY);

          set({
            tempData: tempArry,
            skyData: skyArry,
            ptyData: ptyArry,
            popData: popArry,
            weatherText, // 요거 추가하니 로컬에 저장됐어요! // 최고!
          });

          // popValue를 계산
          const date = new Date();
          const hour = date.getHours();
          const weatherHour = Array.from(
            { length: 12 },
            (_, i) => (hour + i) % 24
          );
          const newPopValue = weatherHour.map((h) => {
            const popValue = popArry.find(
              (item) => item.fcstTime === ("0" + h).slice(-2) + "00"
            );
            return popValue ? popValue.fcstValue : null;
          });
          setPopValue(newPopValue[0]); // 첫 번째 값만 설정

          return {
            maxTemp: shortWeather[157].fcstValue.substr(0, 2),
            secTMX: shortWeather[447].fcstValue.substr(0, 2),
            thiTMX: shortWeather[737].fcstValue.substr(0, 2),
            minTemp: shortWeather[48].fcstValue.substr(0, 2),
            secTMN: shortWeather[338].fcstValue.substr(0, 2),
            thiTMN: shortWeather[628].fcstValue.substr(0, 2),

            amSKY: shortWeather[66].fcstValue,
            amPTY: shortWeather[67].fcstValue,
            secAmSKY: shortWeather[356].fcstValue,
            secAmPTY: shortWeather[357].fcstValue,
            thiAmSKY: shortWeather[646].fcstValue,
            thiAmPTY: shortWeather[647].fcstValue,
            weatherText,

            pmSKY: shortWeather[175].fcstValue,
            pmPTY: shortWeather[176].fcstValue,
            secPmSKY: shortWeather[456].fcstValue,
            secPmPTY: shortWeather[466].fcstValue,
            thiPmSKY: shortWeather[755].fcstValue,
            thiPmPTY: shortWeather[756].fcstValue,

            firPOP: shortWeather[68].fcstValue,
            secPOP: shortWeather[358].fcstValue,
            thiPOP: shortWeather[648].fcstValue,
          };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching short weather data:", error);
      }
      return {
        maxTemp: "",
        secTMX: "",
        thiTMX: "",
        minTemp: "",
        secTMN: "",
        thiTMN: "",
        amSKY: "",
        amPTY: "",
        pmSKY: "",
        pmPTY: "",
        secAmSKY: "",
        secAmPTY: "",
        thiAmSKY: "",
        thiAmPTY: "",
        secPmSKY: "",
        secPmPTY: "",
        thiPmSKY: "",
        thiPmPTY: "",
        firPOP: "",
        secPOP: "",
        thiPOP: "",
        weatherText: "",
      };
    };

    const fetchDust = async () => {
      try {
        const url = new URL(
          `https://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?serviceKey=${API_KEY}&returnType=json&numOfRows=100&pageNo=1&stationName=${regionSecondName}&dataTerm=DAILY&ver=1.4`
        );
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        if (
          data.response &&
          data.response.body &&
          data.response.body.items &&
          data.response.body.items[0]
        ) {
          let pm10 = data.response.body.items[0].pm10Grade1h;
          switch (pm10) {
            case "1":
              pm10 = "좋음";
              break;
            case "2":
              pm10 = "보통";
              break;
            case "3":
              pm10 = "나쁨";
              break;
            case "4":
              pm10 = "매우나쁨";
              break;
            default:
              pm10 = "-";
          }
          return { dust: pm10 };
        } else {
          console.error(
            "Unexpected response structure or empty items array:",
            data
          );
        }
      } catch (error) {
        console.error("Error fetching dust data:", error);
      }
      return { dust: "보통" };
    };

    const fetchUv = async () => {
      try {
        const region = regionCodes.find((r) => r.name === regionFirstName);
        const areaNo = region ? region.code : "1100000000";
        const url = new URL(
          `https://apis.data.go.kr/1360000/LivingWthrIdxServiceV4/getUVIdxV4?serviceKey=${API_KEY}&pageNo=1&numOfRows=10&dataType=JSON&areaNo=${areaNo}&time=${today}12`
        );
        const res = await fetch(url);
        if (!res.ok) {
          console.error("Error fetching UV data:", res.statusText);
          return { uv: "" };
        }
        const data = await res.json();
        if (data.response?.body?.items?.item) {
          const maxUv = data.response.body.items.item[0].h0;
          const uvDegree =
            maxUv >= 0 && maxUv <= 2
              ? "낮음"
              : maxUv >= 3 && maxUv <= 5
              ? "보통"
              : maxUv >= 6 && maxUv <= 7
              ? "높음"
              : maxUv >= 8 && maxUv <= 10
              ? "매우높음"
              : maxUv >= 11
              ? "위험"
              : "유효하지 않은 값";
          return { uv: uvDegree };
        } else {
          console.error("Unexpected response structure:", data);
        }
      } catch (error) {
        console.error("Error fetching UV data:", error);
      }
      return { uv: "" };
    };

    try {
      const [weather, shortWeather, dust, uv] = await Promise.all([
        fetchWeather(),
        fetchShortWeather(),
        fetchDust(),
        fetchUv(),
      ]);

      set({
        ...weather,
        ...shortWeather,
        ...dust,
        ...uv,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  },
}));

export default useFetchStore;
