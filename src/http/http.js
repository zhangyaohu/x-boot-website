import axios from 'axios';

let config = {
	baseURL: '/api',
	transformRequest: [
		function (data) {
			let ret = '';
			for (let it in data) {
				ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
			}
			return ret
		}
	],
	transformResponse: [
		function (data) {
			return data
		}
	],
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	timeout: 10000,
	responseType: 'json'
};

// axios.interceptors.request = (req) => {

// }

// axios.interceptors.response = (res) => {
// 	if (res.status === 500) {

// 	}
// 	if(res.status === 200) {
// 		return res.data;
// 	}
// }

let HttpAPI = {
	get(url, config) {
	  return axios.get(url, config)
	},

	post(url, config) {
		return axios.get(url, config)
	},

	put(url, config) {
		return axios.put(url, config)
	},

	delete(url, config) {
		return axios.delete(url, config)
	}
};

export default HttpAPI;