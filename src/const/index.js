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

const BASE_URL = 'http://192.168.1.186:3002';

export const API = {
	Users: {
		Login: () => `${BASE_URL}/auth/users/login`,
	},
	ArrangementHistory: {
		Create: () => `${BASE_URL}/arrangement_history`,
		Query: () => `${BASE_URL}/arrangement_history/`,
	},
	Hospitals: {
		Query: () => `${BASE_URL}/hospitals`,
		Update: () => `${BASE_URL}/hospitals`,
		Create: () => `${BASE_URL}/hospitals`,
		FindByID: (id) => `${BASE_URL}/hospitals/${id}`,
	},
	Doctor: {
		Query: () => `${BASE_URL}/doctor`,
		Update: (name) => `${BASE_URL}/doctor/${name}`,
		Create: () => `${BASE_URL}/doctor`,
		FindByID: (id) => `${BASE_URL}/doctor/${id}`,
	},
};
