import React, { Component, Fragment } from 'react';
import apiUser from '../../../api/User';
import Input from '../../../compnents/Input';

class UserInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: null,
      info: null,
    }
  }

  submit = async () => {
    const data = { name: this.state.name };
    const response = await apiUser.getUserInfo(data);
    const responseData = response.data;
    
    this.setState({ info: responseData.userInfo })
  }

  render() {
    console.log(this.props)
    return (
      <Fragment>
        <Input
          id="name"
          label="이름"
          onChange={name => this.setState({ name: name ? name : null })}
          value={this.state.name}
        />
        <button onClick={this.submit}>
          검색
        </button>

        <div>
          <h2>결과</h2>
          {
            this.state.info && JSON.stringify(this.state.info)
          }
        </div>
      </Fragment>
    )
  }
}

export default UserInfo