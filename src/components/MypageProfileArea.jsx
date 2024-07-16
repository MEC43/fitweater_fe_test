import style from '../css/MypageProfileArea.module.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginInfoStore } from '../store/loginInfoStore';
import { url } from '../store/ref';

function MypageProfileArea() {
  const {
    userInfo,
    setUserInfoAll,
    setUserid,
    setUsername,
    setUserprofile,
    setShortBio,
    setUsergender,
    token,
    fetchUserInfo,
  } = useLoginInfoStore();
  const [onEditProfile, setOnEditProfile] = useState(false);

  // 상태 초기화
  const [fileName, setFileName] = useState('파일 선택');
  const [imgFile, setImgFile] = useState();
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null); // 파일 미리보기용
  const [duplicateMessage, setDuplicateMessage] = useState(''); // 닉네임 중복 확인 메시지 추가
  const navigate = useNavigate();
  const userId = userInfo.userid;
  console.log('---유저아이디---', userId);

  //사용자 정보 get요청
  useEffect(() => {
    fetchUserInfo(navigate);
  }, []);

  useEffect(() => {
    if (onEditProfile) {
      fetchUserInfo(navigate); // 프로필 수정 모드일 때 사용자 정보 가져오기
    }
  }, [onEditProfile]);

  // 프로필 수정 모드로 전환하는 함수
  const profileEdit = () => {
    setOnEditProfile(true);
  };

  // 프로필 이미지 변경 처리 함수
  const handleProfileImageChange = (e) => {
    // setUserprofile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  // 프로필 수정 완료 post 요청
  const profileEditCopl = async () => {
    setOnEditProfile(false);

    try {
      // const token = getToken();
      if (!token) {
        throw new Error('No token found');
      }
      const formData = new FormData();
      formData.set('username', userInfo.username);
      formData.set('shortBio', userInfo.shortBio);
      if (imgFile) {
        formData.append('userprofile', imgFile);
      }

      console.log('유저이름', formData.get('username'));
      console.log('소개', formData.get('shortBio'));
      console.log('파일', formData.get('userprofile'));

      const response = await fetch(
        `${url}/user/updateProfile?userId=${userId}`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('업데이트된 사용자 정보:', data);

      if (data) {
        alert('프로필 수정이 완료되었습니다.');
        setUserInfoAll(
          data.userid,
          data.username,
          data.userprofile,
          data.shortBio
          // 사용자 정보 업데이트
        );
        window.location = '/mypage';
      } else {
        alert('프로필 수정에 실패하였습니다.');
      }
    } catch (error) {
      console.error('프로필 업데이트 중 오류 발생:', error);
      alert('서버 오류가 발생하였습니다. 다시 시도해주세요.');
    }
  };

  // 프로필 이미지 URL을 반환하는 함수
  const getProfileImage = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgPreviewUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      // setUserprofile(file);
      setImgFile(file);
    }

    console.log(file);
  };

  // 닉네임 중복 확인 함수
  const checkDuplicateUsername = async () => {
    const response = await fetch(`${url}/user/check-duplicate-username`, {
      method: 'POST',
      body: JSON.stringify({ username: userInfo.username }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    if (response.status !== 200) {
      setDuplicateMessage(data.message);
      return false;
    }
    setDuplicateMessage('사용 가능한 닉네임입니다.');
    return true;
  };

  return (
    <div className={style.profileArea}>
      {!onEditProfile ? (
        <div className={style.myProfile}>
          <div className={style.profileImg}>
            <img
              src={
                userInfo.userprofile
                  ? typeof userInfo.userprofile === 'string' &&
                    (userInfo.userprofile.startsWith(
                      'http://t1.kakaocdn.net'
                    ) ||
                      userInfo.userprofile.startsWith('http://k.kakaocdn.net/'))
                    ? userInfo.userprofile
                    : `${url}/${userInfo.userprofile}`
                  : `/img/default/man_photo.svg`
              }
              alt={`${userInfo.userid} 프로필이미지`}
            />
          </div>
          <span className="fontTitleXL">{userInfo.username}</span>
          <p className="fontBodyM">{userInfo.shortBio}</p>
          <div className={`${style.btnCon}`}>
            <button className="fontTitleM" onClick={profileEdit}>
              프로필 관리
            </button>
            <button
              className="fontTitleM"
              onClick={() => navigate('/myinfomanage')}
            >
              개인정보 관리
            </button>
          </div>
        </div>
      ) : (
        <div className={style.profileEdit}>
          <div className={style.imgSelect}>
            <div className={style.profileImg}>
              <img
                src={
                  imgPreviewUrl
                    ? imgPreviewUrl
                    : `${url}/${userInfo.userprofile}`
                }
                alt={`${userInfo.userid} userprofile`}
              />
            </div>
            <input
              type="file"
              accept="image/*"
              id="userprofile"
              className={style.hiddenFileInput}
              onChange={(e) => {
                getProfileImage(e);
                handleProfileImageChange(e);
              }}
            />
            <button
              className={`fontTitleM ${style.fileInputLabel}`}
              onClick={() => document.getElementById('userprofile').click()}
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
                value={userInfo.username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <button
                className={`fontBodyM ${style.checkButton}`}
                onClick={checkDuplicateUsername}
              >
                중복확인
              </button>
            </div>
            <span className={style.errorMessage}>{duplicateMessage}</span>{' '}
            {/* 닉네임 중복 확인 메시지 */}
          </label>
          <label htmlFor="shortBio" className={style.inputGroup}>
            <span className="fontHead3">한줄소개</span>
            <input
              type="text"
              id="shortBio"
              maxLength="100"
              className="fontBodyM"
              value={userInfo.shortBio}
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
                setImgPreviewUrl(null);
                setImgFile(null);
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
