import { useStaticRendering } from 'mobx-react';
import SampleStore from './SampleStore';
import RequestInputStore from './RequestInputStore';
import SelectedCarStore from './SelectedCarStore';
import SelectedRequestTabId from './SelectedRequestTabId';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

class RootStore {
  constructor() {
    this.sampleStore = new SampleStore();
    this.RequestInputStore = new RequestInputStore();
    this.SelectedCarStore = new SelectedCarStore();
    this.SelectedRequestTabId = new SelectedRequestTabId();
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
