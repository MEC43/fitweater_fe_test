import React, { useState, useEffect } from "react";
import style from "../css/MypageProfileArea.module.css";
import { useNavigate } from "react-router-dom";
import { useLoginInfoStore } from "../store/loginInfoStore";
import { url } from "../store/ref";

function MypageProfileArea() {
  const { userInfo, setUserInfoAll } = useLoginInfoStore();
  const [onEditProfile, setOnEditProfile] = useState(false);
  const defaultProfileImage = "/img/default/man_photo.svg";
  const defaultShortBio = "안녕하세요! 만나서 반갑습니다~";

  // 상태 초기화
  const [username, setUsername] = useState(userInfo.username || "");
  const [shortBio, setShortBio] = useState(
    userInfo.shortBio || defaultShortBio
  );
  const [userprofile, setUserProfile] = useState(
    userInfo.userprofile || defaultProfileImage
  );
  const [fileName, setFileName] = useState("파일 선택");
  const [duplicateMessage, setDuplicateMessage] = useState(""); // 닉네임 중복 확인 메시지 추가
  const navigate = useNavigate();

  const getToken = () => {
    const token = localStorage.getItem("token");
    console.log("토큰:", token); // 디버깅 로그 추가
    return token;
  };

  // 컴포넌트 마운트 시  사용자 정보 가져옴
  const fetchUserInfo = async () => {
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const response = await fetch(`${url}/getUserInfo?token=${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data) {
        // 사용자 정보 설정
        setUsername(data.username || "");
        setShortBio(data.shortBio || defaultShortBio);
        setUserProfile(data.userprofile || defaultProfileImage);
        console.log("마이페이지 받아온 유저정보", data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      if (error.message === "No token found") {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUserInfo(); // 컴포넌트가 마운트될 때 사용자 정보 가져오기
  }, []); // 빈 배열을 두어 컴포넌트가 마운트될 때만 실행되도록 함

  useEffect(() => {
    if (onEditProfile) {
      fetchUserInfo(); // 프로필 수정 모드일 때 사용자 정보 가져오기
    }
  }, [onEditProfile]);

  // 프로필 수정 모드로 전환하는 함수
  const profileEdit = () => {
    setOnEditProfile(true);
  };

  // 프로필 이미지 변경 처리 함수
  const handleProfileImageChange = (e) => {
    setUserProfile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // 프로필 수정 완료 처리 함수
  const profileEditCopl = async () => {
    setOnEditProfile(false);

    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token found");
      }
      const formData = new FormData();
      formData.append("username", username);
      formData.append("shortBio", shortBio);
      if (userprofile instanceof File) {
        formData.append("userprofile", userprofile);
      }
      console.log("보낼 FormData:", ...formData.entries());

      console.log("유저이름", formData.get("username"));
      console.log("소개", formData.get("shortBio"));
      console.log("파일", formData.get("userprofile"));

      const response = await fetch(`${url}/updateUserProfile?token=${token}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        alert("프로필 수정이 완료되었습니다.");
        setUserInfoAll(
          data.userid,
          data.username,
          data.userprofile || defaultProfileImage,
          data.shortBio || defaultShortBio
          // 사용자 정보 업데이트
        );
        console.log("업데이트된 사용자 정보:", data);
      } else {
        alert("프로필 수정에 실패하였습니다.");
      }
    } catch (error) {
      console.error("프로필 업데이트 중 오류 발생:", error);
      alert("서버 오류가 발생하였습니다. 다시 시도해주세요.");
    }
  };

  // 프로필 이미지 URL을 반환하는 함수
  const getUserProfileImage = () => {
    if (userprofile instanceof File) {
      return URL.createObjectURL(userprofile);
    }
    return `${url}${userprofile}`;
  };

  // 닉네임 중복 확인 함수
  const checkDuplicateUsername = async () => {
    const response = await fetch(`${url}/check-duplicate-username`, {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status !== 200) {
      setDuplicateMessage(data.message);
      return false;
    }
    setDuplicateMessage("사용 가능한 닉네임입니다.");
    return true;
  };

  return (
    <div className={style.profileArea}>
      {!onEditProfile ? (
        <div className={style.myPofile}>
          <div className={style.pofileImg}>
            <img
              src={getUserProfileImage()}
              alt={`${userInfo.userid} userprofile`}
            />
          </div>
          <span className="fontTitleXL">{username}</span>
          <p className="fontBodyM">{shortBio}</p>
          <div className={`${style.btnCon}`}>
            <button className="fontTitleM" onClick={profileEdit}>
              프로필 관리
            </button>
            <button
              className="fontTitleM"
              onClick={() => navigate("/myinfomanage")}
            >
              개인정보 관리
            </button>
          </div>
        </div>
      ) : (
        <div className={style.pofileEdit}>
          <div className={style.profileImg}>
            <img
              src={getUserProfileImage()}
              alt={`${userInfo.userid} userprofile`}
            />
            <input
              type="file"
              accept="image/*"
              id="userprofile"
              className={style.hiddenFileInput}
              onChange={handleProfileImageChange}
            />
            <button
              className={`fontTitleM ${style.fileInputLabel}`}
              onClick={() => document.getElementById("userprofile").click()}
            >
              {fileName}
            </button>
          </div>
          <label htmlFor="userName" className={style.inputGroup}>
            <span className="fontHead3">닉네임</span>
            <div className={style.inputWithButton}>
              <input
                type="text"
                id="userName"
                maxLength="10"
                className="fontBodyM"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className={`fontBodyM ${style.checkButton}`}
                onClick={checkDuplicateUsername}
              >
                중복확인
              </button>
            </div>
            <span className={style.errorMessage}>{duplicateMessage}</span>{" "}
            {/* 닉네임 중복 확인 메시지 */}
          </label>
          <label htmlFor="shortBio" className={style.inputGroup}>
            <span className="fontHead3">한줄소개</span>
            <input
              type="text"
              id="shortBio"
              maxLength="100"
              className="fontBodyM"
              value={shortBio}
              onChange={(e) => setShortBio(e.target.value)}
            />
          </label>
          <div className={style.btnCon}>
            <button className="fontTitleM" onClick={profileEditCopl}>
              프로필 수정 완료
            </button>
            <button
              className="fontTitleM"
              onClick={() => {
                setOnEditProfile(false);
              }}
            >
              취소
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MypageProfileArea;
