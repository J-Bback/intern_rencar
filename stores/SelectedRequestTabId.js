import { observable, action } from 'mobx';

class SelectedRequestTabId {
  @observable selectedTabId = 1;

  constructor() {}

  @action setSelectedTabId = (id) => {
    this.selectedTabId = id;
  };
}

export default SelectedRequestTabId;
