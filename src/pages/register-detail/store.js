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

		registerItems: [],
		registerItems1: [
			{
				patient: {
					name: '张三',
					phone: '18612341234',
					sid: '32173827183927183',
					gender: 'MALE',
				},
				hospital: {
					name: '河东路店',
				},
				doctor: {
					name: '医生001',
				},
				visitDate: '2018-12-12',
				visitTime: 'am',
				state: REGISTER_STATE['Register'],
			},
			{
				patient: {
					name: '张三',
					phone: '18612341234',
					sid: '32173827183927183',
					gender: 'MALE',
				},
				hospital: {
					name: '河东路店',
				},
				doctor: {
					name: '医生001',
				},
				visitDate: '2018-12-12',
				visitTime: 'am',
				state: REGISTER_STATE['Register'],
			},
		],

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

export default new TodoStore();
