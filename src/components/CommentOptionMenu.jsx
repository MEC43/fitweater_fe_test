import style from '../css/CommentOptionMenu.module.css';

import ConfirmModal from './ConfirmModal';

function CommentOptionMenu({
  toggleCmntOptMenu,
  isModalToggle,
  setIsModalToggle,
  cmntEditBtnClick,
  handleCmntDelete,
  deleteComment,
}) {
  const handleCancel = () => {
    setIsModalToggle(false);
  };

  return (
    <>
      <div
        className={`fontBodyS ${style.cmntOptionMenu} ${
          toggleCmntOptMenu ? style.on : ''
        }`}
      >
        <button
          className={`fontBodyS ${style.cmntEditBtn}`}
          onClick={cmntEditBtnClick}
        >
          수정하기
        </button>
        <button
          className={`fontBodyS ${style.cmntDelBtn}`}
          onClick={deleteComment}
        >
          삭제하기
        </button>
      </div>
      {isModalToggle && (
        <ConfirmModal
          clickCancel={handleCancel}
          clickDelAndSubmt={handleCmntDelete}
        />
      )}
    </>
  );
}

export default CommentOptionMenu;
