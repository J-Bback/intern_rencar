import React, { useState, useEffect } from 'react';
import styles from './History.scss';
import { DetailTab } from '../../../../constants/Request/DetailTab';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import cookieCutter from 'cookie-cutter';
import classNames from 'classnames/bind';
import { RequestHeader } from '../../../../compnents/Header';
import { useRouter } from 'next/router';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  const { request } = await res.data;

  return {
    props: { request },
  };
}

const History = ({ request }) => {
  const [pageId, setPageId] = useState('3');
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

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

  return (
    <div className={styles.container}>
      <RequestHeader
        id={request.id}
        car={request?.car.brand}
        model={request?.car.model}
        status={request?.status}
      />
      <div
        className={cn('request_detail_wrap', {
          show: clicked,
          hide: !clicked,
        })}>
        <div className={styles.list_wrap}>
          <ul className={styles.list}>{tabs}</ul>
        </div>
        <div className={styles.content}>
          <div className={styles.history_wrap}></div>
        </div>
      </div>
    </div>
  );
};

export default History;
