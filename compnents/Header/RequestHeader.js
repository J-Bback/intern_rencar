import React from 'react';
import { REQUEST_DETAIL_TITLE } from '../../constants/RequestDetailTitle';
import {
  RequestProcessBar,
  ReservationProcessBar,
  DispatchProcessBar,
  ReturnProcessBar,
} from '../../compnents/ProcessBar';
import styles from './RequestHeader.scss';
import { useRouter } from 'next/router';
import { useObserver } from 'mobx-react';
import useStore from '../../stores';

function RequestHeader({ id, status, car, model }) {
  const router = useRouter();
  const { SelectedRequestTabId } = useStore();
  const showProcess = {};
  return useObserver(() => (
    <>
      <div className={styles.header_wrap}>
        <div className={styles.header}>
          <div
            className={styles.image_wrap}
            onClick={() => {
              router.back();
            }}>
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
        <div className={styles.request_id}>요청번호 {id}</div>
        <div className={styles.process_wrap}>
          <div className={styles.wrap}>
            <RequestProcessBar />
          </div>
        </div>
      </div>
      <div className={styles.display_wrap}>
        <div className={styles.display_group_left}>
          <div className={styles.car_title}>사고차량</div>
          <div className={styles.car}>{model}</div>
        </div>
        <div className={styles.image_wrap}>
          <img
            src='/ic-exchange.png'
            srcSet='/ic-exchange@2x.png 2x,
                  , /ic-exchange@3x.png 3x'
            className={styles.exchange}
          />
        </div>
        <div className={styles.display_group_right}>
          <div className={styles.car_title}>희망차량</div>
          <div className={styles.car}>벤츠</div>
        </div>
      </div>
    </>
  ));
}

export default RequestHeader;
