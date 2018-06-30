import { observer } from '../../libs/observer';
import store from './store';
import { request } from '../../utils';

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
				url: '/pages/hospitals-add/index',
			});
		},
		async onShow() {
			await delay();
			try {
				const data = await request({
					url: 'http://localhost:3002/hospitals',
				});
				console.log(data);
				store.hospitals = (data.results || []).map((item) => ({...item, link: `/pages/hospitals-add/index?id=${item.id}&editMode=true`}));
			}
			catch (err) {
				console.error(err);
			}
		},
	},
));
