import { useStaticRendering } from 'mobx-react';
import SampleStore from './SampleStore';

const isServer = typeof window === 'undefined';
useStaticRendering(isServer);

let store = null;

class RootStore {
  constructor() {
    this.sampleStore = new SampleStore()
  }
}

export default function initializeStore() {
  if (isServer) {
    return new RootStore()
  } else {
    if (store === null) {
      store = new RootStore()
    }
    return store
  }
}