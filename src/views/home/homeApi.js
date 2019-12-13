import Http from '../../http/http';
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
		});;
	}
}

export default HomeApi;