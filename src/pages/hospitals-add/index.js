import { observer } from '../../libs/observer';
import store from './store';
import {request} from '../../utils';
import {API} from '../../const';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page(observer(
	{
		props: {
			store,
		},
		valueChange({detail, currentTarget}) {
			const { value } = detail;
			const { dataset } = currentTarget;
			store.hospital[dataset['name']] = value;
		},
		async save() {
			const { name, address, phone } = store;
			let phone1 = '';
			let phone2 = phone;
			if (!name) {
				return wx.showToast({title: '名称填写有误', icon: 'none'});
			}
			if (!address) {
				return wx.showToast({title: '地址填写有误', icon: 'none'});
			}
			if (!phone || !/^[-\d]+$/.test(phone)) {
				return wx.showToast({title: '电话填写有误', icon: 'none'});
			}
			if (phone.indexOf('-') >= 0) {
				const parts = phone.split('-');
				phone1 = parts[0];
				phone2 = parts[1];
			}
			const data = {
				name,
				address,
				phone1,
				phone2,
			};
			console.log('data', data);
			try {
				const result = await request(store.editMode === 'true' ? {
					url: API.Hospitals.Update(),
					method: 'PUT',
					data: {
						...data,
						id: store.id,
					},
				} : {
					url: API.Hospitals.Create(),
					method: 'POST',
					data,
				});
				console.log(result);
				wx.navigateBack();
			}
			catch (err) {
				wx.showToast({title: err.err, icon: 'none'});
			}
		},
		async onLoad(options) {
			await delay();
			// store.clear();
			const { id, editMode } = options;
			store.editMode = editMode;
			store.id = id;
			if (id) {
				try {
					const data = await request({
						url: API.Hospitals.FindByID(id),
					});
					Object.assign(store, data.result);
					// store.hospital = data.result || {};
				}
				catch (err) {
					console.error(err);
					wx.showToast({title: `Error:${err}`, icon: 'error'});
				}
			}
		},
	},
));
