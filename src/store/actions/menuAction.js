import  * as types from '../mutations-types';

export const update_menu = (param) => {
	return {
		type: types.UPDATE_MUNU,
		param: param.item
	}
}

export const  reload_menu = (param) => {
	return {
		type: types.RELOAD_MENU,
		param: param.item
	}
}

export const show_create_detail = (param) => {
	return {
		type: types.SHOW_CRETE_DETAIL,
		param: param
	}
}