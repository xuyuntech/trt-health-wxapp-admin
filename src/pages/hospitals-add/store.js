import {extendObservable} from '../../libs/mobx';
// var extendObservable = require('../../libs/mobx').extendObservable;

/*
	name: '北京同仁堂唐山中医医院',
	address: '唐山市路北区河东路三益楼5-12号',
	phone1: '0575',
	phone2: '5918781',
*/

var TodoStore = function () {
	this.editMode = false;
	this.id = '';
	extendObservable(this, {
		name: '',
		address: '',
		phone1: '',
		phone2: '',
		get phone() {
			if (this.phone1) {
				return this.phone1 + '-' + this.phone2;
			}
			return this.phone2;
		},
	});
	// action
	this.clear = function () {
		this.name = '';
		this.address = '';
		this.phone1 = '';
		this.phone2 = '';
	};
};

export default new TodoStore();
