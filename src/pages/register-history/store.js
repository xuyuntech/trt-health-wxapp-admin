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

		registerItems: [],
	});
	this.reload = async function () {
		try {
			const data = await request({
				url: API.RegisterHistory.Query(),
				data: {
					f: 'true',
				},
			});
			this.registerItems = data.results.map((item) => ({
				...item,
				arrangementHistory: {
					...item.arrangementHistory,
					visitDateTime: `${moment(item.arrangementHistory.visitDate).format('YYYY-MM-DD')} ${item.arrangementHistory.visitTime === 'AM' ? '上午' : '下午'}`,
				},
				stateStr: REGISTER_STATE[item.state],
			}));
		}
		catch (err) {
			console.error(err);
		}
	};
};

export default new TodoStore();
