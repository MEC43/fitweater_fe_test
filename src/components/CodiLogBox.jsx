import { useEffect, useState } from 'react'
import style from '../css/Codi.module.css'
import { url } from '../store/ref';
import ActionSheet from '../components/ActionSheet'
const CodiLogBox = ({ setModalActive, modalActive }) => {
    console.log(modalActive);
    // ** ActionSheet
    const [actionSheetActive, setActionSheetActive] = useState(false);
    const [canEdit, setCanEdit] = useState(false);//수정 가능한지 아닌지
    const [codiLog, setCodiLog] = useState([]);
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState('');
    useEffect(() => {
        fetch(`${url}/codiLogDetail/${modalActive}`)//get요청 보냄
            .then((res) => res.json())
            .then((data) => {
                setCodiLog(data);
                setTags(data.tag);
                setDate(`${data.codiDate.split('-')[0]}년  ${data.codiDate.split('-')[1]}월 ${data.codiDate.split('-')[2]}일 `);

                console.log('--- 선택 기록 data 전달 성공----', data);
                // 오늘 날짜 저장
                const today = new Date();
                // codiDate 문자열을 Date 객체로 변환
                const codiDate = new Date(data.codiDate);
                const diff = (today - codiDate) / (1000 * 60 * 60 * 24); // 며칠 차이나는지 계산
                if (diff < 3) {
                    setCanEdit(true);
                } else {
                    setCanEdit(false);
                }
            })
    }, [])
    return (
        <div className={style.CodiLogBox}>
            <div className={style.top}>
                <img src="img/icons/common/x.svg" className={style.XIcon} onClick={() => setModalActive(false)} alt="x" />
                <h3 className='fontHead3'>내 코디 기록</h3>
                <img src="img/icons/common/dot.svg" className={style.DotIcon} onClick={() => setActionSheetActive(true)} alt="dot" />
            </div>
            <div className={style.postInfo}>
                <span className={`fontTitleS ${style.date}`}>
                    {date}
                </span>
                <img src="img/icons/common/12devider.svg" alt="12devider" />
                <span className={`fontTitleS ${style.weather}`}> {codiLog.maxTemp}°/ {codiLog.minTemp}°</span>
                {/* <img src="img/icons/common/12devider.svg" alt="12devider" /> */}
                <span className={`fontTitleS ${style.sky}`}>흐리고 비</span>
            </div>
            <div className={style.imgBox}>
                <img src={`${url}/${codiLog.image}`} alt={codiLog.image} />
            </div>
            <div className={style.tags}>
                {
                    // <span className={`fontTitleXS ${style.miniTag}`}>ddd</span>
                    tags.map((feltTag, index) => {
                        return (
                            <span className={`fontTitleXS ${style.miniTag}`} key={index}>{feltTag}</span>
                        );
                    })
                }
            </div>
            <p className={`fontDecorate ${style.codiMemo}`}>
                {codiLog.memo}
            </p>
            <ActionSheet setActionSheetActive={setActionSheetActive} actionSheetActive={actionSheetActive} canEdit={canEdit} codiLogId={modalActive} />
        </div >
    )
}
export default CodiLogBox
