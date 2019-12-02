import 'whatwg-fetch';
import HttpAPI from '../../http/http';

let UserAPI = {
  queryUserList(params) {
    return  HttpAPI.get('/users/user', params)
       .then((resp) => resp)
  },

  queryDetailUser(param) {
    return HttpAPI.get('/users/user', param)
    .then((resp) => resp);
  }
};

export default UserAPI;
