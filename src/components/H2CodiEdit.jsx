import style from "../css/H2.module.css";
import { useNavigate, useLocation } from 'react-router-dom';
import { useGoBackStore } from '../store/goBackStore';

const H2CodiEdit = ({ tagAddress }) => {


    const location = useLocation();
    const navigate = useNavigate();
    const goBack = useGoBackStore((state) => state.goBack);


    const handleGoBack = () => {
        goBack(location, navigate);
    };



    return (
        <section className={style.header2}>
            <img src="img/icons/common/goBack.svg" onClick={handleGoBack} className={style.btnGoBack} alt="goBack" />
            <h2 className='fontHead2'>코디 기록 수정</h2>
            <span className={`fontTitleXS ${style.miniTag}`}>
                {tagAddress}
            </span>
        </section>
    )
}

export default H2CodiEdit