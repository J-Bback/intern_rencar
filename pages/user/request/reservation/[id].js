import React, { useState, useEffect } from 'react';
import styles from './Reservation.scss';
import {
  COMPANY_NAME,
  FIRST_CAR,
  SECONDE_CAR,
  ADDITIONAL_REQUEST,
} from '../../../../constants/Request/SuggestionLabel';
import { DetailTab } from '../../../../constants/Request/DetailTab';
import axios from 'axios';
import { SERVER_URL } from '../../../../config';
import cookieCutter from 'cookie-cutter';
import classNames from 'classnames/bind';
import { RequestHeader } from '../../../../compnents/Header';
import { useRouter } from 'next/router';
import Modal from '../../../../compnents/Modal';

export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await axios.get(`${SERVER_URL}/rencar/request/${id}`);
  const { request, suggestions } = await res.data;

  return {
    props: { request, suggestions },
  };
}

const Reservation = ({ request, suggestions }) => {
  const [pageId, setPageId] = useState('1');
  const [clicked, setClicked] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const router = useRouter();
  const cn = classNames.bind(styles);
  const [result] = suggestions && suggestions;

  console.log(request, 'cancel');

  useEffect(() => {
    if (request.status == 3 || request.status == 0) {
      setIsModal(true);
    }
  }, []);

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

  const onModalHandler = () => {
    if (request.status == 0) {
      localStorage.setItem('reservation', '');
      router.push(`/user/request/${request.id}`);
    }
    setIsModal(false);
  };

  return (
    <div className={styles.container}>
      <RequestHeader
        id={request?.id}
        car={request?.car.brand}
        model={request?.car.model}
        status={request?.status}
        dispatch_car={result?.first_car_model}
        return_date={request?.checkout_date}
        dispatch_date={request?.drive_date}
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
          <div className={styles.wrap}>
            <div className={styles.header}>
              <div className={styles.title}>{COMPANY_NAME}</div>
              <div className={styles.name}>
                {request.status != 0 && result.company_name
                  ? result.company_name
                  : null}
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.suggestion_cars}>
              <div className={styles.row}>
                <div className={styles.title}>{FIRST_CAR}</div>
                <div className={styles.name}>
                  {request.status != 0 && result.first_car_brand
                    ? result.first_car_brand
                    : null}
                </div>
              </div>
              <div className={styles.row}>
                <div className={styles.title}>{SECONDE_CAR}</div>
                <div className={styles.name}>
                  {request.status != 0 && result.second_car_brand
                    ? result.second_car_brand
                    : null}
                </div>
              </div>
            </div>
            <div className={styles.divider}></div>
            <div className={styles.additional_info}>
              <div className={styles.content}>
                <div className={styles.title}>{ADDITIONAL_REQUEST}</div>
                <div className={styles.name}>
                  {request.status != 0 && result.additional_info
                    ? result.additional_info
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isModal={isModal}
        onModalHandler={onModalHandler}
        status={request.status}
      />
    </div>
  );
};

export default Reservation;
