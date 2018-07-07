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
			const url = FUNCS[dataset['key']];
			if (!url) {
				wx.showToast({title: '此功能还未开放', icon: 'none'});
				return;
			}
			wx.navigateTo({
				url,
			});
		},
		async onLoad() {
			await delay();
			app.checkLogin();
		},
	},
));
