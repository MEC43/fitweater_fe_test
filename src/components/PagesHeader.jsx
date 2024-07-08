import style from '../css/PagesHeader.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Region from './Region';

function PagesHeader({ title, clickBack }) {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const referre = queryParams.get('referrer');

  const goBack = () => {
    if (referre === 'edit' || referre === 'cmplt') {
      navigate('/community');
    } else if (referre === 'clctn') {
      navigate('/mypage');
    } else {
      navigate(-1);
    }
  };

  return (
    <header className={`mw ${style.hd} ${style.pagesHd}`}>
      <i
        className="fa-solid fa-chevron-left"
        onClick={clickBack ? clickBack : goBack}
      ></i>
      <div className={style.pagesHdRight}>
        <strong className="fontHead2">{title}</strong>
        {title !== '내 커뮤니티 활동' && (
          <Region color={`var(--white)`} border={`1px solid var(--white)`} />
        )}
      </div>
    </header>
  );
}

export default PagesHeader;
