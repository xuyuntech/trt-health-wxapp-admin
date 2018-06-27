import moment from 'moment';

var extendObservable = require('../../libs/mobx').extendObservable;

var TodoStore = function () {
	extendObservable(this, {
		visitTimeIndex: -1,
		hospitalIndex: 0,
		doctorIndex: 0,
		visitDate: moment().format('YYYY-MM-DD'),

		visitTimeShow: false,
		visitTimeLabel: '请选择',
		hospitals: [
			{ name: '请选择', id: -1 },
			{ name: '河东路店', id: 0 },
			{ name: '文化路店', id: 1 },
		],
		doctors: [
			{ name: '请选择', id: -1 },
			{ name: '张三', id: 0 },
			{ name: '李四', id: 1 },
		],
	});

	this.today = moment().format('YYYY-MM-DD');
	this.maxDay = moment().add(2, 'weeks').format('YYYY-MM-DD');

	// action
	this.addTodo = function (title) {
		this.todos.push({title: title});
	};

	this.removeTodo = function () {
		this.todos.pop();
	};
};

module.exports = new TodoStore();
