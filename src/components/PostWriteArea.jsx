import style from '../css/PostWriteArea.module.css';
import PostImgFalse from './PostImgFalse';
import PostImgTrue from './PostImgTrue';
import { useVerifyPost } from '../store/verifyPostContentStore';
import { useEffect, useRef, useState } from 'react';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';

function PostWriteArea() {
  const {
    postTitle,
    postContent,
    setPostTitle,
    setPostContent,
    titleErrMsg,
    contentErrMsg,
    setFile,
  } = useVerifyPost();
  const { postDetail, setOriginImgPath } = usePostData();
  const [imgPreviewUrl, setImgPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (postDetail.title || postDetail.content) {
      setPostTitle(postDetail.title);
      setPostContent(postDetail.content);
    }

    if (postDetail.image) {
      setImgPreviewUrl(`${url}/${postDetail.image}`);
      setOriginImgPath(postDetail.image);
    }

    console.log(postTitle);
    console.log(postContent);
    console.log('DB 이미지경로', postDetail.image);
  }, [postDetail, setPostTitle, setPostContent, postDetail.image]);

  const writeTitle = (e) => {
    setPostTitle(e.target.value);
  };

  const writePostContent = (e) => {
    setPostContent(e.target.value);
  };

  //선택한 사진 미리보기
  const ImgSelect = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      setImgPreviewUrl(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
      setFile(file);
    }

    console.log(file);
  };

  //선택한 사진 삭제
  const removeImage = () => {
    setImgPreviewUrl(null);
    setFile(null);
    fileInputRef.current.value = null;
  };

  return (
    <div className={style.postWriteArea}>
      <label htmlFor="postTitle" className={style.postTitle}>
        <span className="fontHead3">제목</span>
        <input
          type="text"
          name="postTitle"
          id="postTitle"
          placeholder="제목을 입력하세요."
          value={postTitle}
          onChange={writeTitle}
          className="fontBodyM"
        />
        <p className={`fontBodyS ${style.warningMsg}`}>{titleErrMsg}</p>
      </label>

      <label htmlFor="postContent" className={style.postContent}>
        <span className="fontHead3">내용</span>
        <textarea
          id="postContent"
          name="postContent"
          placeholder="오늘 코디를 공유해주세요! 오늘 날씨에는 어떻게 입는게 좋을까요?"
          value={postContent}
          onChange={writePostContent}
          className="fontBodyM"
        />
        <p className={`fontBodyS ${style.warningMsg}`}>{contentErrMsg}</p>
      </label>

      <div className={style.postImg}>
        <span className="fontHead3">사진</span>
        <div className={style.postImgSelect}>
          <input
            type="file"
            accept="image/*"
            id="postImg"
            name="postImg"
            className="fontBodyM"
            onChange={ImgSelect}
            ref={fileInputRef}
          />
          <button type="button">파일업로드</button>
        </div>

        <div className={style.postImgPreview}>
          {imgPreviewUrl ? (
            <>
              <PostImgTrue src={imgPreviewUrl} />
              <i
                className={`fa-solid fa-xmark ${style.removeImg}`}
                onClick={removeImage}
              ></i>
            </>
          ) : (
            <PostImgFalse />
          )}
        </div>
      </div>
    </div>
  );
}

export default PostWriteArea;
