import React, {Component} from 'react';
import Dialog from '../../../components/modal/Modal';
import {Form, Input, InputNumber, Switch, message} from 'antd';
import DepartmentApi from '../departmentApi';
const Item = Form.Item;

class AddDepartmentChildDlg extends Component{
	constructor(props) {
		super(props);
		this.state = {
			visible: false,
			parentId: '',
      sortOrder: 0,
      status: 1,
      title: '',
		}
	}
	
	handleConfirm = (e) => {
		e.stopPropagation();
		this.props.form.validateFields((err, values) => {
			if(!err) {
				let param = {
					'parent_id': this.props.message.type === 'addParent' ?  values.parentId : 0 ,
					'sort_order': values.sortOrder,
					'status': values.status,
					'title': values.title
				}
				DepartmentApi.addParent(param)
				 .then(() => {
					message.info('添加部门成功！');
					this.props.close();
				 }).catch(() => {
					message.error('添加部门失败！');
					this.props.close();
				 })
			}
		})
	}

	handleCancel = () => {

	}

	componentDidUpdate(prevProps) {
    if(this.props.visible !== this.state.visible) {
			this.setState({
				visible: this.props.visible
			})
		}
	}

	handleSwitch = (checked) => {
    this.setState({
			status: checked ? 1 : 0
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const formContainerSty = {
			'padding': '50px 100px'
		}
		const formItemLayout = {
      labelCol: {
        xs: { span: 12 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
		return (
			<Dialog visible={this.state.visible} 
			   title={'提示'} 
			   close={() => this.props.close()}
			   onOk={this.handleConfirm} 
			   onClose={() => this.props.close()}>
         <Form {...formItemLayout} style={formContainerSty}>
            {
							this.props.message.type === 'addParent' ?  <Item label="上级部门">
							{getFieldDecorator('parentId', {
								initialValue: this.props.message.type === 'addParent' ? this.props.message.parentId : 0,
								rules: [{ required: true}]
							})(<span>{this.props.message.parentTitle}</span>)}
						 </Item> : null
						}
					 <Item label="部门名称">
					   {getFieldDecorator('title', {
               rules: [{ required: true, message: '请输入部门名称'}]
						 })(<Input />)}
					 </Item>
					 <Item label="排序值">
					   {getFieldDecorator('sortOrder', {
							 initialValue: 0,
               rules: [{ required: true, message: '请输入排序值'}]
						 })(<InputNumber />)}
					 </Item>
					 <Item label="是否启用">
					   {getFieldDecorator('status', {
							initialValue: 1,
              rules: [{ required: true}]
						 })(<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.handleSwitch}/>)}
					 </Item>
				 </Form>
      </Dialog>
		)
	}
}

const AddDepartmentChildDlgForm = Form.create({name: 'addDepartmentChildDlg'})(AddDepartmentChildDlg)
export default AddDepartmentChildDlgForm;