import style from "../css/MypageArchive.module.css";
import { Link } from "react-router-dom";

function MypageArchive() {
  return (
    <div className={style.archive}>
      <Link to="/mystyle">
        <span className="fontBodyM">내 옷 취향</span>
      </Link>
      <Link to="/codiLog">
        <span className="fontBodyM">내 코디 기록</span>
      </Link>
      <Link to="/comuCollect">
        <span className="fontBodyM">내 커뮤니티 활동</span>
      </Link>
    </div>
  );
}

export default MypageArchive;
