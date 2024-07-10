import React from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/signupcomplete.module.css";

const SignupComplete = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={`mw ${style.page}`}>
      <div className={style.signup_complete_status}>
        <img
          className={style.icon}
          src="img/icons/common/checkCircle.svg"
          alt="checkCircle"
        />
        <span className="text">회원가입이 완료되었습니다</span>
      </div>

      <div className={style.signup_complete_footer}>
        <button
          className={`fontBodyM ${style.bottomButton}`}
          onClick={handleLogin}
        >
          로그인하기
        </button>
      </div>
    </div>
  );
};

export default SignupComplete;
