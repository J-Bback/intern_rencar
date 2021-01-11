import { observable, action } from 'mobx';

class SelectedCarStore {
  @observable selectedCarBrand = null;
  @observable selectedCarName = null;
  @observable selectedCarId = null;
  @observable isEdit = false;

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
  @action setIsEdit = (condition) => {
    this.isEdit = condition;
  };
}

export default SelectedCarStore;
