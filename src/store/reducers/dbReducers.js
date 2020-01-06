import * as types from '../mutations-types';
let initialState = {
	department: []
}

const dbReducers = (state = initialState, action) => {
	switch (action.type) {
		case types.UPDATE_DB_OBJ:
			if (!state[action.payload.tableName]) state[action.payload.tableName] = {}
			Object.assign(state, {[action.payload.tableName]: [...action.payload.list]});
			return state;
		default: 
		  return state;
	}
}

export default dbReducers;