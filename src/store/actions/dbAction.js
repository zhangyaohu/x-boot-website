import * as types from '../mutations-types';
const dbAction = {
	[types.UPDATE_DB_OBJ]: (payload) => {
		return {
			type: types.UPDATE_DB_OBJ,
			payload
		}
	}
}

export default dbAction;