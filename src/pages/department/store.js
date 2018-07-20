import moment from 'moment';
import { request } from '../../utils';
import {API} from '../../const';
import { toJS } from '../../libs/mobx';

var extendObservable = require('../../libs/mobx').extendObservable;

class Store {
	constructor() {
		extendObservable(this, {
			department1: [],
			department2: {},
			selectedDep2: [],
			selectedDep1ID: '',
			selectedDep2ID: '',
			loadMsg: '',
			loadDep2Msg: '',
		});
	}
	getSelectedDepartment() {
		if (!this.selectedDep2ID) {
			return;
		}
		try {
			// wx.showLoading();
			// const data = await request({
			// 	url: API.Department2.FindByID(this.selectedDep2ID),
			// 	data: {
			// 		f: 'true',
			// 	},
			// });
			// wx.hideLoading();
			const dep1 = toJS(this.department1.find((item) =>
				item.id === this.selectedDep1ID));
			const dep2 = toJS(this.selectedDep2.find((item) =>
				item.id === this.selectedDep2ID));
			console.log('selected dep1', dep1, 'dep2', dep2);
			return {
				department1: dep1,
				department2: dep2,
			};
		}
		catch (err) { console.error(err); }
		return null;
	}
}

export default new Store();
