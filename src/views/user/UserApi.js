import 'whatwg-fetch';
import HttpAPI from '../../http/http';

function getXhrObj() {
  let xhr;
  if(window.ActiveXObject) {
      xhr = new window.ActiveXObject('Microsoft.XMLHTTP');
  }else if(window.XMLHttpRequest){
    xhr  = new XMLHttpRequest();
  }
  return xhr;
}
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
    let xhr = getXhrObj();;
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4) {
          if(xhr.status == 200) {
            resolve(JSON.parse(xhr.response))
          }else{
            reject(reject(xhr.response));
          }
        }
      }
      xhr.open('post', '/api/users/upload');
      // xhr.setRequestHeader('Content-Type', 'multipart/form-data');
      xhr.send(param);
    })
  },

  AddUser(param) {
    return HttpAPI.post('/users/add', param);
  },

  resetPsw(param) {
    return HttpAPI.put('/users/updatePsw', param);
  }
};

export default UserAPI;
