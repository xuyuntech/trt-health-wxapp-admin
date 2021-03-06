import { observer } from '../../libs/observer';
import store from './store';
import { request } from '../../utils';
import {API} from '../../const';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page(observer(
	{
		props: {
			store,
		},
		openAddPage() {
			wx.navigateTo({
				url: '/pages/doctors-add/index',
			});
		},
		onPullDownRefresh() {
			this.load();
		},
		async load() {
			try {
				const data = await request({
					url: API.Doctor.Query(),
				});
				console.log(data);
				store.doctors = (data.results || []).map((item) => ({...item, link: `/pages/doctors-add/index?id=${item.name}&editMode=true`}));
			}
			catch (err) {
				console.error(err);
			}
		},
		async onLoad(options) {
			await delay();
			this.load();
		},
	},
));
