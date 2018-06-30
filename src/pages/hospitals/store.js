import moment from 'moment';
import { REGISTER_STATE } from '../../const';
import {extendObservable} from '../../libs/mobx';
// var extendObservable = require('../../libs/mobx').extendObservable;

var TodoStore = function () {
	extendObservable(this, {
		hospitalIndex: 0,
		doctorIndex: 0,
		visitDate: moment().format('YYYY-MM-DD'),
		listLoadingMsg: '加载中...',

		hospitals: [],
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

export default new TodoStore();
