import * as types from '../mutations-types';

const userAction = {
   query_user_list: (payload) => {
     return {
       type: types.QUERY_USER_LIST,
       payload
     }
   },

   user_delete: (payload) => {
     return {
      type: types.USER_DELETE,
      payload
     }
   }
}

export default userAction;