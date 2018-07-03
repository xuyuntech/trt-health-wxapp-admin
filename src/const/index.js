export const FUNCS = {
	ARRANGEMENT: '/pages/arrangement/index',
	REGISTER_HISTORY: '/pages/register-history/index',
	DOCTOR: '/pages/doctors/index',
	HOSPITAL: '/pages/hospitals/index',
};

// o Register // 挂号
//   o Visiting // 就诊中
//   o Finished // 已开处方
export const REGISTER_STATE = {
	Register: '已挂号',
	Visiting: '就诊中',
	Finished: '已开处方',
};

const BASE_URL = 'http://192.168.1.106:3002';

export const API = {
	Users: {
		Login: () => `${BASE_URL}/auth/users/login`,
	},
	ArrangementHistory: {
		Create: () => `${BASE_URL}/arrangement_history`,
		Query: () => `${BASE_URL}/arrangement_history`,
		QueryAll: () => `${BASE_URL}/arrangement_history/all`,
	},
	RegisterHistory: {
		Query: () => `${BASE_URL}/register_history`,
	},
	Department1: {
		Query: () => `${BASE_URL}/department1`,
	},
	Hospitals: {
		Query: () => `${BASE_URL}/hospital`,
		Update: () => `${BASE_URL}/hospital`,
		Create: () => `${BASE_URL}/hospital`,
		FindByID: (id) => `${BASE_URL}/hospital/${id}`,
	},
	Doctor: {
		Query: () => `${BASE_URL}/doctor`,
		Update: (name) => `${BASE_URL}/doctor/${name}`,
		Create: () => `${BASE_URL}/doctor`,
		FindByID: (id) => `${BASE_URL}/doctor/${id}`,
	},
};
