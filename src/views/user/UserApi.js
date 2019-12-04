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
  },

  deleteUsers(param) {
    return HttpAPI.delete('/users/user', {ids:param})
  },

  updateStatus(param) {
    return HttpAPI.put('/users/user/status', param);
  },

  uploadAvatar(param) {
    return HttpAPI.upload('/users/upload', param);
  }
};

export default UserAPI;
