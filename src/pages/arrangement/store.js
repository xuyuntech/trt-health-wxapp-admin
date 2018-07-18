import moment from 'moment';
import _chunk from 'lodash.chunk';
import { request } from '../../utils';
import {API} from '../../const';

var extendObservable = require('../../libs/mobx').extendObservable;

const app = getApp();

var TodoStore = function () {
	extendObservable(this, {
		arrangementHistories: [],

		selectedDate: moment().format('YYYY-MM-DD'),
		get daysInMonth() {
			const sd = moment(this.selectedDate);
			const month = sd.month();
			const year = sd.year();
			const firstDay = moment().year(year).month(month).date(1);
			const daysUnshift = firstDay.weekday();
			const days = [];
			for (let i = 1; i <= daysUnshift; i += 1) {
				const s = moment(firstDay).subtract(i, 'days');
				days.unshift({
					format: s.format('YYYY-MM-DD'),
					dayStr: s.date(),
					preMonth: true,
				});
			}
			const dim = sd.daysInMonth();
			days.push({
				format: firstDay.format('YYYY-MM-DD'),
				dayStr: firstDay.date(),
			});
			for (let i = 1; i < dim; i += 1) {
				const d = moment(firstDay).add(i, 'days');
				days.push({
					format: d.format('YYYY-MM-DD'),
					dayStr: d.date(),
				});
			}
			const lastDayInMonth = moment(days[days.length - 1].format);
			const daysPush = 6 - lastDayInMonth.weekday();
			for (let i = 1; i <= daysPush; i += 1) {
				const d = moment(lastDayInMonth).add(i, 'days');
				days.push({
					format: d.format('YYYY-MM-DD'),
					dayStr: d.date(),
					nextMonth: true,
				});
			}
			return _chunk(days, 7);
		},
	});

	this.queryByVisitDate = async function (visitDate) {
		if (!visitDate) {
			visitDate = moment().format('YYYY-MM-DD');
		}
		try {
			const res = await request({
				url: API.ArrangementHistory.QueryAll(),
				data: {
					visitDate,
				},
			});
			const results = res.results || [];
			const m = {};
			results.forEach((item) => {
				if (!m[item.hospital.name]) {
					m[item.hospital.name] = {
						hospital: item.hospital,
						arrangementHistories: [],
					};
				}
				m[item.hospital.name].arrangementHistories.push({
					...item,
					visitDate: moment(visitDate).format('YYYY-MM-DD'),
					visitTime: item.visitTime === 'AM' ? '上午' : '下午',
				});
			});
			this.arrangementHistories = Object.keys(m).map((key) => ({...m[key]}));
		}
		catch (err) {
			app.error(err);
		}
	};
};

export default new TodoStore();
