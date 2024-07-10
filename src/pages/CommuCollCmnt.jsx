import style from "../css/CommuCollCmnt.module.css";

import { useEffect, useState } from "react";
import { useOpenMenuModal } from "../store/detailOpMenuModalStore";
import { useCategoryStore } from "../store/categoryStore";
import { usePagination } from "../store/paginationStore";
import { url } from "../store/ref";


import DetailComment from "../components/DetailComment";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";
import { useLoginInfoStore } from "../store/loginInfoStore";

function CommuCollCmnt() {
  const {
    talkPostData,
    setTalkPostData,
    totalResults,
    setTotalResults,
    currentPage,
    setCurrentPage,
    setTotalPages,
  } = usePagination();
  const { setOnMyPageCate } = useCategoryStore();
  const { isModalOpen, modalClose, modalOpen } = useOpenMenuModal();

  useEffect(() => {
    setOnMyPageCate("comment");
  }, []);

  //마이페이지 댓글 삭제 확인 모달에서
  const clickCancel = () => {
    modalClose();
  };

  const { userInfo } = useLoginInfoStore();
  const userId = userInfo.userid;
  const fetchCmntData = async () => {
    try {
      const response = await fetch(
        `${url}/mypage/comments/${userId}?page=${currentPage}`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      const commentsList = data.commentsList;
      console.log("받아온 데이터", data);
      console.log("내 작성글 데이터", commentsList);
      console.log("총 댓글 수", data.totalCmnts);
      if (response.ok) {
        setTalkPostData(commentsList);
        setTotalResults(data.totalCmnts);
        setTotalPages(data.totalPages);
      }
      // 현재 페이지가 총 페이지 수보다 크면 마지막 페이지로 이동
      if (currentPage > data.totalPages) {
        setCurrentPage(data.totalPages);
      }
    } catch (error) {
      console.error("작성댓글 get요청 오류", error);
    }
  };

  useEffect(() => {
    fetchCmntData();
  }, [currentPage]);

  const [selectedCmntId, setSelectedCmntId] = useState({
    postId: null,
    cmntId: null,
  });

  const openDeleteModal = (postId, cmntId) => {
    setSelectedCmntId({ postId, cmntId });
    modalOpen();
  };

  const cmntDelfromMypg = async (postId, cmntId) => {
    console.log("최종 삭제하기 버튼 클릭");

    try {
      console.log("포스트 아이디:", postId, "코멘트 아이디:", cmntId);
      const response = await fetch(
        `${url}/comments/cmntDel/${postId}/${cmntId}`,
        {
          method: "DELETE",
        }
      );
      console.log(response);
      if (response.ok) {
        modalClose();
        fetchCmntData();
        console.log("댓글삭제 완료");
      }
    } catch (error) {
      console.error("댓글 삭제 에러", error);
    }
  };

  return (
    <main className={`mw ${style.commuCollCmnt}`}>
      {talkPostData.length === 0 ? (
        <p className={style.loadingMsg}>작성댓글이 없습니다.</p>
      ) : (
        <>
          <p className={`fontBodyM ${style.myTotal}`}>총 {totalResults} 개</p>
          <ul className={style.cmntListCon}>
            {talkPostData.map((cmnt) => (
              <DetailComment
                key={cmnt._id}
                cmnt={cmnt}
                fromCol={"fromCol"}
                cmntDelfromMypg={() => openDeleteModal(cmnt.postId, cmnt._id)}
              />
            ))}
          </ul>
          {isModalOpen && (
            <ConfirmModal
              clickCancel={clickCancel}
              clickDelAndSubmt={() =>
                cmntDelfromMypg(selectedCmntId.postId, selectedCmntId.cmntId)
              }
            />
          )}
          <Pagination />
        </>
      )}
    </main>
  );
}

export default CommuCollCmnt;
