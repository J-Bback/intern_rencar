import { observable, action } from "mobx";

class FilterStore {
	@observable selectedTermId = 0;
	@observable selectedStateValue = "";

	constructor() {}

	@action setSelectedTermId(term) {
		this.selectedTermId = term;
	}
	@action setSelectedStateValue(value) {
		this.selectedStateValue = value;
	}
}

export default FilterStore;
