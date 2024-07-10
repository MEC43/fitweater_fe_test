import style from "../../css/login.module.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../store/ref";
import KakaoLogin from "./KakaoLogin";

const LoginPage = () => {
  const [userid, setUserid] = useState("");
  const [password, setPassword] = useState("");
  const [message1, setMessage1] = useState("");
  const [message2, setMessage2] = useState("");
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();

    //백엔드로 POST 요청 및 응답
    try {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify({ userid, password }),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      console.log("로그인 응답 데이터:", data);
      console.log("성별정보", data.gender);

      if (data.token) {
        console.log("로그인 성공, 토큰:", data.token);
        localStorage.setItem("token", data.token);
        window.location = '/';
      } else {
        if (data.message === "nouser") {
          console.log("사용자가 없습니다.");
          setMessage1("회원이 아닙니다.");
        }
        if (data.message === "failed") {
          console.log("비밀번호가 일치하지 않습니다.");
          setMessage2("비밀번호가 일치하지 않습니다.");
        }
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  return (
    <div className={`mw ${style.page}`}>
      <div className={style.logo} style={{ cursor: "pointer" }}>
        <img src="/img/logo/LogoL.svg" alt="Fit Weather Logo" />
      </div>
      <div className={`fontHead2 ${style.titleWrap}`}>로그인</div>

      <form onSubmit={login}>
        <div className={style.contentWrap}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              placeholder="아이디를 입력하세요."
              value={userid}
              onChange={(e) => {
                setUserid(e.target.value);
              }}
            />
          </div>
          <span>{message1}</span>
          <div
            style={{ marginTop: "26px" }}
            className={`fontTitleXL ${style.inputTitle}`}
          >
            비밀번호
          </div>
          <div className={style.inputWrap}>
            <input
              type="password"
              className={style.input}
              placeholder="비밀번호를 입력하세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span>{message2}</span>
        </div>
        <div>
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            로그인
          </button>
        </div>
        <div>
          <KakaoLogin />
        </div>
      </form>

      <div className={style.signup}>
        <div className={`fontBodyM ${style.signupMemo}`}>
          아직 웨더핏 회원이 아니시라면?{" "}
          <p className={`fontBodyM ${style.signupButton}`}>
            <Link to="/Signup">회원가입</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
