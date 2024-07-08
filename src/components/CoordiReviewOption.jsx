import style from '../css/CoordiReviewOption.module.css';
import { useVerifyPost } from '../store/verifyPostContentStore';

function CoordiReviewOption() {
  const { onReview, setOnReview, setOffReview } = useVerifyPost();
  const selectYes = () => {
    setOnReview('yes');
  };
  const selectNo = () => {
    setOnReview('no');
  };
  return (
    <fieldset
      htmlFor="coordiReviewOption"
      className={`${style.coordiReviewOption} ${style.on}`}
    >
      <legend>코디평가 받으실래요?</legend>
      <p className="fontTitleM">코디평가 받으실래요?</p>
      <div className={style.onOffSelcet}>
        <label htmlFor="coordiOn" className={style.customRadio}>
          <input
            type="radio"
            id="coordiOn"
            name="coordiReview"
            checked={onReview === 'yes'}
            onChange={selectYes}
          />
          <span className={style.checkmark}></span>
          <span className="fontTitleM"> 예</span>
        </label>
        <label htmlFor="coordiOff" className={style.customRadio}>
          <input
            type="radio"
            id="coordiOff"
            name="coordiReview"
            checked={onReview === 'no'}
            onChange={selectNo}
          />
          <span className={style.checkmark}></span>
          <span className="fontTitleM"> 아니요</span>
        </label>
      </div>
    </fieldset>
  );
}

export default CoordiReviewOption;
