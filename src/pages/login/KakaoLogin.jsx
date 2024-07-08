import React from "react";
import style from "../../css/login.module.css";

export const KakaoLogin = () => {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  console.log("REST_API_KEY:", process.env.REACT_APP_KAKAO_APP_KEY);
  console.log("REDIRECT_URI:", process.env.REACT_APP_REDIRECT_URI);

  // 카카오 로그인 인증 코드 요청
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  console.log(link);

  const kakaoLoginHandler = () => {
    console.log("카카오 로그인");
    window.location.href = link;
  };

  return (
    <div>
      <button
        onClick={kakaoLoginHandler}
        className={`fontBodyM ${style.socialButton}`}
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default KakaoLogin;
