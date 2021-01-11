import React from 'react';
import styles from './Process.scss';

const DispatchProcessBar = () => {
  return (
    <>
      <div className={styles.group}>
        <div className={styles.dot_finish}></div>
        <div className={styles.title}>요청중</div>
        <div className={styles.line_finish}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dot_finish}></div>
        <div className={styles.title}>예약확정</div>
        <div className={styles.line_finish}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dot_now}></div>

        <div className={styles.title}>배차중</div>
        <div className={styles.line_waiting}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dot_waiting}></div>
        <div className={styles.last_title}>반납완료</div>
      </div>
    </>
  );
};

export default DispatchProcessBar;
