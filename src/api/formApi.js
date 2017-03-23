import baseApi from './baseApi';

export const formApi = {
	getFormData() {
		return baseApi.ajax({
			method: 'get',
			url: '/api/form'
		});
	},

	postFormData(data) {
		return baseApi.ajax({
			method: 'post',
			url: '/api/form',
			data
		});
	}
};
