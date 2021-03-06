import { useStaticRendering } from 'mobx-react';
import RequestInputStore from './RequestInputStore';
import SelectedCarStore from './SelectedCarStore';
import SelectedRequestTabId from './SelectedRequestTabId';
import LoginStore from './LoginStore';
import ModalStore from './ModalStore';
import FilterStore from './FilterStore';
import ShowDispatchAndReturnStore from './ShowDispatchAndReturnStore';

const isServer = typeof window === "undefined";
useStaticRendering(isServer);

let store = null;

class RootStore {
  constructor() {
    this.RequestInputStore = new RequestInputStore();
    this.SelectedCarStore = new SelectedCarStore();
    this.SelectedRequestTabId = new SelectedRequestTabId();
    this.LoginStore = new LoginStore();
    this.modalStore = new ModalStore();
    this.filterStore = new FilterStore();
    this.ShowDispatchAndReturnStore = new ShowDispatchAndReturnStore();
  }
}

export default function initializeStore() {
	if (isServer) {
		return new RootStore();
	} else {
		if (store === null) {
			store = new RootStore();
		}
		return store;
	}
}
