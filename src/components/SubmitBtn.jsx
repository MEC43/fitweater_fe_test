import style from '../css/SubmitBtn.module.css';
function SubmitBtn({ text, postSubmit }) {
  return (
    <button
      type="submit"
      id="submitBtn"
      onClick={postSubmit}
      className={`fontTitleM ${style.submitBtn}`}
    >
      {text}
    </button>
  );
}

export default SubmitBtn;
