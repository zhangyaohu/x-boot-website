import * as types from '../mutations-types';
let initialState = {
	state: {

	}
}

const userReducers = (state = initialState.state, action) => {
	switch (action.type) {
		case types.QUERY_USER_LIST:
			console.log(action.payload);
			return action.payload;
		case types.USER_DELETE:
			return action.payload;
		case types.USER_UPDATE_STATUS:
			return action.payload;
		default:
			return state;
	}
}

export default userReducers;