import React, { useState, useEffect } from 'react';
import { url } from "../store/ref";

import H2CodiWrite from "../components/H2CodiWrite";
import style from '../css/Codi.module.css';
import { useFeltOptionsStore } from '../store/codiStore';
import { useNavigate } from 'react-router-dom';

import { useLoginInfoStore } from '../store/loginInfoStore';  //유저정보 import

const CodiWrite = () => {
  const { userInfo } = useLoginInfoStore();

  const imgCon = document.querySelector(`.${style.imgCon}`);

  const navigate = useNavigate();
  const { feltOptions } = useFeltOptionsStore();  // Zustand 스토어에서 필요한 상태 가져오기

  const [codiDate, setCodiDate] = useState('');//작성날짜xx 코디 기록의 날짜

  const [regionSecondName, setRegionSecondName] = useState('');
  const [regionthirdName, setRegionthirdName] = useState('');
  const [tagAddress, setTagAddress] = useState('');//최종 태그에 출력될 주소

  const [minTemp, setMinTemp] = useState('');
  const [maxTemp, setMaxTemp] = useState('');
  const [sky, setSky] = useState('');

  useEffect(() => {
    // 오늘 날짜 저장
    const currentDate = new Date();
    const options = {
      year: 'numeric',
      month: '2-digit', //2자리 맞추도록 
      day: '2-digit',
    };

    const today = currentDate.toLocaleString('ko-KR', options).replace(/\./g, '').replace(/\ /g, '-');//0000-00-00

    console.log('today,userInfo', today, userInfo);
    setCodiDate(today);
  }, []);

  useEffect(() => {
    // regionSecondName regionthirdName 로컬스토리지에서 가져와서 설정
    const storedRegionSecondName = localStorage.getItem('regionSecondName');
    const storedRegionthirdName = localStorage.getItem('regionthirdName');

    if (storedRegionSecondName) {

      if (storedRegionSecondName.split(' ').length === 2) {// '부천시 원미구' 처럼 두 단어일때

        const splitSecondName = storedRegionSecondName.split(' ')[1]; //부천시 원미구 -> 원미구
        setRegionSecondName(splitSecondName);
      } else {  //'강남구' 처럼 한 단어일 때
        setRegionSecondName(storedRegionSecondName);
      }
    };
    if (storedRegionthirdName) setRegionthirdName(storedRegionthirdName);

    // minTemp와 maxTemp를 로컬스토리지에서 가져와서 설정
    const storedMinTemp = localStorage.getItem('minTemp');
    const storedMaxTemp = localStorage.getItem('maxTemp');
    const storedSky = localStorage.getItem('weatherText');
    if (storedMinTemp) setMinTemp(storedMinTemp);
    if (storedMaxTemp) setMaxTemp(storedMaxTemp);
    if (storedSky) setSky(storedSky);

  }, []);

  useEffect(() => {
    // tagAddress 업데이트
    setTagAddress(`${regionSecondName} ${regionthirdName}`);
  }, [regionSecondName, regionthirdName]);

  // 상태 설정

  const [activeOptions, setActiveOptions] = useState([]);    // 선택한 옵션 배열. 초기 상태는 빈 배열
  const [memo, setMemo] = useState('');                       // 메모 상태
  const [file, setFile] = useState('');                       // 파일 상태
  const [filePreview, setFilePreview] = useState('');         // 파일 미리보기 URL 상태
  const [fileMss, setFileMss] = useState('');                 // 파일 메시지 상태


  // 체감날씨 버튼 클릭 핸들러
  const handleBtnClick = (option) => {
    if (activeOptions.includes(option)) {
      const updateActiveOptions = activeOptions.filter(item => item !== option);
      setActiveOptions(updateActiveOptions);
    } else {
      setActiveOptions([...activeOptions, option]);
    }
  };

  // 파일 선택 시 미리보기 URL 업데이트
  useEffect(() => {

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result);  // 파일 읽기가 끝나면 파일 미리보기 URL 업데이트
      };
      reader.readAsDataURL(file);  // 파일을 Data URL로 읽기

      setFileMss('');
      imgCon.style.border = '1px solid var(--grey-200)';


    } else {
      setFilePreview('');  // 파일이 없을 때 미리보기 URL 초기화

    }
  }, [file]);


  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();  // 기본 제출 동작 막기
    if (filePreview === '') {
      setFileMss('* 사진을 첨부해주세요.');
      imgCon.style.border = '1px solid var(--accnet-color)';
      return;
    } else {
      setFileMss('');
    }


    // FormData 객체 생성 및 데이터 추가
    const data = new FormData();
    data.append('file', file);
    data.append('memo', memo);
    activeOptions.forEach(option => data.append('tag', option));
    data.append('address', tagAddress);
    data.append('minTemp', minTemp);
    data.append('maxTemp', maxTemp);
    data.append('sky', sky);
    data.append('codiDate', codiDate);
    data.append('userid', userInfo.userid);

    // FormData 객체의 내용 확인 (디버깅용)
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      const response = await fetch(`${url}/codiWrite`, {
        method: "POST",
        body: data,
      });

      if (response) {
        console.log('/n response@@@@', response);
        navigate('/codiCompleted');
      }

    } catch (error) {
      console.error('Error:', error);
      // 오류 처리
    }
  };

  const handleKeyDown = (e) => {
    // Enter 키 입력을 감지하여 기본 동작을 막습니다.
    if (e.key === 'Enter') {
      e.preventDefault();  // 기본 동작을 막음
    }
  };

  return (
    <main className={`mw ${style.codiWrite}`}>
      <H2CodiWrite tagAddress={tagAddress} />
      <section className={style.codiWriteFrame}>
        <h3 className='fontHead3'>{codiDate.split('-')[0]}년 {codiDate.split('-')[1]}월 {codiDate.split('-')[2]}일</h3>
        <div className={style.weatherInfo}>
          <span className={`fontTitleXS ${style.miniTag}`}>{tagAddress}</span>
          <span className={`fontTitleS ${style.temp}`}>{maxTemp}°C/{minTemp}°C</span>
          <img src="img/icons/common/12devider.svg" alt="12devider" />
          <span className={`fontTitleS ${style.sky}`}>{sky}</span>
        </div>
        <div className={style.imgCon}>
          {file && (
            <img className={style.selectImg} src={filePreview} alt="선택된 파일" />
          )}

          {fileMss && (
            <span className={`fontTitleM ${style.fileMss}`}>{fileMss}</span>
          )}
          <label className={style.BtnImgUpload} htmlFor="postimg">
            <input
              hidden
              type="file"
              multiple={false}  // 한 번에 여러 파일 선택 불가
              id="postimg"
              name="postimg"
              onChange={(e) => { setFile(e.target.files[0]) }}
            />
          </label>
        </div>
        <div className={style.Qfelt}>
          <p className='fontHead3'>오늘의 체감 날씨는?</p>
          <div className={style.togglesArea}>
            {feltOptions.map((option, index) => (
              <button
                key={'feltOptions' + index}
                className={`${style.BtnToggle} fontBodyM ${activeOptions.includes(option) ? style.active : ''}`}
                onClick={() => handleBtnClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        <div className={style.Qmemo}>
          <label htmlFor='memo' className='fontHead3'>오늘의 코디 메모!</label>
          <textarea
            className='fontBodyM'
            name="memo"
            id="memo"
            maxLength="100"
            placeholder='날씨와 코디에 대한 간단한 메모를 남겨보세요. (최대 100자)'
            value={memo}
            onChange={(e) => { setMemo(e.target.value) }}
            onKeyDown={handleKeyDown}  // 엔터 키 이벤트 핸들러 추가

          ></textarea>
        </div>
      </section>

      <div className={style.bottomBtns}>
        <button className={`fontTitleM ${style.btnCancel}`}>취소</button>
        <button className={`fontTitleM ${style.btnMethod}`} onClick={handleSubmit}>코디 기록하기</button>
      </div>
    </main>
  );
};

export default CodiWrite;  // 함수 컴포넌트 CodiWrite를 외부로 내보냄
