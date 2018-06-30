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
		valueChange({detail: {detail}, currentTarget}) {
			console.log('value', value);
			const { value } = detail;
			const { dataset } = currentTarget;
			store[dataset['name']] = value;
		},
		selectGender() {
			store.genderShow = true;
		},
		confirmGender({detail: {index}}) {
			store.gender = store.genderList[index].name;
			this.cancelGender();
		},
		cancelGender() {
			store.genderShow = false;
		},
		async save() {
			const { name, realName, gender, age, phone, title, description, skilledIn } = store;
			if (!realName) {
				return wx.showToast({title: '名称填写有误', icon: 'none'});
			}
			if (!title) {
				return wx.showToast({title: '职称填写有误', icon: 'none'});
			}
			if (!description) {
				return wx.showToast({title: '简介填写有误', icon: 'none'});
			}
			if (!skilledIn) {
				return wx.showToast({title: '擅长填写有误', icon: 'none'});
			}
			if (!name) {
				return wx.showToast({title: '登录名填写有误', icon: 'none'});
			}

			const data = {
				age,
				phone,
				title,
				description,
				skilledIn,
				name,
				realName,
				gender: store.genderList.find((item) => item.name === gender).value,
			};
			console.log('data', data);
			try {
				const result = await request(store.editMode === 'true' ? {
					url: API.Doctor.Update(data.name),
					method: 'PUT',
					data,
				} : {
					url: API.Doctor.Create(),
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
			store.clear();
			const { id, editMode } = options;
			store.editMode = editMode;
			store.id = id;
			if (id) {
				try {
					const data = await request({
						url: API.Doctor.FindByID(id),
					});
					Object.assign(store, {
						...data.result,
						gender: store.genderList.find((item) => item.value === data.result.gender).name,
						age: data.result.age || '',
					});
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
