import React, {Component} from 'react';
import CreateTemplate from '../../../components/create'
import {connect} from 'react-redux';
import { show_create_detail } from '../../../store/actions/menuAction';
import {Form, Input, Radio, Button, Select, Icon} from 'antd';
import UserApi from '../UserApi';
import style from './addUser.less';

const {CreateHeader, CreateBody, CreateFooter} = CreateTemplate;
const Item =  Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option
class AddUser extends Component {
	constructor(props) {
		super(props);
	}
	
	goBack = () => {
		this.props.history.push(`/home/user`);
		this.props.isCreateOrDetail(false);
	}
	
	validateFiled = () => {

	}
	 
	uploadAvatar = (e) => {
		e.stopPropagation();
		if(e.type === 'click') return;
		let formData = new FormData();
		formData.append('files', e.target.files[0]);
		console.log(formData.get('files').name)
		UserApi.uploadAvatar({file: formData.get('files')});
	}
	render () {
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
						<Form {...formItemLayout}>
              <Item label="用户名">
									{getFieldDecorator('username', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator: this.validateFiled,
											},
										],
									})(<Input placeholder="请输入用户名"/>)}
							</Item>
							<Item  label="密码">
							 {getFieldDecorator('password', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator:  this.validateFiled,
											},
										],
									})(<Input.Password placeholder="请输入用户密码"/>)}
							</Item>
							<Item label="邮箱">
							 {getFieldDecorator('email', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator:  this.validateFiled,
											},
										],
									})(<Input type='email' placeholder="请输入邮箱"/>)}
							</Item>
							<Item label="手机号">
							  {getFieldDecorator('phone', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator:  this.validateFiled,
											},
										],
									})(<Input placeholder="请输入手机号"/>)}
							</Item>
							<Item label="性别">
							{getFieldDecorator('sex', {
										rules: [
											{
												required: true,
												message: 'Please input your password!',
											},
											{
												validator:  this.validateFiled,
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
											<Input placeholder="请选择部门" readOnly style={{'width': '70%', 'margin-right': '10px'}}/>
											<Button type="primary" 
															className={style.upload_btn} onClick={this.uploadAvatar}>
												<Icon type="cloud-upload" className={style.upload_btn_icon}/>
												<Input type="file" className={style.upload_btn_input} onChange={this.uploadAvatar}/>
												<span className={style.upload_btn_text}>上传头像</span>
											</Button>
										</div>
									)}
							</Item>
							<Item label="所属部门">
							{getFieldDecorator('department')(
										<div>
											<Input placeholder="请选择部门" readOnly style={{'width': '70%', 'margin-right': '10px'}}/>
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
											<Select placeholder="请选择角色"  mode="multiple">
												<Option value="ROLE_ADMIN">ROLE_ADMIN</Option>
												<Option value="ROLE_USER">ROLE_USER</Option>
												<Option value="ROLE_TEST">ROLE_TEST</Option>
											</Select>
									)}
							</Item>
						</Form>
					</CreateBody>
				  <CreateFooter>
						<Button type="primary" className='confirm_btn'>确定</Button>
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