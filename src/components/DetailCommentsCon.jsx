import style from '../css/DetailCommentsCon.module.css';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DetailComment from './DetailComment';
import { url } from '../store/ref';
import { usePostData } from '../store/postDataStore';
import { useCmntOptnMenu } from '../store/onCmntOptnMenuStore';
import { useLoginInfoStore } from '../store/loginInfoStore';

function DetailCommentsCon({ fetchPostDetail }) {
  const [onCmntRewrite, setOnCmntRewrite] = useState(false); // 수정하기 클릭 유무
  const [editingCommentId, setEditingCommentId] = useState(null);
  const { postDetail } = usePostData();
  const [comment, setComment] = useState('');
  const { cmntErrMsg, setCmntErrMsg, cmntData, setCmntData } =
    useCmntOptnMenu();
  const { postId } = useParams();
  const { userInfo } = useLoginInfoStore();
  const userId = userInfo.userid;
  const username = userInfo.username;

  const getComment = (e) => {
    setComment(e.target.value);
    if (e.target.value !== '') {
      setCmntErrMsg('');
    }
  };

  //댓글 등록버튼 클릭시
  const commentSubmit = async () => {
    if (comment === '') {
      setCmntErrMsg('댓글 내용을 입력해주세요');
      document.getElementById('cmntInput').focus();
      return;
    }

    //DB에 저장하는 로직
    try {
      const response = await fetch(`${url}/comments/cmntAdd`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId,
          content: comment,
          userId,
          username,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      console.log('새로운 댓글', data);
      // setCmntData(data);
      setComment('');
      fetchCmnts();
    } catch (error) {
      console.log(error);
    }
  };

  // 댓글 데이터 불러오기 요청
  const fetchCmnts = useCallback(() => {
    fetch(`${url}/comments/cmntList/${postId}`) //
      .then((res) => res.json()) //
      .then((data) => {
        console.log('받아온 데이터', data);

        setCmntData(data.cmntList);
        fetchPostDetail();
        // console.log('cmntData에 저장된', cmntData);
      });
  }, [postId]);
  useEffect(() => {
    setCmntErrMsg();
    fetchCmnts();
  }, [fetchCmnts]);

  return (
    <div className={style.commentsCon}>
      <div className={style.commentCount}>
        <span className="fontHead3">댓글 </span>
        <span className="fontHead3">{postDetail.commentsCount}</span>
      </div>
      <div className={style.commentWrite}>
        <textarea
          className="fontBodyM"
          id="cmntInput"
          placeholder="댓글을 입력하세요."
          maxLength="300"
          value={comment}
          onChange={getComment}
        />
        <p className={`fontBodyS ${style.cmntErrMsg}`}>{cmntErrMsg}</p>
        <button className="fontTitleM" onClick={commentSubmit}>
          등록
        </button>
      </div>
      <ul className={style.commentsList}>
        {cmntData &&
          cmntData.map((cmnt) => (
            <DetailComment
              key={cmnt._id}
              cmnt={cmnt}
              fetchCmnts={fetchCmnts}
              editingCommentId={editingCommentId}
              setEditingCommentId={setEditingCommentId}
              onCmntRewrite={onCmntRewrite}
              setOnCmntRewrite={setOnCmntRewrite}
              postId={postId}
              userProfileImg={cmnt.userProfileImg}
            />
          ))}
      </ul>
    </div>
  );
}

export default DetailCommentsCon;
