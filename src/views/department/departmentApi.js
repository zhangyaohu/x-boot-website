import HttpAPI from '../../http/http';

let DepartmentApi = {
  getAllDepartment: (params) => {
		return  HttpAPI.get('/department/all', params)
		.then((resp) => {
			return resp
		})
	},

	getParent: (param) => {
		return HttpAPI.get(`/department/get-parent/${param}`)
		.then((resp) => {
			 return resp 
		})
	}
}

export default DepartmentApi;