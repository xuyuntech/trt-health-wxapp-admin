import moment from 'moment';
import { REGISTER_STATE, API } from '../../const';
import {extendObservable} from '../../libs/mobx';
import { request } from '../../utils';
// var extendObservable = require('../../libs/mobx').extendObservable;

var TodoStore = function () {
	extendObservable(this, {
		hospitalIndex: 0,
		doctorIndex: 0,
		visitDate: moment().format('YYYY-MM-DD'),
		listLoadingMsg: '加载中...',

		registerHistory: null,
	});
	this.load = async function () {
		if (!this.registerHistoryID) {
			return;
		}
		try {
			const data = await request({
				url: API.RegisterHistory.FindByID(this.registerHistoryID),
			});
			this.registerHistory = data.result;
		}
		catch (err) {
			wx.showToast({title: String(err), icon: 'none'});
		}
	};
};

export default new TodoStore();
