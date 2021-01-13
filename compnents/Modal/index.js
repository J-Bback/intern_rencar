import React from 'react';
import { useRouter } from 'next/router';
import styles from './modal.scss';

const modal = ({ isModal, onModalHandler, status }) => {
  const router = useRouter();

  const messages = {
    0: '제안이 취소되었습니다.',
    3: '반납이 완료되었습니다. ',
  };

  return (
    <div className={isModal ? styles.modalWrap_active : styles.modalWrap_hide}>
      <div className={styles.modalMain}>
        <div className={styles.modalContent}>
          <div className={styles.modalTitle}>{messages[status]}</div>
          <input
            type='button'
            className={styles.modalButton}
            onClick={() => {
              onModalHandler();
            }}
            value='확인'
          />
        </div>
      </div>
    </div>
  );
};

export default modal;
