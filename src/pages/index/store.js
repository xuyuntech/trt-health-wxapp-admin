var extendObservable = require('../../libs/mobx').extendObservable;

class Store {
	constructor() {
		extendObservable(this, {
			isHospitalAdmin: false,
		});
	}
}

module.exports = new Store();
