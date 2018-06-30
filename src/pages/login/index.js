import { flow } from 'lodash';
import { observer } from '../../libs/observer';
import store from './store';
import { $Toast } from '../../iview/base/index';
import { request } from '../../utils';
import { API } from '../../const';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page(observer(
	{
		props: {
			store,
		},
		usernameChange({detail}) {
			const { value } = detail;
			store.username = value;
		},
		passwordChange({detail}) {
			const { value } = detail;
			store.password = value;
		},
		async submit(e) {
			const { username, password } = e.detail.value;
			console.log('data:', { username, password });
			if (!username) {
				return $Toast({content: '请输入用户名'});
			}
			if (!password) {
				return $Toast({content: '请输入密码'});
			}
			const data = {username, password};
			try {
				const res = await request({
					method: 'POST',
					url: API.Users.Login(),
					data,
				});
				console.log('login res', res);
				const { result } = res;
				const { id, userId } = result;
				if (!id || !userId) {
					return $Toast({content: '登录失败'});
				}
				app.setRequestHeaderToStorage({accessToken: id, userID: userId});
				app.setRequestHeader({accessToken: id, userID: userId});
				app.home();
			}
			catch (err) {
				$Toast({content: err.err});
			}
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
