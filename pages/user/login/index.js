import React from 'react';
import { UserInput } from '../../../compnents/Input';
import { useRouter } from 'next/router';
import styles from './LoginPage.scss';
import { useObserver } from 'mobx-react';
import useStore from '../../../stores';
import { USER_ID, USER_PASSWORD } from '../../../constants/Login/LoginLabel';
import { SERVER_URL } from '../../../config';
import cookie from 'js-cookie';
import axios from 'axios';

const LoginPage = () => {
  const { LoginStore } = useStore();
  const router = useRouter();
  const checkValidation = (e) => {
    const { idValue, passwordValue } = LoginStore;
    if (idValue === null || passwordValue === null) {
      return;
    }

    axios
      .post(`${SERVER_URL}/user/login`, {
        login_id: idValue,
        password: passwordValue,
      })
      .then((result) => {
        if (result.data.token) {
          cookie.set('clientToken', result.data.token);
          cookie.set('client', JSON.stringify(result.data.user));
          alert('로그인에 성공하셨습니다.');
          router.push('/requestList');
        }
        if (result.error === 403) {
          alert(result.message);
          alert(result.message);
        } else if (result.error === 405) {
          alert(result.message);
        } else if (result.error === 406) {
          alert(result.message);
        }
      });
  };

  return useObserver(() => (
    <div className={styles.login_container}>
      <div className={styles.logo}>
        <img src='/logo.png' srcSet='/logo@2x.png, /logo@3x.png' alt='' />
      </div>
      <div className={styles.text_wrap}>
        <div className={styles.title}>로그인</div>
        <div className={styles.greeting}>안녕하세요, 회원님!</div>
      </div>
      <div className={styles.login_input}>
        <div className={styles.id_input}>
          <UserInput
            name={'idValue'}
            onChange={(e) => {
              LoginStore.setValue(e);
            }}
            placeholder={USER_ID}
            value={LoginStore.idValue}
          />
          <img
            src='/1641.png'
            srcSet='/1641@2x.png,
            /1641@3x.png'
            className={styles.input_bottom_line}
          />
        </div>

        <div className={styles.password_input}>
          <UserInput
            name={'passwordValue'}
            type='password'
            onChange={(e) => {
              LoginStore.setValue(e);
            }}
            placeholder={USER_PASSWORD}
            value={LoginStore.passwordValue}
          />
          <img
            src='/1641.png'
            srcSet='/1641@2x.png,
             /1641@3x.png'
            className={styles.input_bottom_line}
          />
        </div>
      </div>

      <div className={styles.login_bottom_wrap}>
        <div
          className={styles.login_button_wrap}
          onClick={() => {
            checkValidation();
          }}>
          <img
            src='/rectangle.png'
            srcSet='/rectangle@2x.png,
            /rectangle@3x.png'
            className={styles.login_Button}
          />
          <img
            src='/log-in.png'
            srcSet='/log-in@2x.png,
            /log-in@3x.png'
            className={styles.login_Button_text}
          />
        </div>
      </div>
    </div>
  ));
};

export default LoginPage;
