import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import useFetchStore from "../store/fetchStore";
import useClothesStore from "../store/clothesStore";
import { url } from "../store/ref";

const useMatchingData = (selectedTemp, selectedMode) => {
  const {
    location,
    fetchLocation,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
  } = useFetchStore();

  const baseClothes = useClothesStore();
  const [clothes, setClothes] = useState(baseClothes);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [chatData, setChatData] = useState("");
  const [matchingWord, setMatchingWord] = useState({
    tops: [],
    bottoms: [],
    outers: [],
  });

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);

  useEffect(() => {
    const fetchData = async () => {
      if (
        location.latitude &&
        location.longitude &&
        regionFirstName &&
        regionSecondName &&
        temperature !== "" &&
        maxTemp !== "" &&
        minTemp !== "" &&
        popValue !== "" &&
        dust !== "" &&
        uv !== ""
      ) {
        setDataLoaded(true);
      }
    };

    fetchData();
  }, [
    location,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
  ]);

  useEffect(() => {
    if (dataLoaded) {
      // const localValue = JSON.parse(
      //   localStorage.getItem("selectedButtons") || "{}"
      // ); // 로컬 스토리지 값을 JSON 객체로 변환

      // if (Object.keys(localValue).length === 0) {
      //   console.warn("No selected buttons found in localStorage.");
      //   return;
      // }

      // const findCommonItems = (baseClothes, localValue) => {
      //   const commonItems = {
      //     tops: {},
      //     bottoms: {},
      //     outers: {},
      //     dresses: {},
      //     others: {},
      //   };

      //   Object.keys(localValue).forEach((category) => {
      //     if (baseClothes[category]) {
      //       localValue[category].forEach((item) => {
      //         if (baseClothes[category].hasOwnProperty(item)) {
      //           commonItems[category][item] = baseClothes[category][item];
      //         }
      //       });
      //     }
      //   });

      //   // 롱스커트와 미니스커트가 others에 있을 경우 bottoms로 이동
      //   if (commonItems.others["롱스커트"]) {
      //     commonItems.bottoms["롱스커트"] = commonItems.others["롱스커트"];
      //     delete commonItems.others["롱스커트"];
      //   }

      //   if (commonItems.others["미니스커트"]) {
      //     commonItems.bottoms["미니스커트"] = commonItems.others["미니스커트"];
      //     delete commonItems.others["미니스커트"];
      //   }

      //   return commonItems;
      // };

      // const commonItems = findCommonItems(baseClothes, localValue);
      // console.log("공통아이템---", commonItems);
      // // const selectedClothes =
      // //   selectedMode === "취향" ? JSON.parse(localValue) : baseClothes;
      // // setClothes(selectedClothes); // clothes 상태 업데이트
      // console.log("로컬---", localValue);

      const postClothesData = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found");
          setChatData("No token found");
          return;
        }
        // console.log("토큰---", token);

        let gender;
        try {
          const decodedToken = jwtDecode(token);
          gender = decodedToken.gender;
        } catch (error) {
          console.error("Failed to decode token:", error);
          setChatData("Failed to decode token");
          return;
        }
        console.log("매칭---", gender);
        try {
          const response = await fetch(`${url}/codiTalkBox`, {
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
              clothes: baseClothes,
              selectedTemp: selectedTemp,
              selectedMode: selectedMode,
              gender: gender, // gender 값을 body에 추가
            }),
          });

          const data = await response.json();
          setChatData(data.response.content);
          // console.log(chatData);
        } catch (error) {
          console.error("Failed to fetch:", error);
          setChatData("Failed to fetch data");
        }
      };
      postClothesData();
    }
  }, [
    dataLoaded,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
    selectedTemp,
    selectedMode,
  ]);

  useEffect(() => {
    if (chatData) {
      const findMatching = (obj, str) => {
        const keys = Object.keys(obj);
        const result = [];

        for (let key of keys) {
          if (str.includes(key)) {
            result.push(key);
          }
        }

        return result;
      };

      const topWords = findMatching(clothes.tops, chatData);
      const bottomWords = findMatching(clothes.bottoms, chatData);
      const outerWords = findMatching(clothes.outers, chatData);
      setMatchingWord({
        tops: topWords,
        bottoms: bottomWords,
        outers: outerWords,
      });
    }
  }, [chatData, clothes]);

  return {
    location,
    regionFirstName,
    regionSecondName,
    temperature,
    maxTemp,
    minTemp,
    popValue,
    dust,
    uv,
    dataLoaded,
    matchingWord,
    chatData,
    setMatchingWord,
    setChatData,
    clothes,
  };
};

export default useMatchingData;