import style from '../css/PostWritePage.module.css';

import PostCategorySelect from "../components/PostCategorySelect";
import PostWriteArea from "../components/PostWriteArea";
import CancelBtn from "../components/CancelBtn";
import SubmitBtn from "../components/SubmitBtn";
import PagesHeader from "../components/PagesHeader";
import { useNavigate } from "react-router-dom";
import { useVerifyPost } from "../store/verifyPostContentStore";
import { usePostData } from "../store/postDataStore";
import { url } from "../store/ref";
import React from "react";
import { useLoginInfoStore } from "../store/loginInfoStore";


function PostWritePage() {
  const navigate = useNavigate();
  const {
    postTitle,
    postContent,
    setTitleErrMsg,
    setContentErrMsg,
    file,
    onReview,
    selectPostCate,
  } = useVerifyPost();
  const { setNewPostId } = usePostData();
  const { userInfo } = useLoginInfoStore();
  const RegionFirstName = localStorage.getItem('regionFirstName').slice(0, 2);
  const userId = userInfo.userid;
  const username = userInfo.username;
  console.log('현재 유저아이디', userId);

  const postSubmit = async (e) => {
    e.preventDefault();

    // 유효성 검사
    if (postTitle === '') {
      setTitleErrMsg('☁️ 제목을 입력해주세요 ☁️');
      document.getElementById('postTitle').focus();
      return;
    } else {
      setTitleErrMsg('');
    }

    if (postContent === '') {
      setContentErrMsg('☁️ 내용을 입력해주세요 ☁️');
      document.getElementById('postContent').focus();
      return;
    } else {
      setContentErrMsg('');
    }

    const data = new FormData();
    data.set('postCate', selectPostCate);
    data.set('onReview', onReview);
    data.set('title', postTitle);
    data.set('content', postContent);
    data.set('region', RegionFirstName);
    if (file) {
      data.append('file', file);
    }

    console.log('카테고리', data.get('postCate'));
    console.log('코디리뷰', data.get('onReview'));
    console.log('제목', data.get('title'));
    console.log('내용', data.get('content'));
    console.log('파일', data.get('file'));
    console.log('지역', data.get('region'));

    // 백엔드로 데이터를 전송하는 부분
    const response = await fetch(
      `${url}/posts/writePost?userId=${userId}&username=${username}`,
      {
        method: 'POST',
        body: data,
        credentials: 'include',
      }
    );
    if (response.ok) {
      const data = await response.json();
      const newPostId = data._id;
      // console.log(response);
      // console.log(data);
      // console.log(newPostId);
      setNewPostId(newPostId);
      navigate(`/postWriteCmplt/${newPostId}`);
    }
  };

  const clickCancel = () => {
    window.location = '/community';
  };

  return (
    <>
      <PagesHeader title={'글쓰기'} />
      <main className={`mw ${style.postWritePage}`}>
        <form className={style.postWriteForm}>
          <PostCategorySelect />
          <PostWriteArea />
          <div className={style.editBtnCon}>
            <CancelBtn clickCancel={clickCancel} />
            <SubmitBtn postSubmit={postSubmit} text={'글쓰기'} />
          </div>
        </form>
      </main>
    </>
  );
}

export default PostWritePage;
