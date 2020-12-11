import callApi from '../utils/callApi';

export default {
  getUserInfo(data) {
    return callApi({
      method: 'get',
      url: '/api/getUserInfo',
      params: data
    })
  }
}