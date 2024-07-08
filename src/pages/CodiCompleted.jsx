import style from '../css/Codi.module.css';
import { useNavigate, Link } from 'react-router-dom';

const CodiCompleted = () => {

    // ** btnGoBack
    const navigate = useNavigate();
    const goBack = () => {
        navigate(-2); // 이전 페이지로 이동
    }

    // const goCodiLog = () => {
    //     navigate('/codiLog?referrer=completed');
    // }

    return (
        <main className={`mw ${style.CodiCompleted}`}>
            <div className={style.textCon}>

                <img src="img/icons/common/checkCircle.svg" alt="checkCircle" />
                <span className='fontTitleL'>코디 기록이 완료되었습니다</span>

            </div>
            <div className={style.bottomWideBtns}>
                <Link to='/codiLog?referrer=completed' className={`fontTitleM ${style.btnMethodWide}`} >코디 기록 목록으로</Link>
                <button className={`fontTitleM ${style.btnMethodWide}`} onClick={goBack}>이전으로</button>
            </div>
        </main>
    )
}

export default CodiCompleted