import moment from 'moment';
import { REGISTER_STATE } from '../../const';
import {extendObservable} from '../../libs/mobx';
// var extendObservable = require('../../libs/mobx').extendObservable;

var TodoStore = function () {
	extendObservable(this, {
		listLoadingMsg: '加载中...',
		doctors: [],
	});
};

export default new TodoStore();
