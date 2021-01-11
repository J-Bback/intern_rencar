import React, { useState, useEffect } from 'react';
import styles from './History.scss';
import { REQUEST_DETAIL_TITLE } from '../../../../constants/RequestDetailTitle';
import { DetailTab } from '../../../../constants/DetailTab';
import { useObserver } from 'mobx-react';
import useStore from '../../../../stores';
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

const { SelectedRequestTabId } = useStore();

const History = ({ request }) => {
  const [pageId, setPageId] = useState('3');
  const [clicked, setClicked] = useState(false);
  const router = useRouter();
  const cn = classNames.bind(styles);

  const tabs = DetailTab.map((tab) => {
    return (
      <li
        className={tab.id == pageId ? styles.active : styles.tab_list}
        onClick={(e) => {
          {
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
      />
      <div
        className={cn('request_detail_wrap', {
          show: clicked,
          hide: !clicked,
        })}>
        <div className={styles.list_wrap}>
          <ul className={styles.list}>{tabs}</ul>
        </div>
        <div className={styles.content}></div>
      </div>
    </div>
  );
};

export default History;
