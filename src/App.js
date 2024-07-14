import "./css/common.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

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
  const { userInfo, token, loginWithToken } = useLoginInfoStore();

  useEffect(() => {
    if (token) {
      loginWithToken(token);
    }
  }, [token]);

  useEffect(() => {
    console.log("---userInfo---", userInfo);
  }, [loginWithToken]);

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
