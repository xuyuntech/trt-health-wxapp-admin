import moment from 'moment';
import { request } from '../../utils';
import {API} from '../../const';

var extendObservable = require('../../libs/mobx').extendObservable;

const app = getApp();

class Store {
	constructor() {
		this.today = moment().format('YYYY-MM-DD');
		this.maxDay = moment().add(2, 'weeks').format('YYYY-MM-DD');
		this.visitTimeList = [{name: '上午', value: 'AM'}, {name: '下午', value: 'PM'}];
		extendObservable(this, {
			visitTimeIndex: -1,
			hospitalIndex: -1,
			doctorIndex: -1,
			fee: '',
			mode: '',
			state: '',
			department1: null,
			department2: null,
			visitDate: this.today,
			description: '',
			visitTime: '',
			visitTimeShow: false,
			hospitals: [],
			doctors: [],
		});

	}
	clear() {
		Object.assign(this, {
			visitTimeIndex: -1,
			hospitalIndex: -1,
			doctorIndex: -1,
			fee: '',
			mode: '',
			state: '',
			department1: null,
			department2: null,
			visitDate: this.today,
			description: '',
			visitTime: '',
			visitTimeShow: false,
			hospitals: [],
			doctors: [],
		});
	}
	async cancel() {
		if (!this.id) {
			console.error('没有 id');
			return;
		}
		try {
			await request({
				url: API.ArrangementHistory.Cancel(this.id),
				method: 'PUT',
			});
			wx.showToast({title: '操作成功!'});
			this.load(this.id);
		}
		catch (err) {
			console.error(`cancel error: ${err}`);
			wx.showModal({
				title: '错误',
				content: `${err}`,
			});
		}
	}
	async submit() {
		const { visitTime, hospitalIndex, doctorIndex,
			visitDate, description, fee, department1, department2 } = this;

		if (hospitalIndex < 0) {
			return wx.showToast({title: '请选择门店', icon: 'none'});
		}
		if (doctorIndex < 0) {
			return wx.showToast({title: '请选择医师', icon: 'none'});
		}
		if (!visitTime) {
			return wx.showToast({title: '请选择出诊时间', icon: 'none'});
		}
		if (isNaN(fee)) {
			return wx.showToast({title: '请填写挂号费', icon: 'none'});
		}
		if (!department1 || !department2) {
			return app.toast('您还没有选择科室');
		}
		const hospital = this.hospitals[hospitalIndex];
		const { doctors } = department2 || [];
		const data = {
			visitTime,
			hospital: hospital.id,
			doctor: doctors[doctorIndex].name,
			department1: department1.id,
			department2: department2.id,
			visitDate: new Date(visitDate).toISOString(), // new Date(visitDate).toISOString(),
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
			app.getPrevPage().reload();
			wx.navigateBack();
		}
		catch (err) {
			console.error(err);
		}
	}
	async refreshDoctors() {
		try {
			const data1 = await request({
				url: API.Department2.QueryDoctors(this.department2.id),
			});
			const doctors = data1.results || [];
			Object.assign(this, {
				doctorIndex: -1,
				doctors,
			});
		}
		catch (err) {
			console.error(err);
		}
	}
	async load(id) {
		function indexOf(arr, fn) {
			for (let i = 0; i < arr.length; i += 1) {
				const item = arr[i];
				if (fn(item)) {
					return i;
				}
			}
			return -1;
		}
		try {
			const data = await request({
				url: API.ArrangementHistory.FindByID(id),
			});
			const { visitDate, visitTime, department1, department2, doctor, hospital, fee, description, state } = data.result;
			const data1 = await request({
				url: API.Department2.QueryDoctors(department2.id),
			});
			const doctors = data1.results || [];
			console.log(data, doctors);
			Object.assign(this, {
				visitDate: moment(visitDate).format('YYYY-MM-DD'),
				state,
				visitTime,
				department1,
				department2,
				doctorIndex: indexOf(doctors, (item) => item.name === doctor.name),
				hospitalIndex: indexOf(this.hospitals, (item) => item.id === hospital.id),
				fee,
				description,
				doctors,
			});
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
