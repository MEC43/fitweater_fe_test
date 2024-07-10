import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useLoginInfoStore } from "../store/loginInfoStore";
import style from "../css/Avatar.module.css";

const Avatar = ({ topUrl, bottomUrl, outerUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const { setUsergender } = useLoginInfoStore();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [gender, setGender] = useState(null); // gender 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      if (token) {
        if (token.includes(".")) {
          try {
            const decodedToken = jwtDecode(token);
            setUsergender(decodedToken.gender);
            setGender(decodedToken.gender); // gender 설정
            // console.log("아바타 영역", decodedToken);
          } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
          }
        } else {
          setToken(null); // token 상태를 업데이트합니다.
        }
      }
    };
    fetchData();
  }, [token]);

  useEffect(() => {
    console.log('Avatar URLs:', { topUrl, bottomUrl, outerUrl });
    if (topUrl || bottomUrl || outerUrl) {
      setIsLoading(false);
    }
  }, [topUrl, bottomUrl, outerUrl]);

  return (
    <section className={style.avatar}>
      {isLoading ? (
        <>
          <img
            className={style.person}
            src="img/clothes/woman.svg"
            alt="여자"
          />
          <img
            className={style.top}
            src="img/clothes/short_sleeve_T.svg"
            alt="상의"
          />
          <img
            className={style.bottom}
            src="img/clothes/short_pants.svg"
            alt="하의"
          />
        </>
      ) : (
        <>
          <img
            className={style.person}
            src={`img/clothes/${gender === "male" ? "man" : "woman"}.svg`}
            alt={gender === "male" ? "남자" : "여자"}
          />
          {topUrl && <img className={style.top} src={topUrl} alt="상의" />}
          {bottomUrl && (
            <img className={style.bottom} src={bottomUrl} alt="하의" />
          )}
          {outerUrl && (
            <img className={style.outer} src={outerUrl} alt="아우터" />
          )}
        </>
      )}
    </section>
  );
};

export default Avatar;
