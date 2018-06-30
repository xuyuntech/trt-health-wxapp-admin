Component({
	data: {
		isShow: false,
		value: '',
	},
	properties: {
		title: {
			type: String,
			value: 'Title',
		},
		value: {
			type: String,
			value: '',
		},
		actions: {
			type: Array,
			value: [],
		},
	},
	methods: {
		ok: function ({detail: {index}}) {
			this.triggerEvent('click', {index});
		},
		show: function () {
			this.setData({
				isShow: true,
			});
		},
		hide: function () {
			this.setData({
				isShow: false,
			});
		},
	},
});
