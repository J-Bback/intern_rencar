import React, { Component, Fragment } from 'react';
import Input from '../../../compnents/Input';
import { NAME, TEL } from '../../../constants/Label';
import Head from 'next/head';
import { APP_NAME } from '../../../constants/App';
import { REGISTER_USER } from '../../../constants/PageTitle';
import styles from './RegisterUser.scss';

class RegisterUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      tel: null,
    }
  }

  submit = () => {
    const { name, tel } = this.state;
    const result = { name, tel };

    console.log(result);
  }

  render() {
    return (
      <Fragment>
        <Head>
          <title>{ APP_NAME } - {REGISTER_USER} </title>
        </Head>
        <div className={styles.register_user_container}>
          <div className={styles.title_area}>
            <h1>{REGISTER_USER}</h1>
          </div>
          <div className={styles.input_wrap}>
            <Input
              id="name"
              label={NAME}
              onChange={value => this.setState({ name: value ? value : null })}
              value={this.state.name}
            />
            <Input
              id="tel"
              label={TEL}
              type="tel"
              onChange={value => this.setState({ tel: value ? value : null })}
              value={this.state.tel}
            />
          </div>
          <button onClick={this.submit}>
            저장
          </button>
        </div>
      </Fragment>
    )
  }
}

export default RegisterUser