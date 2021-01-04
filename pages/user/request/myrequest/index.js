import React from 'react';

import styles from './MyRequest.scss';
import { REQUEST_DETAIL_TITLE } from '../../../../constants/RequestDetailTitle';
import { DetailTab } from '../../../../constants/DetailTab';
import { useObserver } from 'mobx-react';
import useStore from '../../../../stores';
import { useRouter } from 'next/router';
import * as RequestLabel from '../../../../constants/RequestLabel';
import {
  REQUEST_CANCEL,
  REQUEST_EDIT,
} from '../../../../constants/CompleteMessageButton';
const { SelectedRequestTabId } = useStore();
const MyRequest = () => {
  const router = useRouter();
  const tabs = DetailTab.map((tab) => {
    return (
      <li
        className={
          tab.id == SelectedRequestTabId.selectedTabId
            ? styles.active
            : styles.tab_list
        }
        onClick={() => {
          router.push(`/user/request/${tab.url}`);
          SelectedRequestTabId.setSelectedTabId(tab.id);
        }}>
        <a>{tab.name}</a>
      </li>
    );
  });

  return (
    <div className={styles.container}>
      <div className={styles.header_wrap}>
        <div className={styles.image_wrap}>
          <img
            src='/nav-ico-back.png'
            srcSet='/nav-ico-back@2x.png 2x, /nav-ico-back@3x.png 3x'
            className={styles.arrow}
          />
        </div>
        <div className={styles.header}>{REQUEST_DETAIL_TITLE}</div>
        <div className={styles.cancel}></div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.list_wrap}>
        <ul className={styles.list}>{tabs}</ul>
      </div>
      <div className={styles.my_request}>
        <div className={styles.my_request_form}>
          <div className={styles.request_row}>
            <div className={styles.title}>{RequestLabel.CLIENT_CONTACT}</div>
            <div className={styles.info}>12313</div>
          </div>
          <div className={styles.request_row}>
            <div className={styles.title}>{RequestLabel.REGION}</div>
            <div className={styles.info}>서울특별시 강남구</div>
          </div>
          <div className={styles.request_row}>
            <div className={styles.title}>{RequestLabel.CAR_NUMBER}</div>
            <div className={styles.info}>123가1233</div>
          </div>
          <div className={styles.request_row}>
            <div className={styles.title}>{RequestLabel.CAR_NAME}</div>
            <div className={styles.info}>벤츠C클래스</div>
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
            dddddddddddddddddddddddddddddddddddddddddddddddd
          </div>
        </div>
      </div>
      <div className={styles.button_wrap}>
        <input
          type='button'
          value={REQUEST_CANCEL}
          className={styles.cancel}
          onClick={() => {
            SelectedRequestTabId.setSelectedTabId(1);
            router.push('/user');
          }}
        />
        <input type='button' value={REQUEST_EDIT} className={styles.edit} />
      </div>
    </div>
  );
};

export default MyRequest;
