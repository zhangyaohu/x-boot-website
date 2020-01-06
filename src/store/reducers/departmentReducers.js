import * as types from '../mutations-types';
let initialState = {
	departmentList:[]
}

const departmentReducers = (state = initialState.departmentList, action) => {
	switch (action.type) {
		case types.QUERY_DEPARTMENT_LIST:
			return Object.assign(state, [...action.payload.data]);
		case types.USER_DELETE:
			return Object.assign(state, ...action.payload)
		case types.USER_UPDATE_STATUS:
			return action.payload;
		case types.USER_UPLOAD_IMAGE:
			return action.payload;
		default:
			return state;
	}
}

export default departmentReducers;