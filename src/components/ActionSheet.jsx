import { useEffect, useState } from 'react'
import style from '../css/Codi.module.css'
// import { codiEditStore } from '../store/codiStore';
import { useNavigate } from 'react-router-dom';
import { url } from "../store/ref";

const ActionSheet = ({ actionSheetActive, setActionSheetActive, canEdit, codiLogId }) => {
    const navigate = useNavigate();
    const [modalActive, setModalActive] = useState(false);

    // const { codiLogEdit } = codiEditStore();
    useEffect(() => {

        console.log(codiLogId, '<<<codiLogId');
        const ActionSheet = document.querySelector(`.${style.ActionSheet}.${style.active}`)
        const ActionBox = document.querySelector(`.${style.ActionBox}.${style.active}`);

        const handleClickOutside = (e) => {
            // console.log('---handleClickOutside');
            if (actionSheetActive && !ActionBox.contains(e.target) && ActionSheet.contains(e.target)) {
                setActionSheetActive(false);
                // console.log('바깥클릭함');
            }
        };
        document.addEventListener('click', handleClickOutside);


        // 스크롤 막기
        function preventScroll(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        if (actionSheetActive) {        // 스크롤 막기 활성화
            window.addEventListener('scroll', preventScroll, { passive: false });
            window.addEventListener('wheel', preventScroll, { passive: false });
            window.addEventListener('touchmove', preventScroll, { passive: false });
        }
        // clean-up 함수: 컴포넌트가 unmount(제거)될 때 이벤트 리스너 제거
        return () => {
            document.removeEventListener('click', handleClickOutside);
            // 스크롤 허용
            window.removeEventListener('scroll', preventScroll, { passive: false });
            window.removeEventListener('wheel', preventScroll, { passive: false });
            window.removeEventListener('touchmove', preventScroll, { passive: false });
        };
    }, [actionSheetActive, setActionSheetActive])


    const editLog = () => {
        console.log('수정 클릭');
        navigate(`/codiEdit`, { state: { codiLogId: codiLogId } });
        // 수정페이지로 이동하기
    }
    const deleteLog = async () => {
        console.log('삭제 클릭');
        const response = await fetch(`${url}/codiDelete/${codiLogId}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            console.log('삭제 완료');
            navigate(-1);
            window.location.reload(); // 페이지 새로고침
        }
    }

    return (
        <section className={`${style.ActionSheet} ${actionSheetActive ? style.active : ''}`}>
            <div className={`${style.ActionBox} ${actionSheetActive ? style.active : ''}`} >
                {canEdit ?
                    <button className='fontTitleM' onClick={editLog}>수정하기</button> : ''
                }
                <button className='fontTitleM' onClick={() => setModalActive(true)}>삭제하기</button>
            </div>


            {modalActive ? (<div className={style.modalCheck}>
                <div className={style.modalBox}>
                    <span className='fontHead3'>코디 기록을 삭제하시겠습니까?</span>
                    <div className={style.btns}>
                        <button className={`fontTitleM ${style.btnCancel}`} onClick={() => setModalActive(false)}>취소</button>
                        <button className={`fontTitleM ${style.btnMethod}`} onClick={deleteLog} >삭제하기</button>
                    </div>
                </div>
            </div>) : ''
            }
        </section>
    )
}

export default ActionSheet