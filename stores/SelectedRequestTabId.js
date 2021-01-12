import { observable, action } from 'mobx';

class SelectedRequestTabId {
  @observable selectedTabId = '';

  constructor() {}

  @action setSelectedTabId = (url) => {
    this.selectedTabId = url;
  };
}

export default SelectedRequestTabId;
