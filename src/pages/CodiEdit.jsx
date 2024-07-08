import React, { useState, useEffect } from 'react';
import H2CodiEdit from "../components/H2CodiEdit";
import style from '../css/Codi.module.css';
import { url } from "../store/ref";

import { useFeltOptionsStore } from '../store/codiStore';

import { useNavigate, useLocation } from 'react-router-dom';

const CodiEdit = () => {
    const imgCon = document.querySelector(`.${style.imgCon}`);

    const location = useLocation();
    const navigate = useNavigate();

    // ** btnGoBack
    const goBack = () => {
        navigate(-1); // 이전 페이지로 이동
    }

    const { feltOptions } = useFeltOptionsStore();  // Zustand 스토어에서 필요한 상태 가져오기
    const { codiLogId } = location.state || {}; // state가 없을 때를 대비한 안전한 접근 방법
    // console.log(codiLogId);

    const [originLog, setOriginLog] = useState('');
    const [codiDate, setCodiDate] = useState('');

    // 상태 설정
    const [activeOptions, setActiveOptions] = useState([]);    // 선택한 옵션 배열. 초기 상태는 빈 배열
    const [memo, setMemo] = useState('');                       // 메모 상태
    const [file, setFile] = useState('');                       // 파일 상태
    const [filePreview, setFilePreview] = useState('');         // 파일 미리보기 URL 상태

    const [modalActive, setModalActive] = useState(false);
    const [fileMss, setFileMss] = useState('');                 // 파일 메시지 상태

    useEffect(() => {
        fetch(`${url}/codiLogDetail/${codiLogId}`)//get요청 보냄 
            .then((res) => res.json())
            .then((data) => {
                setOriginLog(data);
                // console.log('---선택 기록 data 전달 성공----', data);
                setCodiDate(`${data.codiDate.split('-')[0]}년 ${data.codiDate.split('-')[1]}월 ${data.codiDate.split('-')[2]}일`);
                setActiveOptions(data.tag);
                setMemo(data.memo);
                // 파일 경로 문자열에서 Blob으로 변환
                fetch(`${url}/${data.image}`)
                    .then(res => res.blob())  // 파일 경로를 Blob으로 변환
                    .then(blob => setFile(blob));  // Blob 상태 업데이트
            });
    }, []);



    // 체감날씨 버튼 클릭 핸들러
    const handleBtnClick = (option) => {
        if (activeOptions.includes(option)) {
            const updateActiveOptions = activeOptions.filter(item => item !== option);
            setActiveOptions(updateActiveOptions);
            // console.log(activeOptions);
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
    const handleSubmit = (e) => {
        e.preventDefault();  // 기본 제출 동작 막기
        if (filePreview === '') {
            setFileMss('* 사진을 첨부해주세요.');
            imgCon.style.border = '1px solid var(--accnet-color)';
            return;
        } else {
            setFileMss('');
            setModalActive(true);
        }
    };

    // 진짜 수정 제출
    const realSubmit = async () => {
        // FormData 객체 생성 및 데이터 추가
        const data = new FormData();
        data.set('file', file);
        data.set('memo', memo);
        data.delete('tag');
        activeOptions.forEach(option => data.append('tag', option));

        // FormData 객체의 내용 확인 (디버깅용)
        for (let [key, value] of data.entries()) {
            console.log(key, value);
        }
        try {
            const response = await fetch(`${url}/codiEdit/${codiLogId}`, {
                method: 'PUT',
                body: data,
            });
            if (response.ok) {
                console.log('/n response@@@@', response);
                navigate(-1);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <main className={`mw ${style.codiWrite}`}>
            <H2CodiEdit tagAddress={originLog.address} />
            <section className={style.codiWriteFrame}>
                <h3 className='fontHead3'>{codiDate}</h3>
                <div className={style.weatherInfo}>
                    <span className={`fontTitleXS ${style.miniTag}`}>{originLog.address}</span>
                    <span className={`fontTitleS ${style.temp}`}>{originLog.maxTemp}°C/{originLog.minTemp}°C</span>
                    <img src="img/icons/common/12devider.svg" alt="12devider" />
                    <span className={`fontTitleS ${style.sky}`}>{originLog.sky}</span>
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
                    ></textarea>
                </div>
            </section>

            <div className={style.bottomBtns}>
                <button className={`fontTitleM ${style.btnCancel}`} onClick={goBack}>취소</button>
                <button className={`fontTitleM ${style.btnMethod}`} onClick={handleSubmit}>코디 기록 수정하기</button>
            </div>


            {modalActive ? (<div className={style.modalCheck}>
                <div className={style.modalBox}>
                    <span className='fontHead3'>코디 수정을 완료하시겠습니까?</span>
                    <div className={style.btns}>
                        <button className={`fontTitleM ${style.btnCancel}`} onClick={() => setModalActive(false)}>취소</button>
                        <button className={`fontTitleM ${style.btnMethod}`} onClick={realSubmit}>수정 완료하기</button>
                    </div>
                </div>
            </div>) : ''
            }
        </main>
    );
};

export default CodiEdit;
