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
		try {
			const res = await request({
				url: API.ArrangementHistory.Query(),
				data: {
					f: 'true',
					visitDate,
				},
			});
			this.arrangementHistories = res.results || [];
		}
		catch (err) {
			app.error(err);
		}
	};
};

module.exports = new TodoStore();
