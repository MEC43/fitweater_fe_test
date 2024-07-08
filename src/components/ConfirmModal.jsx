import style from '../css/ConfirmModal.module.css';

import { useEffect, useRef } from 'react';

import CancelBtn from './CancelBtn';
import DeleteEditBtn from './DeleteEditBtn';
import { useOpenMenuModal } from '../store/detailOpMenuModalStore';

function ConfirmModal({ message, btnText, clickDelAndSubmt, clickCancel }) {
  const { isModalOpen, modalClose, opMenuClose } = useOpenMenuModal();

  const receiveMessage = message || '삭제하시겠습니까?';

  const confirmModalRef = useRef();
  const clickBg = (e) => {
    if (
      confirmModalRef.current &&
      !confirmModalRef.current.contains(e.target) &&
      isModalOpen
    ) {
      modalClose();
      opMenuClose();
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', clickBg);
    return () => {
      document.removeEventListener('mousedown', clickBg);
    };
  }, []);

  return (
    <div className={`${style.confirmModal} ${style.on} `}>
      <div className={style.confirmMsg} ref={confirmModalRef}>
        <p className="fontHead3">{receiveMessage}</p>
        <CancelBtn clickCancel={clickCancel} />
        <DeleteEditBtn btnText={btnText} clickDelAndSubmt={clickDelAndSubmt} />
      </div>
    </div>
  );
}

export default ConfirmModal;
