import Http from '../../http/http';

const LoginApi = {
	getVerify: () => {
    return Http.get('/logins/verifyCode');
	},
  login: (param) => {
		return Http.post('/logins/login',param);
	}
}

export default LoginApi;