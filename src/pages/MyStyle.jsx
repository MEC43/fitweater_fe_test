import React, { useState } from "react";
import style from "../css/MyStyle.module.css";
import HeaderMyStyle from "../components/HeaderMyStyle.jsx"; //헤더
import { Link, Navigate } from "react-router-dom";

function MyStyle() {
  const [selectedButtons, setSelectedButtons] = useState({
    tops: [],
    bottoms: [],
    outers: [],
    dresses: [],
  });

  const handleButtonClick = (category, value) => {
    //버튼 선택된 값 관리
    setSelectedButtons((prev_value) => {
      const category_value = prev_value[category]; // 이전 값 기반으로 현재 카테고리의 버튼 배열 가져옴
      const isSelected = category_value.includes(value); // 선택된 버튼이 이미 선택된 상태라면 true, 아니라면 false 반환
      const updated_value = isSelected
        ? category_value.filter((item) => item !== value) //true일 경우 : 버튼 배열에서 value를 제거한 새로운 배열을 생성
        : [...category_value, value]; //false일 경우 : [...] 사용하여 기존 배열에 value를 추가한 새로운 배열 생성
      return { ...prev_value, [category]: updated_value }; // 새로운 상태 객체 반홤하며 업데이트
    });
  };

  const renderButtons = (category, items) => {
    // 버튼 렌더링
    return items.map(
      (
        item //map 함수로 버튼 생성 : 중복 위해
      ) => (
        <button
          key={item} // item이 티셔츠라면 key는 티셔츠가 됨
          className={`fontBodyM ${
            selectedButtons[category].includes(item) ? style.selected : ""
          }`} // category에 item이 포함되어 있는지 확인, 포함되어있으면 style.selected 클래스에 추가, 아니면 빈문자열 추가
          onClick={() => handleButtonClick(category, item)}
        >
          {item}
        </button>
      )
    );
  };

  const handleSave = () => {
    // 로컬 스토리지에 저장
    const button_value_save = JSON.stringify(selectedButtons);
    localStorage.setItem("selectedButtons", button_value_save);
    console.log("저장된 데이터:", button_value_save);
    alert("선택한 값이 저장되었습니다!");
  };

  return (
    <>
      <HeaderMyStyle />
      <div className={`mw ${style.page}`}>
        <div className={`fontHead3 ${style.mystyleTitle}`}>
          (선택) 평소에 어떤 옷을 자주 입으시나요?
          <p className={`fontTitleL ${style.mystyleBody}`}>
            선택한 취향에 따라 옷이 추천됩니다!
            <span className={style.mystyleBody_span}>
              선택하지 않아도 서비스를 이용할 수 있습니다.
            </span>
          </p>
        </div>

        <div className={style.mystyleWrap}>
          <h2 className="fontTitleL">상의</h2>
          <div className={`fontBodyM ${style.button}`}>
            {renderButtons("tops", [
              "티셔츠",
              "맨투맨",
              "니트",
              "후드티",
              "셔츠/블라우스",
            ])}
          </div>
        </div>

        <div className={style.mystyleWrap}>
          <h2 className="fontTitleL">하의</h2>
          <div className={`fontBodyM ${style.button}`}>
            {renderButtons("bottoms", [
              "청바지",
              "슬랙스",
              "트레이닝 바지",
              "면바지",
              "롱스커트",
              "미니스커트",
            ])}
          </div>
        </div>

        <div className={style.mystyleWrap}>
          <h2 className="fontTitleL">아우터</h2>
          <div className={`fontBodyM ${style.button}`}>
            {renderButtons("outers", [
              "가디건",
              "자켓",
              "코트",
              "집업",
              "롱패딩",
              "숏패딩",
              "조끼",
              "롱스커트",
              "미니스커트",
            ])}
          </div>
        </div>

        <div className={style.mystyleWrap}>
          <h2 className="fontTitleL">기타(선택)</h2>
          <div className={`fontBodyM ${style.button}`}>
            {renderButtons("dresses", ["원피스"])}
          </div>
        </div>

        <button
          className={`fontBodyM ${style.bottomButton}`}
          onClick={handleSave}
        >
          <Link to="/codimain">저장하기</Link>
        </button>
      </div>
    </>
  );
}

export default MyStyle;
