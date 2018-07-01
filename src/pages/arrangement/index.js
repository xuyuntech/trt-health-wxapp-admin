import { flow } from 'lodash';
import moment from 'moment';
import { observer } from '../../libs/observer';
import store from './store';
import {FUNCS} from '../../const';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page(observer(
	{
		props: {
			store,
		},
		addArrangement() {
			wx.navigateTo({
				url: `/pages/arrangement-add/index?selectedDate=${store.selectedDate}`,
			});
		},
		submitModal() {
			this.props.store.modalShow = false;
		},
		cancelModal() {
			this.props.store.modalShow = false;
		},
		openFunc({currentTarget: {dataset}}) {
			wx.navigateTo({
				url: FUNCS[dataset['key']],
			});
		},
		preMonth() {
			store.selectedDate = moment(store.selectedDate).subtract(1, 'months').format('YYYY-MM-DD');
		},
		nextMonth() {
			store.selectedDate = moment(store.selectedDate).add(1, 'months').format('YYYY-MM-DD');
		},
		async selectDay({currentTarget: {dataset: {day}}}) {
			if (!day) {
				return;
			}
			store.selectedDate = day;
			await store.queryByVisitDate(day);
		},
		async onLoad() {
			await delay();

			const log = flow(() => {
				console.log('is wechat mini program: ', __WECHAT__);
				console.log('is alipay mini program: ', __ALIPAY__);
				console.log('DEV: ', __DEV__);
			});

			log();
			await store.queryByVisitDate();
		},
	},
));
