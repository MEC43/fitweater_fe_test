import "./css/common.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode"; // jwt로 토큰 해석하는 jwt-decode 라이브러리 설치했습니다! :npm install jwt-decode
import { url } from "./store/ref";

import IndexPage from "./pages/IndexPage";
import CommunityPage from "./pages/CommunityPage";
import DetailPage from "./pages/DetailPage";
import PostWritePage from "./pages/PostWritePage";
import PostWriteCmpltPage from "./pages/PostWriteCmpltPage";
import FashionFeedPage from "./pages/FashionFeedPage";
import PostEditPage from "./pages/PostEditPage";
import TalkPage from "./pages/TalkPage";

// pages
import CodiLog from "../src/pages/CodiLog";
import CodiWrite from "./pages/CodiWrite";
import CodiEdit from "./pages/CodiEdit";
import CodiMain from "./pages/CodiMain";
import CodiCompleted from "./pages/CodiCompleted";

// 로그인, 회원가입
import Login from "./pages/login/Login";
import Signup from "./pages/Signup";
import KakaoLogin from "./pages/login/KakaoLogin";
import Auth from "./pages/login/Auth";
// import KakaoOauth from "./pages/login/KakaoOauth";
import SignupComplete from "./pages/SignupComplete";
import { useLoginInfoStore } from "./store/loginInfoStore";

// 마이페이지 - 메인
import MyInfoManage from "./pages/MyInfoManage";

// 마이페이지 - 커뮤니티 활동
import CommuCollectionPage from "./pages/CommuCollectionPage";
import CommuCollTalk from "./pages/CommuCollTalk";
import CommuCollCmnt from "./pages/CommuCollCmnt";
import CommuCollLike from "./pages/CommuCollLike";
import MypageMain from "./pages/MypageMain";
import MyStyle from "./pages/MyStyle";

function App() {
  const navigate = useNavigate();

  const { userInfo, setUserid, setUsername, setUserprofile } =
    useLoginInfoStore();
  const [token, setToken] = useState(localStorage.getItem("token")); // token 상태를 추가합니다.

  useEffect(() => {
    const fetchData = async () => {
      // const loginToken = localStorage.getItem("token");

      if (token) {
        console.log("token 확인", token); //일반로그인 : 토큰에 .이 있음 / 카카오로그인: 토큰에 . 없음 단순문자열임

        if (token.includes(".")) {
          // . 있음 => 일반로그인 ***
          try {
            const decodedToken = jwtDecode(token);
            setUserid(decodedToken.userid);
            setUsername(decodedToken.username);
            setUserprofile(decodedToken.userprofile);
            console.log(decodedToken); // 여기선 잘뜸.
          } catch (error) {
            console.error("Invalid token", error);
            localStorage.removeItem("token");
          }
        } else {
          // . 없음 => 카카오로그인 ***
          try {
            const user = await getUserData(token);
            await getUserData(token);
            document.cookie = `token=${token}; path=/;`; //쿠키에도 토큰 저장!!
            console.log("카카오 로그인으로 분류됨"); //ok
          } catch (err) {
            // 1_2.  localStorage에 저장된 token이 만료되었다면 token을 삭제하고 null로 업데이트
            console.log(err);
            localStorage.removeItem("token");
            setToken(null); // token 상태를 업데이트합니다.
          }
        }
      }
    };
    fetchData();
  }, [token]);

  const getUserData = async (token) => {
    // 2. Token을 이용하여 카카오 서버에서 인증을 거쳐 사용자 정보를 가져옴
    const response = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
      },
    });
    const user = await response.json();
    // 3. 사용자 정보를 state에 저장
    setUserid(user.id);
    setUsername(user.properties.nickname);
    setUserprofile(user.properties.profile_image);

    // -------
    await registerKakaoUser(
      //카카오로그인 함수
      user.id,
      user.properties.nickname,
      user.properties.profile_image
    );
    console.log("카카오로그인 정보 확인 ", user); //0703 ok
    // -------
  };

  const registerKakaoUser = async (userid, username, profile_image) => {
    try {
      const response = await fetch('https://port-0-fit-weather-backend-lydr6a6pb95d7aa4.sel5.cloudtype.app/kakao-register', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userid,
          username,
          profile_image,
          // password: "",
          // gender: "",
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to register Kakao user");
      }
      console.log(userid, username, profile_image);
      setUserid(userid);
      setUsername(username);
      setUserprofile(profile_image);
    } catch (error) {
      console.error("Error registering Kakao user", error);
    }
  };

  useEffect(() => {
    console.log("---userInfo---", userInfo);
  }, [userInfo]);

  return (
    <div className="App">
      <Routes>
        {/* 메인 */}
        <Route path="/" element={<IndexPage />} />
        {/* 커뮤니티 */}
        <Route path="/community" element={<CommunityPage />}>
          <Route path="" element={<TalkPage />} />
          <Route path="feed" element={<FashionFeedPage />} />
        </Route>
        <Route path="/detail/:postId" element={<DetailPage />} />
        <Route path="/postWrite" element={<PostWritePage />} />
        <Route
          path="/postWriteCmplt/:postid"
          element={<PostWriteCmpltPage />}
        />
        <Route path="/postEdit/:postId" element={<PostEditPage />} />
        <Route path="/*" element={<div>없는 페이지 입니다.</div>} />
        {/* 코디 main */}
        <Route path="/codiMain" element={<CodiMain />} />
        {/* 여기부턴 mypage - 코디기록 */}
        <Route path="/codiLog" element={<CodiLog />} />
        <Route path="/codiWrite" element={<CodiWrite />} />
        <Route path="/codiEdit" element={<CodiEdit />} />
        <Route path="/codiCompleted" element={<CodiCompleted />} />
        {/* 로그인, 회원가입 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/loginKakao" element={<KakaoLogin />} />
        <Route path="/oauth" element={<Auth />} />
        <Route path="/oauth/kakao" element={<Auth />} />
        <Route path="/signupcomplete" element={<SignupComplete />} />
        <Route path="/mystyle" element={<MyStyle />} />
        {/* 마이페이지 */}
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/myinfomanage" element={<MyInfoManage />} />

        {/* 마이페이지 - 커뮤니티 활동 */}
        <Route path="/comuCollect" element={<CommuCollectionPage />}>
          <Route path="" element={<CommuCollTalk />} />
          <Route path="comment" element={<CommuCollCmnt />} />
          <Route path="like" element={<CommuCollLike />} />
        </Route>
        <Route path="/myStyle" element={<MyStyle />} />
      </Routes>
    </div>
  );
}

export default App;
