import React, { Component } from 'react';
import CreateTemplate from '../../../components/create'
import { connect } from 'react-redux';
import { show_create_detail } from '../../../store/actions/menuAction';
import { Form, Input, Radio, Button, Select, Icon, Upload, Tooltip } from 'antd';
import UserApi from '../UserApi';
import style from './addUser.less';
const image = require('./logo192.png')

const { CreateHeader, CreateBody, CreateFooter } = CreateTemplate;
const Item = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option
class AddUser extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatar: ''
		}
	}

	goBack = () => {
		this.props.history.push(`/home/user`);
		this.props.isCreateOrDetail(false);
	}
	

	validateFiled = (rule, value, cb) => {
		if(!value){
				cb()
			}else if(rule.field === 'username') {
				if(!/^[a-zA-Z\u4e00-\u9fa5].{0,10}[a-zA-Z\u4e00-\u9fa5]$/.test(value)) {
					cb('用户名错误');
				}
			}else if(rule.field === 'password') {
			  if(value.length<6 || value.length > 18) {
          cb('请输入6~18位');
				}else{
					cb();
				}
		  }else if(rule.field === 'email') {
			  if(!/\w+@[a-z0-9]+\.[a-z]{2,4}/.test(value)) {
          cb('邮箱格式不正确')
				}else {
					cb();
				}
		  }else if(rule.field === 'phone') {
			  if(!/^[1][3,4,5,7,8][0-9]{9}$/.test(value)) {
          cb('手机号码不正确')
				}else {
					cb();
				}
		  } 
    console.log('rule ===' + rule + ' value===' + value + 'cb' +cb)
	}

	uploadAvatar = (e) => {
		e.stopPropagation();
		if (e.type === 'click') return;
		let formData = new FormData();
		formData.append('file', e.target.files[0]);
		UserApi.uploadAvatar(formData)
			.then(resp => {
				this.setState({
					avatar: resp.data
				})
			});
		var filereader = new FileReader();
		var fileType = this.refs.inputFile.input.files[0].type;
		filereader.onload = (event) => {
			if (/^image\[jpeg|png|gif]/.test(fileType)) {
				if(document.querySelector('#avatar')){
					document.querySelector('#avatar').style.backgroundImage = `url(${event.target.result})`;
				}
			}
		}
		filereader.readAsDataURL(this.refs.inputFile.input.files[0]);
	}

	handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
			debugger;
       if(!err) {
				 return {
					 username: values.username
				 }
			 }
		})
	}

	render() {
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 8 },
		};

		return (
			<div className='create-template-container'>
				<div className='create-template-content'>
					<CreateHeader title="添加用户" goBack={this.goBack} description='回到用户列表'></CreateHeader>
					<CreateBody>
						<Form {...formItemLayout} onSubmit={this.handleSubmit}>
							<Item label="用户名">
								{getFieldDecorator('username', {
									rules: [
										{
											required: true,
											message: '请输入用户名!',
										},
										{
											validator: this.validateFiled,
										},
									],
								})(<Input placeholder="请输入用户名" />)}
							</Item>
							<Item label="密码">
								{getFieldDecorator('password', {
									rules: [
										{
											required: true,
											message: '请输入用户密码!',
										},
										{
											validator: this.validateFiled,
										},
									],
								})(<Input.Password placeholder="请输入用户密码" />)}
							</Item>
							<Item label="邮箱">
								{getFieldDecorator('email', {
									rules: [
										{
											required: true,
											message: '请输入用户邮箱!',
										},
										{
											validator: this.validateFiled,
										},
									],
								})(<Input type='email' placeholder="请输入邮箱" />)}
							</Item>
							<Item label="手机号">
								{getFieldDecorator('phone', {
									rules: [
										{
											required: true,
											message: '请输入手机号码!',
										},
										{
											validator: this.validateFiled,
										},
									],
								})(<Input placeholder="请输入手机号" />)}
							</Item>
							<Item label="性别">
								{getFieldDecorator('sex', {
									rules: [
										{
											required: true,
											message: '请选择性别!',
										},
									],
								})(
									<RadioGroup>
										<Radio value="男">男</Radio>
										<Radio value="女">女</Radio>
									</RadioGroup>
								)}
							</Item>
							<Item label="头像">
								{getFieldDecorator('avatar')(
									<div>
										<Tooltip  title={
											<div className={style.avatar_icon}>
												<div className={style.avatarIcon} id="avatar"></div>
											</div>
										}>
										   <Input placeholder="请选择部门" readOnly style={{ 'width': '70%', 'margin-right': '10px' }} value={this.state.avatar} />
										</Tooltip>
										<Button type="primary"
										  	    className={style.upload_btn} onClick={this.uploadAvatar}>
											<Icon type="cloud-upload" className={style.upload_btn_icon} />
											<Input type="file" className={style.upload_btn_input} onChange={this.uploadAvatar} ref="inputFile" />
											<span className={style.upload_btn_text}>上传头像</span>
										</Button>

									</div>
								)}
							</Item>
							<Item label="所属部门">
								{getFieldDecorator('department')(
									<div>
										<Input placeholder="请选择部门" readOnly style={{ 'width': '70%', 'margin-right': '10px' }} />
									</div>
								)}
							</Item>
							<Item label="用户类型">
								{getFieldDecorator('type')(
									<div>
										<Select placeholder="请选择用户类型">
											<Option value="管理员">管理员</Option>
											<Option value="普通用户">普通用户</Option>
										</Select>
									</div>
								)}
							</Item>
							<Item label="角色分配">
								{getFieldDecorator('role')(
									<Select placeholder="请选择角色" mode="multiple">
										<Option value="ROLE_ADMIN">ROLE_ADMIN</Option>
										<Option value="ROLE_USER">ROLE_USER</Option>
										<Option value="ROLE_TEST">ROLE_TEST</Option>
									</Select>
								)}
							</Item>
						</Form>
					</CreateBody>
					<CreateFooter>
						<Button type="primary" className='confirm_btn' htmlType="submit" onClick={this.handleSubmit}>确定</Button>
						<Button type="default">取消</Button>
					</CreateFooter>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {

	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		isCreateOrDetail: (payload) => dispatch(show_create_detail(payload))
	}
}

const AddUserForm = Form.create({ name: 'AddUser' })(AddUser);
export default connect(mapStateToProps, mapDispatchToProps)(AddUserForm);