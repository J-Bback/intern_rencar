import React from 'react';
import { RequestHeader } from '../../../compnents/Header';
import { DetailTab } from '../../../constants/DetailTab';
import { useObserver } from 'mobx-react';
import useStore from '../../../stores';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from './requestDetail.scss';

const requestDetail = ({ list }) => {
  const { SelectedRequestTabId } = useStore();
  const router = useRouter();

  const tabs = DetailTab.map((tab) => {
    return (
      <li
        className={
          tab.id == SelectedRequestTabId.selectedTabId
            ? styles.active
            : styles.tabList
        }
        onClick={() => {
          router.push(`/user/request/${tab.url}`);
          SelectedRequestTabId.setSelectedTabId(tab.id);
        }}>
        <a>{tab.name}</a>
      </li>
    );
  });

  const requestLists = list.map((el) => {
    return (
      <li>
        <div className={styles.header}>
          <div className={styles.title}>[ {el.name} ]</div>
          <input type='button' value='선택하기' className={styles.input} />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.car}>제안 차량 1</div>
            <div className={styles.name}>{el.first_car}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.car}>제안 차량 2</div>
            <div className={styles.name}>{el.second_car}</div>
          </div>
          <div className={styles.row}>
            <div className={styles.car}>추가제안사항</div>
            <div className={styles.info}>{el.additional_information}</div>
          </div>
        </div>
      </li>
    );
  });

  return useObserver(() => (
    <div className={styles.container}>
      <RequestHeader />
      <div className={styles.request_detail_wrap}>
        <div className={styles.request_detail_header}>
          <div className={styles.header}>
            <ul className={styles.list}>{tabs}</ul>
          </div>
        </div>
        <div className={styles.request_list_wrap}>
          <div className={styles.request_background}>
            {requestLists.length === 0 ? (
              <div className={styles.wrap}>
                <div>
                  <img
                    src='/ic-exclamation-none.png'
                    srcSet='/ic-exclamation-none@2x.png 2x,
             /ic-exclamation-none@3x.png 3x'
                    alt='img'
                  />
                </div>
                <div className={styles.empty}>
                  업체 제안을 기다리는 중입니다.
                </div>
              </div>
            ) : (
              <>
                <div className={styles.information}>
                  업체 제안은 최대 10개 생성될 수 있습니다.
                </div>
                <div className={styles.request_list}>
                  <ul className={styles.lists}>{requestLists}</ul>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  ));
};

export default requestDetail;

export async function getServerSideProps() {
  const res = await axios.get('http://localhost:5800/api/getRequestList');
  const list = await res.data.requestList;
  console.log(list, 'list');
  return {
    props: { list },
  };
}
