import style from '../css/DeleteEditBtn.module.css';

function DeleteEditBtn({ btnText, clickDelAndSubmt }) {
  const receiveBtnText = btnText || '삭제하기';

  const clickDeleteBtn = () => {
    clickDelAndSubmt();
  };

  return (
    <button
      className={`fontTitleM ${style.deleteEditBtn}`}
      onClick={clickDeleteBtn}
    >
      {receiveBtnText}
    </button>
  );
}

export default DeleteEditBtn;
