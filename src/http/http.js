import axios from 'axios';

let config = {
	baseURL: '/api',
	transformRequest: [
		function (data) {
			if(config.method === 'get' || config.method == 'delete') {
				let  ret = '';
				for (let it in config.params) {
					ret += it + '=' + data[it] + '&'
				}
				return ret;
			}
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
	responseType: 'json',
};

axios.interceptors.request.use((config) => {
	return config;
})

// axios.interceptors.response = (res) => {
// 	if (res.status === 500) {

// 	}
// 	if(res.status === 200) {
// 		return res.data;
// 	}
// }

let HttpAPI = {
	get(url, params) {
		debugger;
	  return axios.get(url, Object.assign({} ,config , {params}))
	},

	post(url, config) {
		return axios.get(url, config)
	},

	put(url, config) {
		return axios.put(url, config)
	},

	delete(url, params) {
		return axios.delete(url, Object.assign({} ,config , {params}))
	}
};

export default HttpAPI;