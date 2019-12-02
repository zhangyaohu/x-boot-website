import 'whatwg-fetch';
import HttpAPI from '../../http/http';
import userAction from '../../store/actions/userAction';

let UserAPI = {
  queryUserList() {
    return  userAction.dispatchAsync( HttpAPI.get('/api/users/user'))
  },

  queryDetailUser(param) {
    return HttpAPI.get('/api/users/user', param)
    .then((resp) => resp);
  }
};

export default UserAPI;
