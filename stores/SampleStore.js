import { observable, action } from 'mobx';

class SampleStore {
  @observable value = null;

  constructor() {

  }

  @action setValue = (value) => {
    this.value = value;
  }
}

export default SampleStore;
