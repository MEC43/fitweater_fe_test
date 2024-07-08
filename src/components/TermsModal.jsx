import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../css/TermsModal.module.css";
{
  /* <link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
  integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>; */
}

const TermsModal = ({ onClose }) => {
  const [allChecked, setAllChecked] = useState(false);
  const [checks, setChecks] = useState({
    location: false,
    service: false,
    privacy: false,
  });

  const navigate = useNavigate();

  const handleAllChecked = () => {
    const newChecked = !allChecked;
    setAllChecked(newChecked);
    setChecks({
      location: newChecked,
      service: newChecked,
      privacy: newChecked,
    });
  };

  const handleCheck = (key) => {
    setChecks({
      ...checks,
      [key]: !checks[key],
    });
  };

  const isFormValid = () => {
    return checks.location && checks.service && checks.privacy;
  };

  const handleSubmit = () => {
    if (isFormValid()) {
      navigate("/signupcomplete");
    }
  };

  return (
    <div className={`mw ${style.modal_overlay}`}>
      <div className={style.modal_content}>
        <div className={`fontHead3 ${style.modal_header}`}>
          <h2>서비스 이용약관</h2>
          {/* <button className={style.close_button} onClick={onClose}>
            <i class="fa-solid fa-xmark"></i>
          </button> */}
        </div>
        <div className={style.modal_body}>
          <label className={`fontTitleM ${style.all_checkbox}`}>
            <input
              type="checkbox"
              checked={allChecked}
              onChange={handleAllChecked}
            />
            약관 모두 동의
          </label>

          <label className={`fontTitleM ${style.modal_checkbox}`}>
            <input
              type="checkbox"
              checked={checks.location}
              onChange={() => handleCheck("location")}
            />
            위치정보 서비스 이용약관 (필수)
          </label>
          <label className={`fontTitleM ${style.modal_checkbox}`}>
            <input
              type="checkbox"
              checked={checks.service}
              onChange={() => handleCheck("service")}
            />
            서비스 이용약관에 동의 (필수)
          </label>
          <label className={`fontTitleM ${style.modal_checkbox}`}>
            <input
              type="checkbox"
              checked={checks.privacy}
              onChange={() => handleCheck("privacy")}
            />
            개인정보 수집 및 이용약관에 동의 (필수)
          </label>
        </div>
        <div className={style.modal_footer}>
          <button
            className={`fontTitleM ${style.submit_button}`}
            onClick={handleSubmit}
            disabled={!isFormValid()}
          >
            가입 완료
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
