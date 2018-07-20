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
		hospitalChange({detail: {value}}) {
			store.hospitalIndex = value;
		},
		valueChange({currentTarget: {dataset}, detail: {value}}) {
			const { name } = dataset;
			Object.assign(store.data, {[name]: value});
		},
		submit() {
			store.submit();
		},
		async onLoad() {
			await delay();
			await store.loadHospitals();
		},
	},
));
