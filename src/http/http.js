import axios from 'axios';

let config = {
	baseURL: '/api',
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
		'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
	},
	timeout: 10000,
	responseType: 'json',
};

axios.interceptors.request.use((config) => {
	return config;
})

axios.interceptors.response.use((res) => {
	debugger
		if (res.data && res.data.status && res.data.status === '500') {
	    return Promise.resolve(res.data);
		}else if(res.data && res.data.status && res.data.status === '200') {
		  return res;
		}else {
			return res;
		}
	}
)

let HttpAPI = {
	get(url, params) {
	  return axios.get(url, Object.assign({} ,config , {params}))
	},

	post(url, params) {
		return axios.post(url, params, config)
	},

	put(url, params) {
		return axios.put(url,params, config)
	},

	delete(url, params) {
		return axios.delete(url, Object.assign({} ,config , {params}))
	},

	upload(url, params) {
		return axios.post(url, params, config)
	}
};

export default HttpAPI;