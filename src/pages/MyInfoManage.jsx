import React, { useState, useEffect } from "react";
import style from "../css/MyInfoManage.module.css";
import { url } from "../store/ref";

import ManageModal from "../components/ManageModal.jsx"; // 이용약관 모듈창
import CancelAccount from "../components/CancelAccount.jsx"; // 탈퇴 모달창
import HeaderAccountManage from "../components/HeaderAccountManage.jsx"; // 헤더

const Modify = () => {
  const [userid, setUserid] = useState(""); // 사용자 ID
  const [password, setPassword] = useState(""); // 비밀번호
  const [pdcon, setPdcon] = useState(""); // 비밀번호 확인
  const [gender, setGender] = useState(""); // 성별
  const [message2, setMessage2] = useState("");
  const [message3, setMessage3] = useState("");
  const [message4, setMessage4] = useState("");
  const [showTerms, setShowTerms] = useState(false); // 개인정보 수정 모달 상태
  const [showCancel, setShowCancel] = useState(false); // 탈퇴 모달 상태

  useEffect(() => {
    // 사용자 ID를 서버에서 가져옴
    const fetchUserid = async () => {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await fetch(`${url}/getUserid?token=${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          console.log("Fetched userid:", data.userid); // 응답 데이터 확인
          setUserid(data.userid);
        } else {
          console.error("Failed to fetch userid");
        }
      } catch (error) {
        console.error("Error fetching userid:", error);
      }
    };

    fetchUserid();
  }, []);

  // 사용자 정보를 업데이트하는 함수
  const updateUserInfo = async (e) => {
    e.preventDefault();
    if (password.length < 4) {
      setMessage2("4자 이상이어야 합니다.");
      return;
    } else {
      setMessage2("");
    }
    if (password !== pdcon) {
      setMessage3("비밀번호가 같지 않습니다.");
      return;
    } else {
      setMessage3("");
    }
    if (!gender) {
      setMessage4("성별을 선택해주세요.");
      return;
    } else {
      setMessage4("");
    }

    setShowTerms(true); // 성공 시 수정하시겠습니까 라는 모달창 호출
  };

  const confirmUpdateUserInfo = async () => {
    const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰을 가져옴
    try {
      const response = await fetch(`${url}/updateUserInfo?token=${token}`, {
        method: "POST",
        body: JSON.stringify({ password, gender }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("개인정보 수정이 완료되었습니다.");
        setShowTerms(false); // 모달창 닫기
      } else {
        alert("개인정보 수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  const confirmCancelAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${url}/deleteUser?token=${token}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("회원탈퇴가 완료되었습니다.");
        setShowCancel(false);
        localStorage.removeItem("token"); // 토큰 삭제
        window.location.href = "/";
      } else {
        alert("회원탈퇴에 실패하였습니다.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      <HeaderAccountManage />
      <div className={`mw ${style.page}`}>
        <div className={`fontHead2 ${style.titleWrap}`}></div>
        <form onSubmit={updateUserInfo}>
          <div className={`fontTitleXL ${style.inputTitle}`}>아이디</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="text"
              value={userid}
              readOnly
            />
          </div>
          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              placeholder="사용할 비밀번호를 입력하세요."
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <span>{message2}</span> {/* 비밀번호 문구 */}
          <div className={`fontTitleXL ${style.inputTitle}`}>비밀번호 확인</div>
          <div className={style.inputWrap}>
            <input
              className={style.input}
              type="password"
              placeholder="사용할 비밀번호를 입력하세요."
              value={pdcon}
              onChange={(e) => {
                setPdcon(e.target.value);
              }}
            />
          </div>
          <span>{message3}</span> {/* 비밀번호 확인 문구 */}
          {/* 성별 */}
          <div className={`fontTitleXL ${style.inputTitle}`}>성별</div>
          <div className={style.gender_select}>
            <button
              type="button"
              className={`fontBodyM ${style.gender_button} ${
                gender === "male" ? style.selected : ""
              }`}
              onClick={() => setGender("male")}
            >
              남성
            </button>
            <button
              type="button"
              className={`fontBodyM ${style.gender_button} ${
                gender === "female" ? style.selected : ""
              }`}
              onClick={() => setGender("female")}
            >
              여성
            </button>
          </div>
          <span>{message4}</span> {/* 성별 체크 문구 */}
          <button type="submit" className={`fontBodyM ${style.bottomButton}`}>
            다음으로
          </button>
        </form>
        {showTerms && (
          <ManageModal
            onClose={() => setShowTerms(false)}
            onConfirm={confirmUpdateUserInfo}
          />
        )}
        {showCancel && (
          <CancelAccount
            onClose={() => setShowCancel(false)}
            onConfirm={confirmCancelAccount}
          />
        )}

        <div className={style.delete}>
          <div className={`fontBodyM ${style.deleteMemo}`}>
            회원정보를 삭제하시겠어요?{" "}
            <button
              className={`fontBodyM ${style.deleteButton}`}
              onClick={() => setShowCancel(true)}
            >
              탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modify;
