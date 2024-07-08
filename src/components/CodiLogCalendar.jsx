import { useEffect, useState, useRef } from 'react';
import style from '../css/Codi.module.css'
import { url } from '../store/ref'
const CodiLogCalendar = ({ feltWeather, setModalActive, ALLcodiLogList, codiLogList, lastElementRef, TheMonth, TheYear, today }) => {

    console.log('필터 종류 - 달력/codiLogList', feltWeather,);
    console.log('codiLogList- 달력/', codiLogList);
    const [monthBoxes, setMonthBoxes] = useState([]); // 렌더링할 달력 박스들
    const dayBoxesRef = useRef([]); // useRef를 사용하여 dayBoxesRef 생성 -> 모든 day
    const hasLogsRef = useRef([]); // useRef를 사용하여 hasLogsRef 생성 -> 기록이 있는 day

    // const [today, setToday] = useState('');

    // 해당 달에 대한 상태
    const [LastDate, setLastDate] = useState('');//해당 달 며칠까지 있는지
    const [FirstDay, setFirstDay] = useState('');//해당 달 첫날 요일

    useEffect(() => {//변동감지용
        // console.log('----- TheYear TheMonth 변동 : ', TheYear, TheMonth);
        getFirstLastDate(TheYear, TheMonth);
        // getToday();
    }, [TheYear, TheMonth])

    useEffect(() => {//변동감지용
        // console.log('-----FirstDay LastDate 변동 : ', TheMonth, '월:', FirstDay, '요일부터/', LastDate, '일까지');
        if (FirstDay !== '' && LastDate !== '') {
            addMonthBox(TheYear, TheMonth, FirstDay, LastDate); // FirstDay와 LastDate가 모두 설정된 후에만 호출
        }
    }, [FirstDay, LastDate, codiLogList])


    useEffect(() => {
        updateDayBoxesClass();// 순회하며 코디 기록이 있는 날짜에 class, img 부여
    }, [ALLcodiLogList]);

    useEffect(() => {
        updateBoxesHasTag();
    }, [feltWeather, codiLogList]);


    // function getToday() {
    //     // 오늘 날짜를 생성하여 'YYYY-MM-DD' 형식의 문자열로 변환
    //     const today = new Date();
    //     const year = today.getFullYear();
    //     const month = String(today.getMonth() + 1).padStart(2, '0'); // 월을 2자리로 변환
    //     const day = String(today.getDate()).padStart(2, '0'); // 일을 2자리로 변환
    //     const todayString = `${year}-${month}-${day}`;

    //     return setToday(todayString);
    // }

    function getFirstLastDate(Year, Month) {
        const lastDay = new Date(Year, Month, 0).getDate(); // 이번 달의 마지막 일자
        const firstDayOfWeek = new Date(Year, Month - 1, 1).getDay();//(0: 일요일, 1: 월요일, ..., 6: 토요일)
        // console.log('getFirstLastDate', firstDayOfWeek);
        // if (lastDay && firstDayOfWeek) {
        if (lastDay !== undefined && firstDayOfWeek !== undefined) {

            setLastDate(lastDay);
            setFirstDay(firstDayOfWeek);
        }
    };

    function renderEmptyDayBoxs(FirstDay) {
        const emptyDayBoxs = [];
        for (let i = 0; i < FirstDay; i++) {
            emptyDayBoxs.push(<li key={`emptyBox${i}`}></li>);
        }
        return emptyDayBoxs;
    };

    function renderDayBoxs(Year, Month, LastDay) {
        const dayBoxs = [];
        const monthNum = Month.toString().padStart(2, '0');

        for (let i = 1; i < LastDay + 1; i++) {
            let dayNum = i.toString().padStart(2, '0');
            const targetDate = `${Year}-${monthNum}-${dayNum}`;
            dayBoxs.push(
                <li
                    ref={(el) => dayBoxesRef.current.push(el)} // 각 li 요소에 ref를 설정하여 dayBoxesRef에 저장
                    className={style.day}
                    key={targetDate}
                    data-targetdate={targetDate} // targetDate를 data-targetdate 속성으로 추가
                >
                    < div className={style.imgCon} >
                        {/* 기록 있으면 여기 사진들어갈 것임 */}
                    </ div >
                    <span >{i}</span>
                </li >);
        }
        return dayBoxs;
    }

    function renderTheMonthBox(TheYear, TheMonth, FirstDay, LastDate) {
        // console.log('renderTheMonthBox', TheYear, TheMonth);
        return (
            <div ref={lastElementRef} className={style.month} key={`${TheYear}-${TheMonth}`}>
                <strong className='fontTitleM'>{TheMonth !== 1 ? TheYear : TheYear + 1}년 {TheMonth}월</strong>
                <ul className={`fontBodyL ${style.dayName}`}>
                    <li><span>일</span></li>
                    <li><span>월</span></li>
                    <li><span>화</span></li>
                    <li><span>수</span></li>
                    <li><span>목</span></li>
                    <li><span>금</span></li>
                    <li><span>토</span></li>
                </ul>
                <ul className={`fontBodyL ${style.daysCon}`}>

                    {/* 첫째 날이 시작하는 요일까지 빈 요소를 추가 */}
                    {renderEmptyDayBoxs(FirstDay)}

                    {/* 해당 달의 마지막날까지 day 박스 추가 */}
                    {renderDayBoxs(TheYear, TheMonth, LastDate)}

                </ul >
            </div >
        )
    }

    function addMonthBox(Year, Month, FirstDay, LastDate) {
        const newMonthBox = renderTheMonthBox(Year, Month, FirstDay, LastDate);

        // monthBoxes 배열에서 key 값이 newMonthBox.key와 같은 요소를 제외 => 맨 처음에 이상한 7월 Box 생성되는거 없애서 해결
        setMonthBoxes(prevBoxes => prevBoxes.filter(box => box.key !== newMonthBox.key));

        setMonthBoxes(prevBoxes => [...prevBoxes, newMonthBox,]); // 새로운 박스를 뒤에 추가
    }

    function updateDayBoxesClass() {
        dayBoxesRef.current.forEach((dayBox) => {
            if (dayBox) {
                const targetDate = dayBox.getAttribute('data-targetdate'); // 요소가 존재할 때만 처리

                if (targetDate) {
                    const foundLog = ALLcodiLogList.find(obj => obj.codiDate === targetDate);
                    if (foundLog !== undefined) {
                        dayBox.classList.add(style.hasLog);
                        dayBox.addEventListener('click', () => setModalActive(foundLog._id));
                        // 이미지가 이미 있는지 확인
                        const imgContainer = dayBox.querySelector(`.${style.imgCon}`);
                        if (!imgContainer.querySelector('img')) {
                            const img = document.createElement('img');
                            img.src = `${url}/${foundLog.image}`;
                            img.alt = `${foundLog.image}`;
                            // img.onload = () => console.log(`Image loaded: ${targetDate}`);
                            imgContainer.appendChild(img);
                        }

                        dayBox.setAttribute('data-tag', foundLog.tag); // foundLog가 있을 경우 data-tag 속성 설정
                        hasLogsRef.current.push(dayBox); // foundLog가 있는 경우 dayBox의 ref를 hasLogsRef에 추가

                    }
                    if (targetDate === today) {
                        dayBox.classList.add(style.activeToday);
                    }
                }
            }
        });
    }


    function updateBoxesHasTag() {
        hasLogsRef.current.forEach((dayBox) => {
            dayBox.classList.remove(style.activeTag);

            if (dayBox) {
                const targetTag = dayBox.getAttribute('data-tag');// 요소가 존재할 때만 처리
                const tagArray = targetTag.split(','); //기록 li들이 갖고 있는 tag 배열화

                // console.log('-------', tagArray);
                if (feltWeather.length && feltWeather.every((activeTag) => tagArray.includes(activeTag))) {
                    dayBox.classList.add(style.activeTag);
                }
            }
        });
    }

    return (
        <div className={style.calendarWrap} >

            {monthBoxes}

        </div >
    )
}

export default CodiLogCalendar


{/*----------- li samples -----------*/ }

{/* <li className={`${style.day} ${style.activeToday}`}>
    <div className={style.imgCon}>
        <img src={`${url}/uploads/codiLog/1719854442475.jpeg`} alt="" />
    </div>
    <span>5</span>
</li> */}
