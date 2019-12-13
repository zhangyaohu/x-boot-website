import React, { Component } from 'react';
import DepartmentApi from '../departmentApi';
import style from './updateDepartment.less';
import { Form, Input, Switch, Button, Tree, Icon} from 'antd';

const TreeNode = Tree.TreeNode;
class UpdateDepartment extends Component {
	constructor(props) {
		super(props)
		this.state = {
			treeData: [{"parent_id":"0","title":"一级部门", "id": '一级部门'}],
			message: {},
			parentTitle: '',
			showTree: false
		}
	}

	handleTreeCheck = (checkedKeys, e) => {
		this.setState({
			checkedKeys,
			checkedList: e.checkedNodes
		})
 }

 handleTreeSelect = (selectedKeys, e) => {
	 this.setState({
		 selectedKeys,
		 parentTitle: e.node.props.title
	 })
 }

 onLoadData =  treeNode =>{
	if(treeNode.props.id){
		return 	DepartmentApi.getParent(treeNode.props.id)
		.then((resp) => {
			if (treeNode.props.children) {
				return Promise.resolve();
			}
				treeNode.props.dataRef.children = resp.data.data;
				this.setState({
						treeData: [...this.state.treeData],
					});
				return Promise.resolve();
			});
	}else {
		return Promise.resolve();
	}
}

renderTreeNodes = (treeData) => {
	return treeData.map(item => {
		if (item.children) {
			return (
				<TreeNode title={item.title} key={item.id} dataRef={item}>
					{this.renderTreeNodes(item.children)}
				</TreeNode>
			);
		 }
	 return <TreeNode key={item.id} title={item.title} {...item} dataRef={item} />;
	})
}

componentDidMount() {
	this.queryParent(0);
}

componentDidUpdate(prevProps) {
  if(prevProps.message !== this.props.message) {
		this.setState({
			message: this.props.message
		}, () => {
			DepartmentApi.getAllDepartment({id: this.props.message.parent_id})
			.then((resp) => {
				this.setState({
					'parentTitle': resp.data.data[0] && resp.data.data[0].title ? resp.data.data[0].title : '一级部门'
				})
				this.props.form.setFieldsValue({'parent_id': resp.data.data[0] ? resp.data.data[0].id : 0});
			})
			this.props.form.setFieldsValue({'title': this.state.message.title});
			this.props.form.setFieldsValue({'sortOrder': this.props.message.sort_order});
			this.props.form.setFieldsValue({'status': this.props.message.status === 1 ? true : false})
		})
	
	}
}

queryParent = (param) => {
	this.setState({
	
	 }, () => {
		DepartmentApi.getParent(param)
		.then((resp) => {
			 this.setState({
				treeData: [...this.state.treeData,...resp.data.data]
			 })
		})
	 })
}

 handleSwitch = (checked) => {
	this.props.form.setFieldsValue({'status': checked ? 1 : 0})
 }

	render() {
		const {treeData} = this.state
		const { getFieldDecorator, getFieldValue } = this.props.form;
		const formItemLayout = {
			labelCol: { span: 4 },
			wrapperCol: { span: 8 },
		};
		return (
			<Form {...formItemLayout}>
				<Form.Item label="上级部门">
					{getFieldDecorator('parent_id', {
			
					})(
						<div style={{'position': 'relative'}}>
							<Input style={{'width':'57%', 'marginRight': '10px'}} value={this.state.parentTitle}/>
							<Button icon="menu" onClick={() => this.setState({showTree: !this.state.showTree})}>
								选择部门
							</Button>
							<div className={style.tree} style={{'display': this.state.showTree ? 'block' : 'none'}}>
							 {
								 this.state.treeData.length ? (
									<Tree
										loadData={this.onLoadData}
										onCheck={this.handleTreeCheck}
										onSelect={this.handleTreeSelect}
										showIcon={true}>
										{this.renderTreeNodes(treeData)}
									</Tree>
								) : (
									  <Icon type="loading" />
									)}
							</div>
						</div>
					)}
				</Form.Item>
				<Form.Item label="部门名称">
					{getFieldDecorator('title', {
						rules: [
							{
								required: true,
								message: '部门名称不能为空!',
							},
						],
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="排序值">
					{getFieldDecorator('sortOrder',{
						rules: [
							{
								required: true,
								message: '排序值不能为空!',
							},
						],
					})(
						<Input />
					)}
				</Form.Item>
				<Form.Item label="是否启用">
					{getFieldDecorator('status')(
						<Switch checkedChildren="是" unCheckedChildren="否" defaultChecked onChange={this.handleSwitch}/>
					)}
				</Form.Item>
			</Form>
		)
	}
}

const UpdateDepartmentForm = Form.create({ name: 'updateDepartmentForm' })(UpdateDepartment);
export default UpdateDepartmentForm;