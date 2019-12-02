import * as types from '../mutations-types';

const userAction = {
   query_user_list: (payload) => {
     return {
       type: types.QUERY_USER_LIST,
       payload
     }
   }
}

export default userAction;