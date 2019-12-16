import Http from '../../http/http';
import axios from 'axios';

const HomeApi = {
	queryUser: () => {
		return Http.get('/users/user')
		         .then((resp) => {
							 return resp.data.data;
						 });
	},

	queryDepartment: () => {
		return Http.get('/department/all')
		.then((resp) => {
			return resp.data.data;
		});
	},

	queryMetric: () => {
		return axios.get('/homeApi.json', {
			transformRequest: [
				function (data) {
						let  ret = '';
						for (let it in data) {
							ret += it + '=' + data[it] + '&'
						}
						return ret;
				}
			],
			transformResponse: [
				function (data) {
					return data
				}
			],
			headers: {
				'Content-Type': 'application/x-text;charset=UTF-8'
			},
			timeout: 10000,
			responseType: 'json',
		})
		.then((resp) => {
			return resp.data.results[0].returnWith;
		})
	}
}

export default HomeApi;