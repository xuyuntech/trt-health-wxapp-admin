import { observer } from '../../libs/observer';
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
		showVisitTime() {
			this.props.store.visitTimeShow = true;
		},
		handleVisitTime({detail: {index}}) {
			store.visitTimeIndex = index;
			store.visitTimeLabel = index === 0 ? '上午' : (index === 1 ? '下午' : '请选择');
			this.cancelVisitTime();
		},
		cancelVisitTime() { this.props.store.visitTimeShow = false; },
		visitDateChange({detail: {value}}) {
			store.visitDate = value;
		},
		doctorChange({detail: {value}}) {
			store.doctorIndex = value;
		},
		hospitalChange({detail: {value}}) {
			store.hospitalIndex = value;
		},
		verifyAction() {
			wx.showModal({
				title: '提示',
				content: '确定核销该挂号单吗?',
				async success(res) {
					if (res.confirm) {
						try {
							await request({
								url: API.VerifyRegisterAction.Verify(store.registerHistoryID),
								method: 'PUT',
							});
							wx.showModal({
								title: '操作成功',
								content: '点击确定返回',
								success(res) {
									if (res.confirm) {
										app.getPrevPage().props.store.reload();
										wx.navigateBack();
									}
								},
							});
						}
						catch (err) {
							wx.showModal({
								title: '操作失败',
								content: `${err}`,
								showCancel: false,
							});
						}
					}
				},
			});

		},
		submit(e) {
			console.log(e);
			const { visitTimeIndex, hospitalIndex, doctorIndex, visitDate } = store;
			console.log({visitTimeIndex, hospitalIndex, doctorIndex, visitDate});
		},
		async onLoad(options) {
			await delay();
			const { id } = options;
			store.registerHistoryID = id;
			store.load();
		},
	},
));
