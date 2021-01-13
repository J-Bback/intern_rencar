import { observable, action } from 'mobx';

class RequestInputStore {
  @observable clientContact = null;
  @observable carNumber = null;
  @observable region = null;
  @observable carBrand = null;
  @observable carModel = null;
  @observable additionalRequest = null;
  @observable requestId = null;

  constructor() {}

  @action setValue = (e) => {
    this[e.target.name] = e.target.value;
  };

  @action setRequestId = (id) => {
    this.requestId = id;
  };
}

export default RequestInputStore;
