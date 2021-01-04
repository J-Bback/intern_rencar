import React from 'react';
import { REQUEST_DETAIL_TITLE } from '../../constants/RequestDetailTitle';
import Process from '../../compnents/ProcessBar';
import styles from './RequestHeader.scss';

function RequestHeader() {
  return (
    <>
      <div className={styles.headerWrap}>
        <div className={styles.header}>
          <div className={styles.imageWrap}>
            <img
              src='/nav-ico-back.png'
              srcSet='/nav-ico-back@2x.png 2x, /nav-ico-back@3x.png 3x'
              className={styles.arrow}
            />
          </div>
          <div className={styles.title}>{REQUEST_DETAIL_TITLE}</div>
          <div className={styles.empty}></div>
        </div>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.content}>
        <div className={styles.requestId}>요청번호 1231</div>
        <div className={styles.processWrap}>
          <div className={styles.wrap}>
            <Process />
          </div>
        </div>
      </div>
      <div className={styles.displayWrap}>
        <div className={styles.displayGroup}>
          <div className={styles.carTitle}>사고차량</div>
          <div className={styles.car}>벤츠 C클래스</div>
        </div>
        <div className={styles.imageWrap}>
          <img
            src='/ic-exchange.png'
            srcSet='/ic-exchange@2x.png 2x,
                  , /ic-exchange@3x.png 3x'
            className={styles.exchange}
          />
        </div>
        <div className={styles.displayGroup}>
          <div className={styles.carTitle}>희망차량</div>
          <div className={styles.car}>벤츠</div>
        </div>
      </div>
    </>
  );
}

export default RequestHeader;
