import React from 'react';
import { UserInput, SelectInput } from '../../compnents/Input';
import { RequestButton } from '../../compnents/Button';
import {
  CLIENT_CONTACT,
  CAR_NUMBER,
  REGION,
  CAR_BRAND,
  ADDITIONAL_REQUEST,
} from '../../constants/Request/RequestLabel';
import { REQUEST } from '../../constants/Request/PageTitle';
import { DESCRIPTION } from '../../constants/Request/Description';
import {
  CLIENT_CONTACT_PLACEHOLDER,
  CAR_NUMBER_PLACEHOLDER,
  REGION_PLACEHOLDER,
  CAR_BRAND_PLACEHOLDER,
  CAR_MODEL_PLACEHOLDER,
  ADDITIONAL_REQUEST_PLACEHOLDER,
} from '../../constants/Request/RequestPlaceHolder';
import {
  CLIENT_CONTACT_NAME,
  CAR_NUMBER_NAME,
  CAR_MODEL_NAME,
  CAR_BRAND_NAME,
  REGION_NAME,
  ADDITIONAL_REQUEST_NAME,
} from '../../constants/Request/FormNameForInput';
import { REQUEST_BUTTON } from '../../constants/Request/RequestButton';
import { useRouter } from 'next/router';
import styles from './Request.scss';
import { useObserver } from 'mobx-react';
import useStore from '../../stores';
import axios from 'axios';
import { SERVER_URL } from '../../config';
const image = true;

const Request = () => {
  const { RequestInputStore, SelectedCarStore } = useStore();
  const router = useRouter();

  const onChangeHandler = (e) => {
    RequestInputStore.setValue(e);
  };

  const goToServer = () => {
    if (
      RequestInputStore.carNumber === null ||
      RequestInputStore.clientContact === null ||
      RequestInputStore.region === null
    ) {
      alert('요청서를 다시 확인해주세요.');
      return;
    }
    axios
      .post(`${SERVER_URL}/request`, {
        additional_info: RequestInputStore.additionalRequest,
        car_id: SelectedCarStore.selectedCarId,
        car_number: RequestInputStore.carNumber,
        phone_number: RequestInputStore.clientContact,
        state: RequestInputStore.region.split(' ')[0],
        city: RequestInputStore.region.split(' ')[1],
      })
      .then((res) => {
        if (res.status === 200) {
          const { id } = res.data.request;
          RequestInputStore.setRequestId(id);
          router.push(`/user/complete/${id}`);
          RequestInputStore.additionalRequest = '';
          RequestInputStore.carNumber = '';
          SelectedCarStore.selectedCarId = '';
          RequestInputStore.clientContact = '';
          RequestInputStore.region = '';
        }
      })
      .catch((error) => {
        alert('요청서를 다시 확인해주세요.');
        console.log(error);
      });
  };

  return useObserver(() => (
    <div className={styles.container}>
      <div className={styles.header_wrap}>
        <div></div>
        <div className={styles.header}>{REQUEST}</div>
        <div
          className={styles.cancel}
          onClick={() => router.push('/requestList')}>
          X
        </div>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.request_wrap}>
        <div className={styles.group}>
          <div className={styles.title_wrap}>
            <div className={styles.group_title}>{CLIENT_CONTACT}</div>
            <div className={styles.image_wrap}>
              <img
                src='/ic-essential.png'
                srcSet='/ic-essential@2x.png, /ic-essential@3x.png'
                className={styles.essential}
              />
            </div>
          </div>
          <UserInput
            name={CLIENT_CONTACT_NAME}
            placeholder={CLIENT_CONTACT_PLACEHOLDER}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            value={RequestInputStore.clientContact}
          />
          <div className={styles.input_des}>{DESCRIPTION}</div>
        </div>
        <div className={styles.group}>
          <div className={styles.title_wrap}>
            <div className={styles.group_title}>{REGION}</div>
            <div className={styles.image_wrap}>
              <img
                src='/ic-essential.png'
                srcSet='/ic-essential@2x.png, /ic-essential@3x.png'
                className={styles.essential}
              />
            </div>
          </div>
          <UserInput
            name={REGION_NAME}
            placeholder={REGION_PLACEHOLDER}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            value={RequestInputStore.region}
          />
        </div>
        <div className={styles.group}>
          <div className={styles.title_wrap}>
            <div className={styles.group_title}>{CAR_NUMBER}</div>
            <div className={styles.image_wrap}>
              <img
                src='/ic-essential.png'
                srcSet='/ic-essential@2x.png, /ic-essential@3x.png'
                className={styles.essential}
              />
            </div>
          </div>
          <UserInput
            name={CAR_NUMBER_NAME}
            placeholder={CAR_NUMBER_PLACEHOLDER}
            onChange={(e) => {
              onChangeHandler(e);
            }}
            value={RequestInputStore.car_number}
          />
        </div>
        <div className={styles.group}>
          <div className={styles.title_wrap}>
            <div className={styles.group_title}>{CAR_BRAND}</div>
            <div className={styles.image_wrap}>
              <img
                src='/ic-essential.png'
                srcSet='/ic-essential@2x.png, /ic-essential@3x.png'
                className={styles.essential}
              />
            </div>
          </div>
          <div className={styles.select_wrap}>
            <SelectInput
              image={image}
              placeholder={CAR_BRAND_PLACEHOLDER}
              name={CAR_BRAND_NAME}
              onClick={() => {
                router.push('/user/select');
              }}
              value={SelectedCarStore.selectedCarBrand}
            />
            <SelectInput
              placeholder={CAR_MODEL_PLACEHOLDER}
              name={CAR_MODEL_NAME}
              value={SelectedCarStore.selectedCarName}
            />
          </div>
        </div>
        <div className={styles.group}>
          <div className={styles.additional_request_wrap}>
            <div className={styles.group_title}>{ADDITIONAL_REQUEST}</div>
            <form action='post' className={styles.textarea_wrap}>
              <textarea
                name={ADDITIONAL_REQUEST_NAME}
                value={RequestInputStore.additional_request}
                className={styles.textarea}
                onChange={(e) => {
                  onChangeHandler(e);
                }}
                placeholder={ADDITIONAL_REQUEST_PLACEHOLDER}></textarea>
            </form>
          </div>
        </div>
        <RequestButton
          onClick={() => goToServer()}
          value={REQUEST_BUTTON}
          clientContact={RequestInputStore.clientContact}
          carNumber={RequestInputStore.carNumber}
          region={RequestInputStore.region}
          carBrand={RequestInputStore.carBrand}
          carModel={RequestInputStore.carModel}
        />
      </div>
    </div>
  ));
};
export default Request;
