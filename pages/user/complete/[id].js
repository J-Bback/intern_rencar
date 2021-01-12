import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { RequestButton } from '../../../compnents/Button';
import { GO_TO_DETAIL } from '../../../constants/CompleteMessageButton';
import {
  CAR_NAME,
  CAR_NUMBER,
  REQUEST_NUMBER,
} from '../../../constants/CompleteMessageLabel';
import { useObserver } from 'mobx-react';
import useStore from '../../../stores';
import styles from './Complete.scss';
import { SERVER_URL } from '../../../config';

import axios from 'axios';

const isComplete = true;

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  const { request } = await res.data;

  return {
    props: { request },
  };
}

const Complete = ({ request }) => {
  const rotuer = useRouter();

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.header_wrap}>
        <div></div>
        <div className={styles.header}></div>
        <div className={styles.cancel}>X</div>
      </div>
      <div className={styles.content}>
        <div className={styles.success}>
          <div>요청이</div>
          <div>완료되었습니다.</div>
        </div>
        <div className={styles.success_message}>
          <div>
            해당 지역 내 <span>00</span> 개의 업체에
          </div>
          <div>성공적으로 렌트 요청이 접수되었습니다.</div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.desc_wrap}>
          <div className={styles.group}>
            <div>{CAR_NAME}</div>
            <div>{request?.car.model}</div>
          </div>
          <div className={styles.group}>
            <div>{CAR_NUMBER}</div>
            <div>{request.car_number}</div>
          </div>
          <div className={styles.group}>
            <div>{REQUEST_NUMBER}</div>
            <div>{request.id}</div>
          </div>
        </div>
        <RequestButton
          value={GO_TO_DETAIL}
          isComplete={isComplete}
          onClick={() => {
            rotuer.push(`/user/request/${request.id}`);
          }}
        />
      </div>
    </div>
  ));
};

export default Complete;
