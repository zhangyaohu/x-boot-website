import * as types from '../mutations-types';
let initialState = {
	department: [],
	userList: []
}

const dbReducers = (state = initialState, action) => {
	switch (action.type) {
		case types.UPDATE_DB_OBJ:
		return {...state, [action.payload.tableName]: [...action.payload.list]}
		default: 
		  return state;
	}
}

export default dbReducers;