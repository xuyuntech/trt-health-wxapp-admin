import moment from 'moment';
import _chunk from 'lodash.chunk';
import { request } from '../../utils';
import {API} from '../../const';

var extendObservable = require('../../libs/mobx').extendObservable;

const app = getApp();

class Store {
	constructor() {
		extendObservable(this, {
			data: {
				username: '',
				password: '',
			},
			hospitals: [],
			hospitalIndex: -1,
		});
	}
	async loadHospitals() {
		try {
			const data = await request({
				url: API.Hospitals.Query(),
			});
			console.log(data);
			this.hospitals = data.results;
		}
		catch (err) {
			console.error(err);
		}
	}
	clear() {
		this.data = {
			username: '',
			password: '',
		};
		this.hospitalIndex = -1;
	}
	async submit() {
		const self = this;
		const { username, password } = this.data;
		const hospital = this.hospitals[this.hospitalIndex];
		if (!hospital) {
			return app.toast('请选择医院');
		}
		if (!username) {
			return app.toast('请填写用户名');
		}
		if (!/^[a-zA-Z]{1}[a-zA-Z0-9_-]{5,15}$/.test(username)) {
			return app.toast('用户名格式不正确');
		}
		if (!password || password.length < 8) {
			return app.toast('密码格式不正确');
		}

		try {
			await request({
				url: API.HospitalAdmin.Create(),
				method: 'POST',
				data: {
					...this.data,
					hospital: hospital.id,
				},
			});
			wx.showModal({
				title: '提示',
				content: '操作成功!',
				success() {
					self.clear();
				},
			});
		}
		catch (err) {
			console.error(err);
		}
	}
}

export default new Store();
