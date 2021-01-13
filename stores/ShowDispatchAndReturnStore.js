import { observable, action } from 'mobx';

class ShowDispatchAndReturnStore {
  @observable dispatchAndReturnData = {};

  constructor() {}

  @action setValue = (dispatchAndReturnData) => {
    this.dispatchAndReturnData = dispatchAndReturnData;
  };
}

export default ShowDispatchAndReturnStore;
