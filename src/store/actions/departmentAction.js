import * as types from '../mutations-types';
const departmentAction = {
	query_department_list: (payload) => {
		return {
			type: types.QUERY_DEPARTMENT_LIST,
			payload
		}
	}
}

export default departmentAction;