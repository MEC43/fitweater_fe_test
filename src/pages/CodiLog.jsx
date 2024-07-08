import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import style from '../css/Codi.module.css';
import styleBtn from '../css/TalkPage.module.css'

// conponents
import Footer from '../components/Footer';
import H2CodiLog from '../components/H2CodiLog';
import CodiLogGallery from '../components/CodiLogGallery';
import CodiLogCalendar from '../components/CodiLogCalendar';
import CodiLogBox from '../components/CodiLogBox';
// Zustand 스토어 가져오기
import { useFeltOptionsStore } from '../store/codiStore'; // 태그 종류 가져오기
import { useLoginInfoStore } from '../store/loginInfoStore';  //유저정보 import

import { url } from "../store/ref";


const CodiLog = () => {
  const navigate = useNavigate();

  const { feltOptions } = useFeltOptionsStore();
  const { userInfo } = useLoginInfoStore();

  const [codiView, setCodiView] = useState('calendar'); // 초기 상태 : 달력

  //  선택한 codilog 체감날씨 filter
  const [feltWeather, setFeltWeather] = useState([]); // 선택한 옵션 배열 . 초기 상태 : 빈 배열
  //  codi Modal 
  const [modalActive, setModalActive] = useState(null); //코디기록 데이터 _id OR null

  //  codiLog list 받아오기
  const [codiLogList, setCodiLogList] = useState([]);//화면에 뿌릴 리스트
  const [ALLcodiLogList, setALLCodiLogList] = useState([]);//전체 리스트

  const [TheYear, setTheYear] = useState('');//해당 년
  const [TheMonth, setTheMonth] = useState('');;//해당 월

  // 현재 날짜 상태
  const [currentYear, setCurrentYear] = useState('');//현재 몇년
  const [currentMonth, setCurrentMonth] = useState('');;//현재 몇월

  const [today, setToday] = useState('');
  const [alreadyLog, setAlreadyLog] = useState(false);



  /////*** 페이지 번호를 추적하기 위한 state
  const [page, setPage] = useState(0);
  const limit = 32;
  const observer = useRef();// IntersectionObserver 참조


  const handleOptionClick = (Option) => {
    if (feltWeather.includes(Option)) {
      const updateFeltWeather = feltWeather.filter((item) => item !== Option);
      setFeltWeather(updateFeltWeather);
    } else {
      setFeltWeather([...feltWeather, Option]);
    }
  };

  const fetchLog = (page, reset = false) => {
    if (!userInfo) { return };

    try {
      fetch(`${url}/codiLogList/${userInfo.userid}?page=${page}&limit=${limit}`)
        .then((res) => res.json())//
        .then((data) => {
          if (reset) { // reset 파라미터가 true이면 데이터 초기화
            setALLCodiLogList(data);
            setCodiLogList(data);
          } else {
            setALLCodiLogList(prev => [...prev, ...data]);
            setCodiLogList(prev => [...prev, ...data]);
          }
        })

    } catch (error) {
      console.error('Error fetching codi log list:', error);
    }
  }


  useEffect(() => {
    if (userInfo) {  // userInfo가 유효한지 확인
      setPage(0); // 페이지 번호 초기화
      fetchLog(0, true); // 초기 데이터 가져오기, reset 파라미터를 true로 설정
    } else {
      console.error('User info is not available');
    }

    getToday();

  }, [codiView]);


  useEffect(() => {
    if (page > 0) {
      fetchLog(page); // 페이지가 변경될 때마다 데이터 가져오기
    }
    // console.log("****전체:", ALLcodiLogList);
    // console.log("****뿌릴:", codiLogList);
  }, [page]);

  useEffect(() => {//선택한 태그를 포함하는 게시물 필터링
    if (feltWeather.length) {//필터링 선택한게 있다면..
      const filteredList = ALLcodiLogList.filter((codiLog) => {
        return (
          feltWeather.every((activeTag) => codiLog.tag.includes(activeTag))  //every() -> feltWeather 배열의 모든 요소에 대해 콜백 함수를 실행하여 모든 요소가 true인 경우에만 true를 반환. 즉, 모든 필터 조건이 item.tag에 포함되어 있어야만 true가 반환.
        );
      });
      setCodiLogList(filteredList);
    } else {
      setCodiLogList(ALLcodiLogList);
    }
  }, [feltWeather]);

  useEffect(() => {
    getCurrentDate()
  }, [codiView]);


  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth() + 1
    setCurrentYear(year);
    setCurrentMonth(month);

    //해당 년/월을 현재 날짜로 세팅
    //  이 함수는 마운트 때 한 번만 실행될 것 같아서 일단 여기서 세팅...
    setTheYear(currentDate.getFullYear());
    setTheMonth(currentDate.getMonth() + 1);

  };


  //****  마지막 요소에 대한 ref 설정 및 Intersection Observer 콜백 함수
  const lastElementRef = useCallback(node => {
    if (observer.current) observer.current.disconnect(); // 기존 observer 해제
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { // 마지막 요소가 뷰포트에 들어오면
        setPage(prevPage => prevPage + 1); // 페이지 증가
        setTheMonth(prevMonth => prevMonth > 1 ? prevMonth - 1 : 12); // TheMonth 값을 하나 줄이고, 1 이하가 되면 12로 되돌림
      }
    });
    if (node) observer.current.observe(node); // 새로운 요소 관찰 시작
    console.log(page);
  }, []);

  // 페이지,TheMonth 변경될 때  TheYear 업데이트
  useEffect(() => {
    if (page > 0 && TheMonth === 1) {
      // setTheMonth(12); // 1월에서 12월로 설정
      setTheYear(prevYear => prevYear - 1); // TheYear 감소
    }
  }, [page, TheMonth]);

  //마우스 클릭-스크롤 관련 
  const verticalScrollRef = useRef(null); // 상하 스크롤 컨테이너
  const horizontalScrollRef = useRef(null); // 좌우 스크롤 컨테이너

  // 상하 스크롤 관련 상태
  const [isMouseDownVert, setIsMouseDownVert] = useState(false);
  const [startY, setStartY] = useState(0);
  const [scrollTop, setScrollTop] = useState(0);

  // 좌우 스크롤 관련 상태
  const [isMouseDownHorz, setIsMouseDownHorz] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // 상하 스크롤 이벤트 핸들러
  useEffect(() => {
    const verticalScrollContainer = verticalScrollRef.current;

    const handleMouseDownVert = (e) => {
      setIsMouseDownVert(true);
      setStartY(e.pageY - verticalScrollContainer.offsetTop);
      setScrollTop(verticalScrollContainer.scrollTop);
      verticalScrollContainer.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseUpVert = () => {
      setIsMouseDownVert(false);
      if (verticalScrollContainer) {
        verticalScrollContainer.style.cursor = 'grab';
      }
    };

    const handleMouseMoveVert = (e) => {
      if (!isMouseDownVert) return;
      const y = e.pageY - verticalScrollContainer.offsetTop;
      const walkY = y - startY;
      verticalScrollContainer.scrollTop = scrollTop - walkY;
    };

    verticalScrollContainer.addEventListener('mousedown', handleMouseDownVert);
    document.addEventListener('mouseup', handleMouseUpVert);
    document.addEventListener('mousemove', handleMouseMoveVert);

    return () => {
      verticalScrollContainer.removeEventListener('mousedown', handleMouseDownVert);
      document.removeEventListener('mouseup', handleMouseUpVert);
      document.removeEventListener('mousemove', handleMouseMoveVert);
    };
  }, [isMouseDownVert, startY, scrollTop]);

  // 좌우 스크롤 이벤트 핸들러
  useEffect(() => {
    const horizontalScrollContainer = horizontalScrollRef.current;

    const handleMouseDownHorz = (e) => {
      setIsMouseDownHorz(true);
      setStartX(e.pageX - horizontalScrollContainer.offsetLeft);
      setScrollLeft(horizontalScrollContainer.scrollLeft);
      horizontalScrollContainer.style.cursor = 'grabbing';
      e.preventDefault();
    };

    const handleMouseUpHorz = () => {
      setIsMouseDownHorz(false);
      if (horizontalScrollContainer) {
        horizontalScrollContainer.style.cursor = 'grab';
      }
    };

    const handleMouseMoveHorz = (e) => {
      if (!isMouseDownHorz) return;
      const x = e.pageX - horizontalScrollContainer.offsetLeft;
      const walkX = x - startX;
      horizontalScrollContainer.scrollLeft = scrollLeft - walkX;
    };

    horizontalScrollContainer.addEventListener('mousedown', handleMouseDownHorz);
    document.addEventListener('mouseup', handleMouseUpHorz);
    document.addEventListener('mousemove', handleMouseMoveHorz);

    return () => {
      horizontalScrollContainer.removeEventListener('mousedown', handleMouseDownHorz);
      document.removeEventListener('mouseup', handleMouseUpHorz);
      document.removeEventListener('mousemove', handleMouseMoveHorz);
    };
  }, [isMouseDownHorz, startX, scrollLeft]);

  function getToday() {
    // 오늘 날짜를 생성하여 'YYYY-MM-DD' 형식의 문자열로 변환
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 변환
    const day = String(today.getDate()).padStart(2, '0'); // 일을 2자리로 변환
    const todayString = `${year}-${month}-${day}`;

    return setToday(todayString);
  }


  function goLogWrite() {
    console.log('수정 클릭');
    if (codiLogList[0].codiDate === today) {
      console.log('=======오늘기록있음=======');
      setAlreadyLog(true);
    } else {
      setAlreadyLog(false);
      navigate(`/codiWrite`)
      // 기록페이지로 이동하기
    }
  }

  return (
    <main className={`mw ${style.codiLog}`}>
      <H2CodiLog codiView={codiView} setCodiView={setCodiView} />

      <div className={style.topArea}>
        <h3 className="fontHead3">체감날씨</h3>
        <div className={style.toggleContainer} ref={horizontalScrollRef} >
          <div className={style.toggleWrapper}>
            {feltOptions.map((Option, index) => (
              <button
                key={'feltOptions' + index}
                className={`${style.BtnToggle} fontBodyM ${feltWeather.includes(Option) ? style.active : ''
                  }`}
                onClick={() => handleOptionClick(Option)}
              >
                {Option}
              </button>
            ))}
          </div>
        </div>
      </div>
      <section className={style.CodiViewFrame} ref={verticalScrollRef} >
        {codiView === 'gallery' ? (
          <CodiLogGallery
            feltWeather={feltWeather}
            setModalActive={setModalActive}
            codiLogList={codiLogList}
            lastElementRef={lastElementRef} // 마지막 요소 ref 전달
          />
        ) : (
          <CodiLogCalendar
            TheMonth={TheMonth}
            TheYear={TheYear}
            feltWeather={feltWeather}
            setModalActive={setModalActive}
            codiLogList={codiLogList}
            ALLcodiLogList={ALLcodiLogList}
            lastElementRef={lastElementRef} // 마지막 요소 ref 전달
            today={today}
          />
        )}
      </section>

      <Footer />

      <button
        className={styleBtn.writeBtn}
        onClick={goLogWrite}
      >
        기록하기
      </button>

      {modalActive ? (
        <section className={style.CodiLogModal}>
          <CodiLogBox
            setModalActive={setModalActive}
            modalActive={modalActive}
          />
        </section>
      ) : (
        ''
      )}

      {alreadyLog ? (
        <section className={style.CodiLogModal}>

          <div className={`${style.CodiLogBox} ${style.alreadyLog}`}>
            <div className={style.top}>
              <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setAlreadyLog(false)} alt="x" />
            </div>
            <img src="img/icons/common/alert.svg" alt="alert" />
            <h3 className='fontHead3'>이미 코디 기록을<br />하셨어요!</h3>
          </div>
        </section>
      ) : ''
      }


    </main >
  );
};

export default CodiLog;
