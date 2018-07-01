import moment from 'moment';
import { request } from '../../utils';
import {API} from '../../const';

var extendObservable = require('../../libs/mobx').extendObservable;

// var TodoStore = function () {
// 	extendObservable(this, {
// 		visitTimeIndex: -1,
// 		hospitalIndex: 0,
// 		doctorIndex: 0,
// 		visitDate: moment().format('YYYY-MM-DD'),

// 		visitTimeShow: false,
// 		visitTimeLabel: '请选择',
// 		hospitals: [],
// 		doctors: [],
// 	});

// 	this.loadDoctors = function(){};
// };

class Store {
	constructor() {
		this.today = moment().format('YYYY-MM-DD');
		this.maxDay = moment().add(2, 'weeks').format('YYYY-MM-DD');
		extendObservable(this, {
			visitTimeIndex: -1,
			hospitalIndex: -1,
			doctorIndex: -1,
			fee: '',
			visitDate: this.today,
			description: '',
			visitTimeShow: false,
			visitTimeLabel: '请选择',
			hospitals: [],
			doctors: [],
		});

	}
	async submit() {
		const { visitTimeLabel, hospitalIndex, doctorIndex,
			visitDate, description, fee } = this;
		if (hospitalIndex < 0) {
			return wx.showToast({title: '请选择门店', icon: 'none'});
		}
		if (doctorIndex < 0) {
			return wx.showToast({title: '请选择医师', icon: 'none'});
		}
		if (visitTimeLabel !== '上午' && visitTimeLabel !== '下午') {
			return wx.showToast({title: '请选择出诊时间', icon: 'none'});
		}
		if (isNaN(fee)) {
			return wx.showToast({title: '请填写挂号费', icon: 'none'});
		}
		const data = {
			visitTime: visitTimeLabel === '上午' ? 'AM' : 'PM',
			hospital: this.hospitals[hospitalIndex].id,
			doctor: this.doctors[doctorIndex].name,
			visitDate: new Date(visitDate).toISOString(),
			fee,
			description,
		};
		console.log('data', data);
		try {
			await request({
				url: API.ArrangementHistory.Create(),
				method: 'POST',
				data,
			});
			wx.showToast({title: '操作成功', icon: 'success'});
			wx.navigateBack();
		}
		catch (err) {
			console.error(err);
		}
	}
	async loadDoctors() {
		try {
			const data = await request({
				url: API.Doctor.Query(),
			});
			console.log(data);
			this.doctors = data.results;
		}
		catch (err) {
			console.error(err);
		}
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
}

export default new Store();
