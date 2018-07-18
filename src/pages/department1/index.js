import { observer } from '../../libs/observer';
import { toJS } from '../../libs/mobx';
import store from './store';
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
		selectDep1({currentTarget: {dataset: {department}}}) {
			store.selectedDep1ID = department;
			store.department2 = store.department1.find((item) =>
				item.id === department).department2s || [];
			store.selectedDep2ID = '';
		},
		selectDep2({currentTarget: {dataset: {department}}}) {
			store.selectedDep2ID = department;
			app.getPrevPage().props.store.selectedDepartment = store.getSelectedDepartment();
			wx.navigateBack();
		},
		async onLoad(options) {
			const { hospital = '61cd06e0-7d37-11e8-b8bd-33dbbb63e067' } = options;
			await delay();
			try {
				store.loadMsg = '加载中...';
				const data = await request({
					url: API.Department1.Query(),
					data: {
						f: 'true',
						hospital,
					},
				});
				store.department1 = data.results;
				if (store.department1.length === 0) {
					store.loadMsg = '该医院暂无科室数据';
					return;
				}
				store.loadMsg = '';
				const firstDeps = store.department1[0];
				if (firstDeps && firstDeps.department2s) {
					store.selectedDep1ID = firstDeps.id;
					store.department2 = firstDeps.department2s;
				}
			}
			catch (err) { console.error(err); }
		},
	},
));
