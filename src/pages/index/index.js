import { flow } from 'lodash';
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
		openFunc({currentTarget: {dataset}}) {
			wx.navigateTo({
				url: FUNCS[dataset['key']],
			});
		},
		async onLoad() {
			await delay();

			const log = flow(() => {
				console.log('is wechat mini program: ', __WECHAT__);
				console.log('is alipay mini program: ', __ALIPAY__);
				console.log('DEV: ', __DEV__);
			});

			log();
		},
	},
));
