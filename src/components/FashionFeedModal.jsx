import style from '../css/FashionFeedModal.module.css';
function FashionFeedModal({ onFshModal, setOnFshModal }) {
  return (
    <div className={`${style.fshfeedModal} ${onFshModal ? style.on : ''}`}>
      <div className={style.fshModalContent}>
        <a href="#">
          <span className="fontHead3">@계정</span>
        </a>
        <div className={style.feedLarge}>피드</div>
        <i
          className="fa-solid fa-xmark"
          onClick={() => {
            setOnFshModal(false);
          }}
        ></i>
      </div>
    </div>
  );
}

export default FashionFeedModal;
