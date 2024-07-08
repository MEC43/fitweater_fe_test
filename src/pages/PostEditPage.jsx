import style from '../css/PostEditPage.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import PostCategorySelect from '../components/PostCategorySelect';
import PostWriteArea from '../components/PostWriteArea';
import CancelBtn from '../components/CancelBtn';
import SubmitBtn from '../components/SubmitBtn';
import PagesHeader from '../components/PagesHeader';
import ConfirmModal from '../components/ConfirmModal';

import { useRewriteStore } from '../store/rewriteStore';
import { useVerifyPost } from '../store/verifyPostContentStore';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';

function PostEditPage() {
  const navigate = useNavigate();
  const {
    postTitle,
    postContent,
    setTitleErrMsg,
    setContentErrMsg,
    file,
    setFile,
    onReview,
    selectPostCate,
  } = useVerifyPost();
  const { postDetail, originImgPath } = usePostData();
  const RegionFirstName = localStorage.getItem('regionFirstName').slice(0, 2);
  const { isRwrtCofirm, onRwrtCofirm, offRwrtCofirm } = useRewriteStore();
  const { postId } = useParams();

  const postSubmit = (e) => {
    e.preventDefault();
    console.log(e);
  };

  console.log('원래 이미지 경로', originImgPath);
  const clickEditBtn = (e) => {
    e.preventDefault();
    console.log('포스트아이디', postId);

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

    onRwrtCofirm();
  };
  const cancelEditBtn = () => {
    window.location = `/detail/${postId}`;
  };

  const cofirmCancelBtn = () => {
    offRwrtCofirm();
  };

  const confirmSubmitBtn = async () => {
    //수정하기 최종확인 버튼 클릭시
    offRwrtCofirm();

    const updateData = new FormData();
    updateData.set('postCate', selectPostCate);
    updateData.set('onReview', onReview);
    updateData.set('title', postTitle);
    updateData.set('content', postContent);
    updateData.set('region', RegionFirstName);
    // 새 파일이 선택된 경우에만 파일을 추가
    if (file) {
      updateData.set('file', file);
    } else if (originImgPath) {
      updateData.set('originImgPath', originImgPath);
    }

    console.log('카테고리', updateData.get('postCate'));
    console.log('코디리뷰', updateData.get('onReview'));
    console.log('제목', updateData.get('title'));
    console.log('내용', updateData.get('content'));
    console.log('파일', updateData.get('file'));
    console.log('원래이미지', updateData.get('originImgPath'));
    console.log('지역', updateData.get('region'));

    // 백엔드로 데이터를 전송
    const response = await fetch(`${url}/posts/postUpdate/${postId}`, {
      method: 'PUT',
      body: updateData,
      credentials: 'include',
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      console.log(data);
      setFile(null);
      navigate(`/detail/${postId}?referrer=edit`);
    }
  };

  const clickBack = () => {
    navigate('/community');
  };

  return (
    <>
      <PagesHeader title={'글수정'} clickBack={clickBack} />
      <main className={`mw ${style.postWritePage}`}>
        <form onSubmit={postSubmit} className={style.postWriteForm}>
          <PostCategorySelect />
          <PostWriteArea />
          <div className={style.editBtnCon}>
            <CancelBtn clickCancel={cancelEditBtn} />
            <SubmitBtn text={'수정하기'} postSubmit={clickEditBtn} />
          </div>
        </form>
        {isRwrtCofirm && (
          <ConfirmModal
            btnText={'수정하기'}
            message={'글 수정을 완료하시겠습니까?'}
            clickCancel={cofirmCancelBtn}
            clickDelAndSubmt={confirmSubmitBtn}
          />
        )}
      </main>
    </>
  );
}

export default PostEditPage;
