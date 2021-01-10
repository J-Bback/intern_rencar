import React from 'react';
import styles from './Process.scss';

const Process = () => {
  return (
    <>
      <div className={styles.group}>
        <div className={styles.dotNow}></div>
        <div className={styles.dotFinish}></div>
        <div className={styles.dotWaiting}></div>
        <div className={styles.title}>요청중</div>
        <div className={styles.lineWaiting}></div>
        <div className={styles.lineFinish}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dotNow}></div>
        <div className={styles.dotFinish}></div>
        <div className={styles.dotWaiting}></div>
        <div className={styles.title}>예약확정</div>
        <div className={styles.lineWaiting}></div>
        <div className={styles.lineFinish}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dotNow}></div>
        <div className={styles.dotFinish}></div>
        <div className={styles.dotWaiting}></div>
        <div className={styles.title}>배차중</div>
        <div className={styles.lineWaiting}></div>
        <div className={styles.lineFinish}></div>
      </div>

      <div className={styles.group}>
        <div className={styles.dotNow}></div>
        <div className={styles.dotFinish}></div>
        <div className={styles.dotWaiting}></div>
        <div className={styles.last_title}>반납완료</div>
      </div>
    </>
  );
};

export default Process;
