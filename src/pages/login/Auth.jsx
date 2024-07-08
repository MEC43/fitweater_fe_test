import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

  console.log("REST_API_KEY:", process.env.REACT_APP_KAKAO_APP_KEY);
  console.log("REDIRECT_URI:", process.env.REACT_APP_REDIRECT_URI);

  const navigate = useNavigate();

  const getToken = async (code) => {
    if (!code) {
      throw new Error("인증코드가 없습니다.");
    }
    // 2. code를 이용하여 카카오 서버에서 Access Token을 받아옴
    const res = await fetch("https://kauth.kakao.com/oauth/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
      }),
    });
    return res.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      // 1. 카카오 로그인 버튼을 클릭하면 인증코드를 받아옴 code=xxxx
      const code = new URL(window.location.href).searchParams.get("code");
      if (!code) {
        console.log("인증코드가 없습니다.");
        return;
      }
      try {
        // 2. 코드를 잘 받아왔다면 토큰을 받아옴
        const res = await getToken(code);
        if (res) {
          // 3. 인증코드를 localStorage에 저장 'token'명으로 저장
          localStorage.setItem("token", JSON.stringify(res.access_token));
          // 4. 메인 페이지로 이동
          navigate("/");
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [navigate]);

  return <></>;
}

export default Auth;
