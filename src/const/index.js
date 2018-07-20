
export const FUNCS = {
	ARRANGEMENT: '/pages/arrangement/index',
	REGISTER_HISTORY: '/pages/register-history/index',
	DOCTOR: '/pages/doctors/index',
	HOSPITAL: '/pages/hospitals/index',
	ADMIN: '/pages/hospital-admin/index',
};

// o Register // 挂号
//   o Visiting // 就诊中
//   o Finished // 已开处方
export const REGISTER_STATE = {
	Register: '已挂号',
	Visiting: '就诊中',
	Finished: '已开处方',
};

const BASE_URL = __DEV__ ? 'http://192.168.1.109:3002' : 'http://api.trt-health.xuyuntech.com';

export const API = {
	Users: {
		Login: () => `${BASE_URL}/auth/users/login`,
		Logout: () => `${BASE_URL}/auth/users/logout`,
	},
	VerifyRegisterAction: {
		Verify: (id) => `${BASE_URL}/register_history/verify/${id}`,
		Finish: (id) => `${BASE_URL}/register_history/finish/${id}`,
	},
	ArrangementHistory: {
		Create: () => `${BASE_URL}/arrangement_history`,
		Query: () => `${BASE_URL}/arrangement_history`,
		QueryAll: () => `${BASE_URL}/arrangement_history/all`,
		FindByID: (id) => `${BASE_URL}/arrangement_history/${id}`,
		Cancel: (id) => `${BASE_URL}/arrangement_history/${id}/cancel`,
	},
	RegisterHistory: {
		Query: () => `${BASE_URL}/register_history`,
		FindByID: (id) => `${BASE_URL}/register_history/${id}`,
	},
	Department1: {
		Query: () => `${BASE_URL}/department1`,
	},
	Department2: {
		Query: () => `${BASE_URL}/department2`,
		FindByID: (id) => `${BASE_URL}/department2/${id}`,
		QueryDoctors: (id) => `${BASE_URL}/department2/${id}/doctors`,
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
	HospitalAdmin: {
		Query: () => `${BASE_URL}/hospital_admin`,
		Update: (name) => `${BASE_URL}/hospital_admin/${name}`,
		Create: () => `${BASE_URL}/hospital_admin`,
		FindByName: (name) => `${BASE_URL}/hospital_admin/${name}`,
	},
};
