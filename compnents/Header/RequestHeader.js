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

function RequestHeader({
  id,
  model,
  status,
  dispatch_date,
  return_date,
  dispatch_car,
}) {
  const router = useRouter();
  const showProcess = {
    0: <RequestProcessBar />,
    1: <ReservationProcessBar />,
    2: <DispatchProcessBar />,
    3: <ReturnProcessBar />,
  };

  const message = {
    0: {
      title: '사고차량',
      date: '희망차량',
      accident_car: model,
      wish_car: '벤츠',
    },
    1: {
      title: '사고차량',
      date: '희망챠랑',
      accident_car: model,
      wish_car: '벤츠',
    },
    2: {
      title: '배차차량',
      date: '배차일시',
      accident_car: dispatch_car ? dispatch_car : '',
      wish_car: dispatch_date ? dispatch_date : '',
    },
    3: {
      title: '배차차량',
      date: '반납일시',
      accident_car: dispatch_car ? dispatch_car : '',
      wish_car: return_date ? return_date : '',
    },
  };

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
          <div className={styles.wrap}>{showProcess[status]}</div>
        </div>
      </div>
      <div className={styles.display_wrap}>
        <div className={styles.display_group_left}>
          <div className={styles.car_title}>{message[status].title}</div>
          <div className={styles.car}>{message[status].accident_car}</div>
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
          <div className={styles.car_title}>{message[status].date}</div>
          <div className={styles.car}>{message[status].wish_car}</div>
        </div>
      </div>
    </>
  ));
}

export default RequestHeader;
