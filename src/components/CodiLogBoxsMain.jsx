import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "../css/Codi.module.css";
import ActionSheet from "./ActionSheet";
import { url } from "../store/ref";

import { useLoginInfoStore } from "../store/loginInfoStore"; //유저정보 import

const CodiLogBoxsMain = () => {
    // useState for ActionSheet
    const [today, setToday] = useState('');//오늘날짜
    const [todayText, setTodayText] = useState('');// 오늘날짜 화면출력용
    const [canEdit, setCanEdit] = useState(false);//수정 가능한지 아닌지
    const [actionSheetActive, setActionSheetActive] = useState(false);
    const [tags, setTags] = useState([]);
    const [userid, setUserid] = useState('');

    // 로컬스토리지에서 받아올 오늘 날씨 정보
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [sky, setSky] = useState('');

    const [logToday, setLogToday] = useState('');//받아온 오늘 기록
    const [codiLogId, setCodiLogId] = useState('');//코디로그 고유 _id
    const { userInfo } = useLoginInfoStore();

    const [similarLog, setSimilarLog] = useState('');//비슷한 날씨의 과거 기록 data
    const [similarLogDate, setSimilarLogDate] = useState('');//비슷한 날씨의 과거 기록- 날짜 화면 출력용
    const [similarLogTags, setSimilarLogTags] = useState(['']);//비슷한 날씨의 과거 기록 -tags

    useEffect(() => {
        if (userInfo) {
            // console.log('userInfouserInfouserInfo', userInfo);
            setUserid(userInfo.userid);
        }
    }, [userInfo]);

    useEffect(() => {
        // 오늘 날짜 저장
        const currentDate = new Date();
        const options = {
            year: 'numeric',
            month: '2-digit', //2자리 맞추도록 
            day: '2-digit',
        };
        const today = currentDate.toLocaleString('ko-KR', options).replace(/\./g, '').replace(/\ /g, '-');//0000-00-00
        // console.log('today', today);
        setToday(today);
        setTodayText(`${today.split('-')[0]}년  ${today.split('-')[1]}월 ${today.split('-')[2]}일`);

        const storedMinTemp = localStorage.getItem('minTemp');
        const storedMaxTemp = localStorage.getItem('maxTemp');
        const storedSky = localStorage.getItem('weatherText');

        if (storedMinTemp) { setMinTemp(storedMinTemp); }
        if (storedMaxTemp) { setMaxTemp(storedMaxTemp); }
        if (storedSky) {
            setSky(storedSky);
        }

    }, [])

    const checkCanEdit = (logDate) => {
        const day = new Date(today);  // today 문자열을 Date 객체로 변환
        const logDay = new Date(logDate);  // today 문자열을 Date 객체로 변환
        const diff = (day - logDay) / (1000 * 60 * 60 * 24); // 며칠 차이나는지 계산
        if (diff < 3) {
            setCanEdit(true);
        } else {
            setCanEdit(false);
        }
    }

    // 오늘 날씨랑 비슷한 과거의 기록
    useEffect(() => {
        if (userid && sky && minTemp && maxTemp) {
            fetch(`${url}/codiLogSimilar/${maxTemp}/${minTemp}/${sky}/${userid}/${today}`)//
                .then((res) => res.json())//
                .then((similarData) => {
                    if (similarData) {
                        setSimilarLog(similarData);
                        setSimilarLogDate(`${similarData.codiDate.split('-')[0]}년  ${similarData.codiDate.split('-')[1]}월 ${similarData.codiDate.split('-')[2]}일`);
                        setSimilarLogTags(similarData.tag);
                        console.log('=====codiLogSimilar====', similarData)
                    } else {
                        console.log('=====similarData 없음====');
                    }

                })
        }
    }, [userid, sky, minTemp, maxTemp])

    // 오늘 기록 가져오기
    useEffect(() => {
        if (today && userid) {
            fetch(`${url}/codiLogToday/${today}/${userid}`)//get요청 보냄 
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        setLogToday(data);
                        setTags(data.tag);
                        setCodiLogId(data._id)
                        console.log('---선택 기록 setLogToday 전달 성공----', data);
                    } else {
                        setLogToday('');
                        console.log('=====codiLogToday 없음====');
                    }
                });
        }

    }, [today, userid])

    return (
        <section className={style.CodiLogBoxsMain}>

            <div className={`${style.logBox} ${style.similar}`}>
                <div className={style.top}>
                    <h3 className='fontHead3'>비슷한 날씨의 코디 기록</h3>

                    {similarLog ? (
                        <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => {
                            setActionSheetActive(similarLog._id)
                            checkCanEdit(similarLog.codiDate);
                        }} alt="dot" />) : ''
                    }
                </div>

                {
                    similarLog ? (
                        <>
                            <div className={style.postInfo}>
                                <span className={`fontTitleS ${style.date}`}>
                                    {similarLogDate}
                                </span>
                                <img src="img/icons/common/12devider.svg" alt="12devider" />
                                <span className={`fontTitleS ${style.weather}`}> {similarLog.maxTemp}°/ {similarLog.minTemp}°</span>
                                {/* <img src="img/icons/common/12devider.svg" alt="12devider" /> */}
                                <span className={`fontTitleS ${style.sky}`}>{similarLog.sky}</span>
                            </div>
                            <div className={style.imgBox}>
                                <img src={`${url}/${similarLog.image}`} alt={similarLog.image} />
                            </div>
                            <div className={style.tags}>
                                {similarLogTags && similarLogTags.map((feltTag, index) => (
                                    <span className={`fontTitleXS ${style.miniTag}`} key={index}>{feltTag}</span>
                                ))}
                            </div>
                            <p className={`fontDecorate ${style.codiMemo}`}>{similarLog.memo}</p>
                        </>) : (
                        <>
                            <div className={style.noLogToday}>
                                <img src="img/icons/common/alertG600.svg" alt="alert" />
                                <span className="fontTitleM">비슷한 날씨의 과거 기록이 없어요 T.T</span>
                            </div>

                        </>
                    )
                }
            </div >


            <div className={`${style.logBox} ${style.today}`}>
                <div className={style.top}>
                    <h3 className='fontHead3'>오늘의 코디 기록</h3>

                    {logToday ? (
                        <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => { setActionSheetActive(codiLogId); setCanEdit(true); }} alt="dot" />
                    ) : ''}
                </div>

                <div className={style.postInfo}>
                    <span className={`fontTitleS ${style.date}`}>
                        {todayText}
                    </span>
                    <img src="img/icons/common/12devider.svg" alt="12devider" />
                    <span className={`fontTitleS ${style.weather}`}> {maxTemp}°/ {minTemp}°</span>
                    {/* <img src="img/icons/common/12devider.svg" alt="12devider" /> */}
                    <span className={`fontTitleS ${style.sky}`}>{sky}</span>
                </div>
                {
                    logToday ? (
                        <>
                            <div className={style.imgBox}>
                                <img src={`${url}/${logToday.image}`} alt={logToday.image} />
                            </div>
                            <div className={style.tags}>
                                {tags && tags.map((feltTag, index) => (
                                    <span className={`fontTitleXS ${style.miniTag}`} key={index}>{feltTag}</span>
                                ))}
                            </div>
                            <p className={`fontDecorate ${style.codiMemo}`}>{logToday.memo}</p>
                        </>) : (
                        <>
                            <div className={style.noLogToday}>
                                <img src="img/icons/common/alertG600.svg" alt="alert" />
                                <span className="fontTitleM">오늘 코디 기록을 안하셨어요 !</span>
                            </div>
                            <Link to={"/codiWrite"} className={`fontTitleM ${style.btnWide}`}>
                                오늘 코디 기록하기
                            </Link>
                        </>
                    )
                }
            </div >


            <ActionSheet
                setActionSheetActive={setActionSheetActive}
                actionSheetActive={actionSheetActive}
                canEdit={canEdit}
                codiLogId={actionSheetActive}
            />
        </section >
    );
};

export default CodiLogBoxsMain;