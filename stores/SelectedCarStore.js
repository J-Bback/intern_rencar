import { observable, action } from 'mobx';

class SelectedCarStore {
  @observable selectedCarBrand = null;
  @observable selectedCarName = null;
  @observable selectedCarId = null;

  constructor() {}

  @action setSelectedCarBrand = (brand) => {
    this.selectedCarBrand = brand;
  };
  @action setSelectedCarName = (name) => {
    this.selectedCarName = name;
  };
  @action setSelectedCarId = (id) => {
    this.selectedCarId = id;
  };
}

export default SelectedCarStore;
