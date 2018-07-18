import { observer } from '../../libs/observer';
import store from './store';

const delay = (t = 0) => new Promise((resolve) => setTimeout(resolve, t));

// 获取应用实例
const app = getApp(); //  eslint-disable-line no-undef
Page(observer(
	{
		props: {
			store,
		},
		showVisitTime() {
			this.props.store.visitTimeShow = true;
		},
		handleVisitTime({detail: {index}}) {
			store.visitTime = store.visitTimeList[index].value;
			// store.visitTimeLabel = index === 0 ? '上午' : (index === 1 ? '下午' : '请选择');
			this.cancelVisitTime();
		},
		cancelVisitTime() { this.props.store.visitTimeShow = false; },
		visitDateChange({detail: {value}}) {
			store.visitDate = value;
		},
		feeChange({detail: {value}}) {
			store.fee = value;
		},
		selectDepartment() {
			if (store.hospitalIndex < 0) {
				return wx.showToast({title: '必须先选择医院', icon: 'none'});
			}
			wx.navigateTo({
				url: `/pages/department/index?hospital=${store.hospitals[store.hospitalIndex].id}`,
			});
		},
		doctorChange({detail: {value}}) {
			store.doctorIndex = value;
		},
		hospitalChange({detail: {value}}) {
			store.hospitalIndex = value;
		},
		descriptionChange({detail: {detail: {value}}}) {
			store.description = value;
		},
		cancel() {
			wx.showModal({
				title: '提示',
				content: '确定要取消该排班吗？',
				async success({confirm}) {
					if (confirm) {
						await store.cancel();
					}
				},
			});
		},
		async submit(e) {
			await store.submit();
		},
		async onLoad(options) {
			await delay();
			store.clear();
			const { selectedDate, mode, id } = options;
			store.mode = mode;
			store.id = id;
			store.selectedDate = selectedDate;
			wx.setNavigationBarTitle({
				title: mode === 'edit' ? '更改排班' : '新增排班',
			});
			await store.loadHospitals();
			if (mode === 'edit' && id) {
				await store.load(id);
			}
		},
	},
));
