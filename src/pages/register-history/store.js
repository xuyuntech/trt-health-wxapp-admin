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
		listLoadingMsg: '',

		registerItems: [],
	});
	this.reload = async function () {
		try {
			this.listLoadingMsg = '加载中...';
			this.registerItems = [];
			const data = await request({
				url: API.RegisterHistory.Query(),
				data: {
					f: 'true',
					order: 'created DESC',
				},
			});
			if (data.results.length === 0) {
				this.listLoadingMsg = '暂无数据';
				return;
			}
			this.listLoadingMsg = '';
			this.registerItems = data.results.map((item) => ({
				...item,
				visitDateTime: `${moment(item.visitDate).format('YYYY-MM-DD')} ${item.visitTime === 'AM' ? '上午' : '下午'}`,
				stateStr: REGISTER_STATE[item.state],
			}));
		}
		catch (err) {
			console.error(err);
		}
	};
};

export default new TodoStore();
