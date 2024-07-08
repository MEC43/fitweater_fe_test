import style from '../css/OptionMenu.module.css';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmModal from './ConfirmModal';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';
import { usePostData } from '../store/postDataStore';
import { url } from '../store/ref';

function OptionMenu() {
  const { modalClose, opMenuClose, isModalOpen, modalOpen, isOpMenuOn } =
    useOpenMenuModal();
  const { setPostDetail } = usePostData();
  const { postId } = useParams();
  const navigate = useNavigate();

  // 글수정 페이지로 이동
  const goEditePage = async () => {
    opMenuClose();

    try {
      const response = await fetch(`${url}/posts/postEdit/${postId}`);
      const data = await response.json();
      console.log(data);
      setPostDetail(data);
      navigate(`/postEdit/${postId}`);
    } catch (error) {
      console.error('수정버튼 요청 에러');
    }
  };

  const handleCancel = async () => {
    modalClose();
    opMenuClose();
  };

  const handleDelete = async () => {
    modalClose();
    opMenuClose();
    try {
      const response = await fetch(`${url}/posts/delPost/${postId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.msg === 'ok') {
        // 변환된 데이터에서 msg 확인
        console.log(`포스트 삭제 성공`);
        navigate('/community');
      }
    } catch (error) {
      console.error('삭제 실패', error);
    }
  };

  return (
    <>
      <div
        id="optionMenu"
        className={`mw ${style.optionMenu} ${isOpMenuOn ? style.on : ''}`}
      >
        <button
          className={`fontTitleM ${style.postEditBtn}`}
          onClick={goEditePage}
        >
          수정하기
        </button>
        <button
          className={`fontTitleM ${style.postDelBtn}`}
          onClick={modalOpen}
        >
          삭제하기
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          clickCancel={handleCancel}
          clickDelAndSubmt={handleDelete}
        />
      )}
    </>
  );
}

export default OptionMenu;
