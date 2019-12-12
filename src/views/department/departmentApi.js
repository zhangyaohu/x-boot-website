import HttpAPI from '../../http/http';

let DepartmentApi = {
  getAllDepartment: (params) => {
		return  HttpAPI.get('/department/all', params)
		.then((resp) => {
			return Promise.resolve(resp)
		})
	},

	getParent: (param) => {
		return HttpAPI.get(`/department/get-parent/${param}`)
		.then((resp) => {
			 return resp 
		})
	},

	deleteDepartment: (params) => {
		return HttpAPI.delete(`/department/delete`, params);
	},

	addParent: (params) => {
    return HttpAPI.post('/department/add', params);
	}
}

export default DepartmentApi;