import { useNavigate } from 'react-router-dom';
import signupStyle from '../css/HeaderAccount.module.css';
import { useEffect, useState } from 'react';

const HeaderSignup = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1); // 메인 페이지로 이동
  };

  return (
    <header className={`mw ${signupStyle.header2}`}>
      <img
        src="img/icons/common/goBack.svg"
        onClick={goBack}
        className={signupStyle.btnGoBack}
        alt="goBack"
      />
      <h2 className="fontHead2">내 코디 취향</h2>
    </header>
  );
};

export default HeaderSignup;
