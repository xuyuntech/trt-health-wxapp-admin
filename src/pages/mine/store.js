import {extendObservable, toJS} from '../../libs/mobx';
import { request } from '../../utils';
import { API } from '../../const';
// var extendObservable = require('../../libs/mobx').extendObservable;
const app = getApp();

var TodoStore = function () {
	extendObservable(this, {
		userInfo: null,
	});
	this.loadUserInfo = async function () {
		console.log('app.storage()', app.storage());
		this.userInfo = app.storage().userInfo;
	};
	this.clear = function () {
		this.userInfo = null;
	};
};

export default new TodoStore();
