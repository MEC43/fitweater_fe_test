import React from "react";
import style from "../css/ManageModal.module.css";

const CancleAccount = ({ onClose, onConfirm }) => {
  return (
    <div className={style.modalBackdrop}>
      <div className={style.modalContainer}>
        <div className={`fontHead3 ${style.modalBody}`}>
          <p>정말 탈퇴하시겠습니까?</p>
          <p>탈퇴하기를 누르시면 계정이 삭제됩니다...</p>
        </div>
        <div className={style.modalFooter}>
          <button
            className={`fontTitleM ${style.cancelButton}`}
            onClick={onClose}
          >
            취소
          </button>
          <button
            className={`fontTitleM ${style.confirmButton}`}
            onClick={onConfirm}
          >
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancleAccount;
