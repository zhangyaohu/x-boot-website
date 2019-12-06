import  React,{ Component} from 'react';
import Dialog from '../../../components/modal/Modal';
import UserApi from '../UserApi';
import {Form, Input} from 'antd';

class ResetPasswordDlg extends Component {
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			param: {

			}
		}
	}

	componentDidMount (){
    this.setState({
			param: this.props.param
		})
	}
	
	componentWillUpdate(prevProps) {
		if(prevProps.visible !== this.state.visible) {
			this.setState({
				visible:  this.props.visible
			})
		}
	}

	handleConfirm = () => {
		this.props.validateFeilds((err, values) => {
			if(!err) {
				let param  = {
					password: this.state.password,
					id: this.props.param.id
				}
				UserApi.resetPsw(param)
				 .then(() => {
					this.handleCancel();
				 });
			}
		})
	}

	handleCancel = () => {
    this.props.onClose();
	}

	validate = (rules, value, cb) => {
		const form = this.props.form;
    if(!value) {
			cb()
		}else if(rules.field === 'oldPsw') {
      if(value !== form.getFieldValue('oldPsw')) {
				cb('旧密码不正确')
			}else if(value.length > 18 || value.length < 6){
				cb('请输入6~18位字符');
			}else {
				cb();
			}
		}else if(rules.field === 'newPsw') {
			if(value !== form.getFieldValue('confirmPsw')) {
				cb('两次输入密码不一致')
			}else if(value.length > 18 || value.length < 6){
				cb('请输入6~18位字符');
			}else {
				cb();
			}
		}else if(rules.field === 'confirmPsw') {
			if(value !== form.getFieldValue('newPsw')) {
				cb('两次输入密码不一致')
			}else if(value.length > 18 || value.length < 6){
				cb('请输入6~18位字符');
			}else {
				cb();
			}
		}
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const dialogBodyStyle = {
			"padding": "30px 100px"
		}
		return (
			<Dialog visible={this.state.visible} 
			title={'提示'} 
			close={() => this.setState({visible: false})}
			onOk={this.handleConfirm} 
			onClose={this.handleCancel}>
         <div style={dialogBodyStyle}>
				 <Form>
					 <Form.Item label="旧密码">
					 {getFieldDecorator('oldPsw', {
									rules: [
										{
											required: true,
											message: '请输入用户密码!',
										},
										{
											validator: this.validate
										}
									],
								})(
									<Input.Password placeholder="请输入旧密码"/>
								)}
					 </Form.Item>
					 <Form.Item label="新密码">
					 {getFieldDecorator('newPsw', {
									rules: [
										{
											required: true,
											message: '请输入新密码!',
										},
									],
								})(
									<Input.Password placeholder="请输入新密码"/>
								)}
					 </Form.Item>
					 <Form.Item label="确认密码">
					 {getFieldDecorator('confirmPsw', {
									rules: [
										{
											required: true,
											message: '请输入密码!',
										},
										{
											validator: this.validate
										}
									],
								})(
									<Input.Password placeholder="请输入密码"/>
								)}
					 </Form.Item>
				 </Form>
				 </div>
      </Dialog>
		)
	}
}
 
const RestPswForm = Form.create({name: 'reset-form'})(ResetPasswordDlg)
export default RestPswForm;