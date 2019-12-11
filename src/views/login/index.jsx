
import React, {Component} from 'react';
import {Form, Input, Icon,  Button} from 'antd';
import style from './login.less';
import LoginApi from './LoginApi';

const FormItem = Form.Item;

 class Login extends Component {
  constructor (props) {
		super(props);
		this.state = {
			verifyCode: ''
		}
	}
	
	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if (!err) {
				let param = {
					username: values.username,
					password: values.password,
          verifyCode: values.verifyCode
				}
				LoginApi.login(param)
			   .then((resp) => {
           if(resp.data.status === '400') {
						this.refs.verifyCode.src = `/api/logins/verifyCode?t=${new Date().getTime()}`
					 }else {
						 this.props.history.push('/home')
					 }
				 })
      }
    });
	}
	
	validateName = (rule, value, callback) => {
		let regx = /^[a-zA-Zu\u4e00-\u9fa5][a-zA-Z\u4e00-\u9fa50-9-_]{0,16}[a-zA-Zu\u4e00-\u9fa5]$/;
		const { form } = this.props;
		if(!value) {
			callback('')
		}
		if (!regx.test(value)) {
			callback('请输入以字母汉字开头内含字母数字下划线中划线的2-18位字符')
		}
		callback();
	}

	validatePassword = (rule, value, callback) => {
		const { form } = this.props;
		if(!value) {
			callback('')
		}else if (value.length <2 || value.length > 18) {
			callback('请输入2-18位字符')
		}else callback();
	}

	componentDidMount () {
	
	}
	

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
		console.log(this.state.verifyCode);
		return (
			<div className={style.container}>
				<div className={style.content}>
					<div className={style.title}>x-boot 管理系统</div>
			   	<Form onSubmit={this.handleSubmit} className={style.formContainer}>
            <FormItem>
								{getFieldDecorator('username', {
								 rules: [{required: true, message: '请输入用户名!'},
                        {
                            validator: this.validateName,
												}
									]
							})(
								<Input
									prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
									placeholder="请输入用户名"
								/>,
							)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('password', {
									rules: [{ required: true, message: '请输入密码' },  {
										validator: this.validatePassword,
								}],
								})(
									<Input
									  type="password"
										prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
										placeholder="请输人密码"
									/>,
								)}
						</FormItem>
						<FormItem>
							{getFieldDecorator('verifyCode', {
									rules: [{ required: true, message: '请输入验证码' },  {
										validator: this.validateCode,
								}],
								})(
									<div>
										<Input className={style.verify_input}
									  type="text"
										placeholder="请输入验证码"
									/>
									<div className={style.verfy_code}>
								   <img src="/api/logins/verifyCode" alt="captcha" ref="verifyCode" onClick={() => this.refs.verifyCode.src = `/api/logins/verifyCode?t=${new Date().getTime()}`}/>
								 </div>
									</div>
								)}
						</FormItem>
					  <FormItem>
							<Button type="primary" htmlType="submit" className={style.submitBtn}>
								登录
							</Button>
            </FormItem>
					</Form>
				</div>
			</div>
		)
	}
}

const LoginForm = Form.create({ name: 'Login' })(Login);

export default LoginForm;