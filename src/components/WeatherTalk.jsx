import style from "../css/WeatherTalk.module.css";
import { useEffect, useState } from "react";
import useMatchingData from "../hooks/matchingData";
import { url } from "../store/ref";

const WeatherTalk = ({ setMatchingUrl }) => {
  const {
    temperature,
    maxTemp,
    minTemp,
    dust,
    uv,
    dataLoaded,
    matchingWord,
    clothes,
    popValue,
    chatData,
    setChatData,
  } = useMatchingData();

  const [weatherChat, setWeatherChat] = useState("");

  useEffect(() => {
    const postWeatherData = async () => {
      if (dataLoaded) {
        try {
          const response = await fetch(`${url}/talkBox`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              temperature: temperature,
              maxTemp: maxTemp,
              minTemp: minTemp,
              popValue: popValue,
              dust: dust,
              uv: uv,
            }),
          });

          const data = await response.json();
          setWeatherChat(data.response.content);
        } catch (error) {
          console.error("Failed to fetch:", error);
          setWeatherChat("Failed to fetch data");
        }
      }
    };

    postWeatherData();
  }, [dataLoaded, temperature, maxTemp, minTemp, popValue, dust, uv]);

  useEffect(() => {
    if (
      matchingWord.tops.length > 0 ||
      matchingWord.bottoms.length > 0 ||
      matchingWord.outers.length > 0
    ) {
      const topUrl = matchingWord.tops.map((word) => clothes.tops[word]);
      const bottomUrl = matchingWord.bottoms.map(
        (word) => clothes.bottoms[word]
      );
      const outerUrl = matchingWord.outers.map((word) => clothes.outers[word]);

      const newMatchingUrl = {
        tops: topUrl[0] || "",
        bottoms: bottomUrl[0] || "",
        outers: outerUrl[0] || "",
      };
      setMatchingUrl(newMatchingUrl);
    }
  }, [matchingWord, clothes, setMatchingUrl]);

  return (
    <section className={style.talkBox}>
      <p className={`fontHead3 ${style.title}`}>오늘 날씨는?</p>
      {weatherChat ? (
        <p className={`fontDecorate ${style.talk}`}>{weatherChat}</p>
      ) : (
        <p className={`fontDecorate ${style.talk}`}>불러오는 중이에요~</p>
      )}
    </section>
  );
};

export default WeatherTalk;
