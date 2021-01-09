import { observable, action } from "mobx";

class ModalStore {
	@observable openModal = false;

	constructor() {}

	@action setOpenModal(value) {
		this.openModal = value;
	}
}

export default ModalStore;
