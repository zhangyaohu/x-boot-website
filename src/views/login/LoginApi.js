import Http from '../../http/http';

const LoginApi = {
	getVerify: () => {
    return Http.get('/verifyCode');
	}
}

export default LoginApi;