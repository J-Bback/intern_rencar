import React from 'react';
import styles from './History.scss';
import { REQUEST_DETAIL_TITLE } from '../../../../constants/RequestDetailTitle';
import { DetailTab } from '../../../../constants/DetailTab';
import { useObserver } from 'mobx-react';
import useStore from '../../../../stores';
import { useRouter } from 'next/router';

const { SelectedRequestTabId } = useStore();

const History = () => {
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
      <div></div>
    </div>
  );
};

export default History;
