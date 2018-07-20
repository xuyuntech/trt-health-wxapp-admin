import { formatTime, request } from '../../utils';
import { API } from '../../const';
import { observer } from '../../libs/observer';
import store from './store';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

Page(observer(
	{
		props: {
			store,
		},
		getUserInfo(res) {
			console.log(res);
		},
		logout() {
			wx.showModal({
				title: '提示',
				content: '确定退出吗?',
				async success({confirm}) {
					if (confirm) {
						store.clear();
						try {
							await request({
								url: API.Users.Logout(),
								method: 'POST',
							});
							getApp().clearStorage();
							wx.redirectTo({
								url: '/pages/login/index',
							});
						}
						catch (err) {
							console.error(err);
							wx.showModal({
								title: '错误',
								content: `${err}`,
							});
						}
					}
				},
			});
		},
		async onShow() {
			await delay();
			if (!store.userInfo) {
				store.loadUserInfo();
			}
		},
	},
));
