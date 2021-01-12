import React, { useState, useRef } from 'react';
import { RequestHeader } from '../../../compnents/Header';
import { DetailTab } from '../../../constants/DetailTab';
import { useObserver } from 'mobx-react';
import useStore from '../../../stores';
import { useRouter } from 'next/router';
import classNames from 'classnames/bind';
import axios from 'axios';
import { SERVER_URL } from '../../../config';
import cookieCutter from 'cookie-cutter';
import styles from './requestDetail.scss';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  console.log(res);
  const { request, suggestions } = await res.data;

  return {
    props: { request, suggestions },
  };
}

const requestDetail = ({ suggestions, request }) => {
  const [pageId, setPageId] = useState('1');
  const [clicked, setClicked] = useState(false);
  const { SelectedRequestTabId } = useStore();
  const router = useRouter();
  const animated = useRef();
  const cn = classNames.bind(styles);
  console.log(request);

  const onSelectProposal = (id) => {
    const token = cookieCutter.get('token');
    axios
      .post(`${SERVER_URI}/suggestion/${id}`, {
        headers: { Authorization: token },
      })
      .then((res) => {
        console.log(res, 'res');
        if (res.status === 200) {
          router.push(`/user/main`);
        }
      })
      .catch((err) => console.log(err));
  };

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
        }}
        key={tab.id}>
        <a>{tab.name}</a>
      </li>
    );
  });

  const suggestionLists = suggestions.map((el) => {
    return (
      <li key={el.id}>
        <div className={styles.header}>
          <div className={styles.title}>[ {el.company_name} ]</div>
          <input
            type='button'
            value='선택하기'
            className={styles.input}
            onClick={() => onSelectProposal(el.id)}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.row}>
            <div className={styles.car}>제안 차량 1</div>
            <div className={styles.name}>
              {el.first_car_model} {el.first_car_brand}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.car}>제안 차량 2</div>
            <div className={styles.name}>
              {el.second_car_model !== el.first_car_model
                ? el.second_car_model
                : ''}
              {el.second_car_brand !== el.first_car_brand
                ? el.second_car_brand
                : ''}
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.car}>추가제안사항</div>
            <div className={styles.info}>{el.additional_info}</div>
          </div>
        </div>
      </li>
    );
  });

  return useObserver(() => (
    <div className={styles.container}>
      <RequestHeader id={request.id} model={request?.car.model} />
      <div
        className={cn('request_detail_wrap', { show: clicked, hide: !clicked })}
        ref={animated}>
        <div
          className={styles.request_detail_header}
          onClick={() => setClicked(!clicked)}>
          <div className={styles.header}>
            <ul className={styles.list}>{tabs}</ul>
          </div>
        </div>
        <div className={styles.request_list_wrap}>
          <div className={styles.request_background}>
            {suggestionLists.length === 0 ? (
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
                  <ul className={styles.lists}>{suggestionLists}</ul>
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