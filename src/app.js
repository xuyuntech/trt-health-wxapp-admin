import { camelCase } from 'lodash';

let _requestHeader = null;

App({
	onLaunch: function () {
		// 展示本地存储能力
		// var logs = wx.getStorageSync('logs') || [];
		// logs.unshift(Date.now());
		// wx.setStorageSync('logs', logs);

		// wx.checkSession({
		// 	success: function () {
		// 		console.log('check ok');

		// 	},
		// 	fail: function () {
		// 		console.log('check failed');
		// 		self.login();
		// 	},
		// });
	},
	checkLogin() {
		const self = this;
		const accessToken = wx.getStorageSync('access_token');
		const userID = wx.getStorageSync('user_id');
		const userInfo = wx.getStorageSync('user_info');
		if (!accessToken) {
			self.login();
		}
		else {
			self.setRequestHeader({accessToken, userID, userInfo});
		}
	},
	getPrevPage() {
		const routers = getCurrentPages(); // eslint-disable-line
		const prevPage = routers[routers.length - 2];
		return prevPage;
	},
	setRequestHeaderToStorage({accessToken, userID, userInfo}) {
		wx.setStorageSync('access_token', accessToken);
		wx.setStorageSync('user_id', userID);
		wx.setStorageSync('user_info', userInfo);
	},
	setRequestHeader({accessToken, userID, userInfo}) {
		_requestHeader = {
			accessToken,
			userID,
			userInfo,
		};
	},
	clearStorage() {
		wx.removeStorageSync('access_token');
		wx.removeStorageSync('user_id');
		wx.removeStorageSync('user_info');
		_requestHeader = null;
	},
	storage() {
		this.ensureRequestHeader();
		return _requestHeader;
	},
	isHospitalAdmin() {
		this.ensureRequestHeader();
		return _requestHeader.userInfo.role === 'HospitalAdmin';
	},
	ensureRequestHeader() {
		if (!_requestHeader) {
			const accessToken = wx.getStorageSync('access_token');
			const userID = wx.getStorageSync('user_id');
			const userInfo = wx.getStorageSync('user_info');
			_requestHeader = {
				accessToken,
				userID,
				userInfo,
			};
		}
	},
	getRequestHeader() {
		this.ensureRequestHeader();
		const { accessToken, userID, userInfo } = _requestHeader;
		const d = {
			'X-Access-Token': accessToken,
			'X-Access-UserID': userID,
		};
		if (this.isHospitalAdmin()) {
			d['X-Access-HospitalID'] = userInfo.hospital;
		}
		return d;
	},
	login: function () {
		console.log('logn ......');
		this.clearStorage();
		// 登录
		setTimeout(() => {
			wx.redirectTo({
				url: '/pages/login/index',
			});
		});
	},
	home: function () {
		wx.reLaunch({
			url: '/pages/index/index',
		});
	},
	toast: function (title, icon = 'none') {
		return wx.showToast({title, icon});
	},
	error: function (err) {
		wx.showToast({title: err.err, icon: 'error'});
	},
	globalData: {
		userInfo: null,
	},
});
