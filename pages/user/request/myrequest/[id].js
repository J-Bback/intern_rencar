import React, { useState, useEffect } from 'react';
import styles from './MyRequest.scss';
import { DetailTab } from '../../../../constants/DetailTab';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import cookieCutter from 'cookie-cutter';
import useStore from '../../../../stores';
import { RequestHeader } from '../../../../compnents/Header';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import * as RequestLabel from '../../../../constants/RequestLabel';
import {
  REQUEST_CANCEL,
  REQUEST_EDIT,
} from '../../../../constants/CompleteMessageButton';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  const { request } = await res.data;

  return {
    props: { request },
  };
}

const { SelectedRequestTabId, SelectedCarStore } = useStore();

const MyRequest = ({ request }) => {
  const [pageId, setPageId] = useState('2');
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  const cn = classNames.bind(styles);

  const tabs = DetailTab.map((tab) => {
    const reservation_id =
      typeof window !== 'undefined'
        ? localStorage.getItem('reservation')
        : null;

    return (
      <li
        className={tab.id == pageId ? styles.active : styles.tab_list}
        onClick={(e) => {
          if (reservation_id == request.id) {
            tab.url === ''
              ? router.push(`/user/request/reservation/${request.id}`)
              : router.push(`/user/request/${tab.url}/${request.id}`);
          } else {
            tab.url === ''
              ? router.push(`/user/request/${request.id}`)
              : router.push(`/user/request/${tab.url}/${request.id}`);
          }

          if (
            e.target.className.includes('active') ||
            e.target.className.includes('anchor')
          ) {
            setClicked(!clicked);
          } else {
            return;
          }
        }}>
        <a className={styles.anchor}>{tab.name}</a>
      </li>
    );
  });

  const goCancel = () => {
    SelectedRequestTabId.setSelectedTabId(1);
    router.push('/user');
  };

  const goEdit = () => {
    SelectedCarStore.setIsEdit(true);
    return;
    // router.push('/user/request');
  };

  return (
    <div className={styles.container}>
      <RequestHeader
        id={request.id}
        car={request?.car.brand}
        model={request?.car.model}
        status={request.status}
      />
      <div
        className={cn('request_detail_wrap', {
          show: clicked,
          hide: !clicked,
        })}>
        <div className={styles.list_wrap}>
          <ul className={styles.list}>{tabs}</ul>
        </div>
        <div className={styles.my_request}>
          <div className={styles.my_request_form}>
            <div className={styles.request_row}>
              <div className={styles.title}>{RequestLabel.CLIENT_CONTACT}</div>
              <div className={styles.info}>{request.phone_number}</div>
            </div>
            <div className={styles.request_row}>
              <div className={styles.title}>{RequestLabel.REGION}</div>
              <div className={styles.info}>
                {request.state} {request.city}
              </div>
            </div>
            <div className={styles.request_row}>
              <div className={styles.title}>{RequestLabel.CAR_NUMBER}</div>
              <div className={styles.info}>{request.car_number}</div>
            </div>
            <div className={styles.request_row}>
              <div className={styles.title}>{RequestLabel.CAR_NAME}</div>
              <div className={styles.info}>{request?.car.brand}</div>
            </div>
          </div>
        </div>
        <div className={styles.divider_bold}></div>
        <div className={styles.additional_request_container}>
          <div className={styles.additional_request_wrap}>
            <div className={styles.additional_request_title}>
              {RequestLabel.ADDITIONAL_REQUEST}
            </div>
            <div className={styles.additional_request}>
              {request.additional_info}
            </div>
          </div>
        </div>
        <div className={styles.button_wrap}>
          <input
            type='button'
            value={REQUEST_CANCEL}
            className={styles.cancel}
            onClick={() => {
              goCancel();
            }}
          />
          <input
            type='button'
            value={REQUEST_EDIT}
            className={styles.edit}
            onClick={() => {
              goEdit();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyRequest;
