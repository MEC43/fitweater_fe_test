import { useState } from 'react';
import style from '../css/MypageProfileArea.module.css';
import { Link } from 'react-router-dom';
import { useLoginInfoStore } from '../store/loginInfoStore';

function MypageProfileArea() {
  const { userInfo } = useLoginInfoStore();
  const [onEditProfile, setOnEditProfile] = useState(false);

  // '프로필 관리' 버튼 눌렀을 때 실행되는 함수
  const profileEdit = () => {
    setOnEditProfile(true);

    // 서버에 userId와 일치하는 유저정보 요청해서
    // 유저 데이터 받아온 후 데이터 바인딩해주세요.
  };

  //'프로필 수정 완료' 버튼 눌렀을 때 실행되는 함수
  const profileEditCopl = async () => {
    setOnEditProfile(false);

    // 변경된 프로필 내용 서버로 전송후 DB저장 로직 추가해주세요.
  };

  return (
    <div className={style.profileArea}>
      {!onEditProfile ? (
        <div className={style.myPofile}>
          <div className={style.pofileImg}>
            <img
              src="/img/default/man_photo.svg"
              alt={`${userInfo.userid} profileImg`}
            />
          </div>
          <span className="fontTitleXL">{userInfo.username}</span>
          <p className="fontBodyM">
            안녕하세요! <br /> 만나서 반갑습니다~
          </p>
          <div className={`${style.btnCon}`}>
            <button className="fontTitleM" onClick={profileEdit}>
              프로필 관리
            </button>
            <button className="fontTitleM">
              <Link to="/myinfomanage">개인정보 관리</Link>
            </button>
          </div>
        </div>
      ) : (
        <div className={style.pofileEdit}>
          {/* 사진 선택을 위해 input요소로 변경해야 됨 */}
          <div className={style.pofileImg}>
            <img src="/img/img2.jpg" alt={`${userInfo.userid} profileImg`} />
            <input type="file" accept="image/*" id="profileImg" />
          </div>
          <label htmlFor="userName">
            <span className="fontHead3">닉네임</span>
            <input
              type="text"
              id="userName"
              maxLength="10"
              className="fontBodyM"
              value={userInfo.username}
            />
            <button className="fontTitleM">중복확인</button>
          </label>
          <label htmlFor="shortBio">
            <span className="fontHead3">한줄소개</span>
            <input
              type="text"
              id="shortBio"
              maxLength="100"
              className="fontBodyM"
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
