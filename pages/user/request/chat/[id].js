import React, { useState } from 'react';
import ChatContainer from './ChatContainer';
import { RequestHeader } from '../../../../compnents/Header';
import { useRouter } from 'next/router';
import { DetailTab } from '../../../../constants/DetailTab';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import cookieCutter from 'cookie-cutter';
import styles from './Chatting.scss';
import classNames from 'classnames/bind';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  const { request } = await res.data;

  return {
    props: { request },
  };
}

const Chatting = ({ request }) => {
  const [pageId, setPageId] = useState('0');
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
        onClick={() => {
          if (reservation_id == request.id) {
            tab.url === ''
              ? router.push(`/user/request/reservation/${request.id}`)
              : router.push(`/user/request/${tab.url}/${request.id}`);
          } else {
            tab.url === ''
              ? router.push(`/user/request/${request.id}`)
              : router.push(`/user/request/${tab.url}/${request.id}`);
          }
        }}>
        <a>{tab.name}</a>
      </li>
    );
  });
  return (
    <div className={styles.container}>
      <RequestHeader
        id={request.id}
        car={request?.car.brand}
        model={request?.car.model}
      />
      <div className={styles.request_detail_wrap}>
        <div className={styles.request_detail_header}>
          <div className={styles.header}>
            <ul className={styles.list}>{tabs}</ul>
          </div>
        </div>

        <div className={styles.chatting_room}>
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default Chatting;
