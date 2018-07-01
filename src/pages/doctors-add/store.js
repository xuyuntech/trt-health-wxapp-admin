import moment from 'moment';
import { REGISTER_STATE } from '../../const';
import {extendObservable} from '../../libs/mobx';
// var extendObservable = require('../../libs/mobx').extendObservable;

/*
	左松青
	副主任医师, 北京专家
	毕业于首都医科大学，从事中医临床工作30 余年。精于中医内科，妇科、外科常见病、多发病等疑难杂症。
	尤其在治疗心脑血管病、糖尿病、脾胃病、肝胆病、肿瘤化疗后康复、脑供血不足、压力综合症、骨性关节病、痛经、月经不调、带下病、不孕不育症、胎前产后、更年期综合征及皮肤病、痤疮等有丰富的临床诊疗经验和显著疗效。
*/

var TodoStore = function () {
	this.editMode = false;
	this.id = '';
	extendObservable(this, {
		name: 'songqing.zuo',
		realName: '左松青',
		age: '40',
		phone: '123132',
		gender: '女',
		title: '副主任医师, 北京专家',
		description: '毕业于首都医科大学，从事中医临床工作30 余年。精于中医内科，妇科、外科常见病、多发病等疑难杂症。',
		skilledIn: '尤其在治疗心脑血管病、糖尿病、脾胃病、肝胆病、肿瘤化疗后康复、脑供血不足、压力综合症、骨性关节病、痛经、月经不调、带下病、不孕不育症、胎前产后、更年期综合征及皮肤病、痤疮等有丰富的临床诊疗经验和显著疗效。',
		genderShow: false,
	});
	this.genderList = [
		{name: '请选择', value: 'UNKNOW'},
		{name: '男', value: 'MALE'},
		{name: '女', value: 'FEMALE'},
	];
	// action
	this.clear = function () {
		Object.assign(this, {
			name: '',
			realName: '',
			age: '',
			phone: '',
			gender: '请选择',
			title: '',
			description: '',
			skilledIn: '',
		});
	};
};

export default new TodoStore();
