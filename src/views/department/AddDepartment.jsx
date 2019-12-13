import React , {Component} from 'react';
import CreateTemplate from '../../components/create';
import style from './department.less';
import DepartmentApi from './departmentApi';
import HttpAPI from '../../http/http';
import AddDepartmentChildDlg from './components/AddDepartmentChildDlg';
import DeleteDepartmentDlg from './components/DeleteDepartmentDlg';
import UpdateDepartment from './components/UpdateDepartment';
import { Form, Input, Switch, Button, Select, Icon, message, Tree } from 'antd';

const TreeNode = Tree.TreeNode;
const { CreateHeader, CreateBody, CreateFooter } = CreateTemplate;

class AddDepartment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			canCreate: true,
			treeData: [],
			checkedKeys: [],
			selectedKeys: [],
			selectedList: {},
			isCheck: true,
			showDeleteDlg: false,
			showAddDepartmentChild: false,
			parentTitle: '',
			type: '',
			checkedList: []
		}
	}
	
	goBack = () => {
    this.props.history.push('/main/department');
	}
	
	queryParent = (param) => {
		this.setState({
			treeData: []
		 }, () => {
			DepartmentApi.getParent(param)
			.then((resp) => {
				 this.setState({
					treeData: resp.data.data
				 })
			})
		 })
	}
	componentDidMount() {
	  this.queryParent(0);
	}
	
	queryChildren = (param) => {
     new Promise((resolve, reject) => {
			return HttpAPI.get('/department/all', {id: param})
			.then((resp) => {
				return resolve(resp);
			}).catch(() => {
				return reject();
			})
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
		debugger;
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
	
	handleTreeCheck = (checkedKeys, e) => {
     this.setState({
			 checkedKeys,
			 checkedList: e.checkedNodes
		 })
	}

	handleTreeSelect = (selectedKeys, e) => {
		this.setState({
			selectedKeys,
			parentTitle: e.node.props.title,
			selectedList: e.node.props
		})
	}

	handleAddParent = () => {
		this.setState({
			showAddDepartmentChild: true,
			type: ''
		})
	}

	handleBatchDelete = () => {
    this.setState({
			showDeleteDlg: true
		})
	}
 
	handleAddChild = () => {
    this.setState({
			showAddDepartmentChild: true,
			type: 'addParent'
		})
	}

	handleSwitchChange = (checked) => {
    this.setState({
			isCheck: checked
		})
	}

	handleRefresh = () => {
		this.queryParent(0)
	}
	
	handleSubmit = () => {
    this.refs.update.validateFields((err, values) => {
       if(!err) {
				 let param = {
					 'parent_id':values.parent_id,
					 'sort_order': values.sortOrder,
					 'status': values.status,
					 'title': values.title
				 }
				 DepartmentApi.updateDepartment(param)
				  .then(() => {
						message.info('更新成功');
						this.props.history.push('/main/department');
					}).catch(() => {
						message.error('更新失败');
					});
			 }
		})
	}

	render() {
		const {treeData}  = this.state;
		const addStyle = {
			'height': 'calc(100vh - 260px)',
      'minHeight': '500px'
		}
		return (
			<div className='create-template-container'>
				<div className='create-template-content'>
					<CreateHeader title="添加部门" goBack={this.goBack} description='回到部门列表'></CreateHeader>
					<CreateBody>
						<div className={style.add_department__toolbar}>
						<Button type="primary" className='x-boot-btn' 
						        onClick={this.handleAddChild} disabled={this.state.selectedKeys.length<=0}>
                <Icon type="plus"/>
                  <span>添加子部门</span>
              </Button>
							<Button type="primary" className='x-boot-btn' onClick={this.handleAddParent}>
							  <Icon type="plus"/>
								  <span>添加一级部门</span>
								</Button>
              <Button type="danger" 
                      className='x-boot-btn'
											onClick={this.handleBatchDelete.bind(this)} 
											disabled={this.state.checkedKeys.length <=0}>
                <Icon type="delete" />
                  <span>批量删除部门</span>
              </Button>
							<Switch defaultChecked = {this.state.isCheck} 
											onChange={this.handleSwitchChange} 
											style={{'marginRight': '10px'}}
											checkedChildren="级联" 
											className='x-boot-btn'
											unCheckedChildren="单选"></Switch>
							<Button type="default" 
											onClick={this.handleRefresh.bind(this)}>
                <Icon type="redo" />
                  <span>刷新</span>
              </Button>
						</div>
						<div className={style.add} style={addStyle}>
						  <div className={style.add_left}>
								{
								 this.state.treeData.length ? (
									<Tree checkable={true}
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
							<div className='split-line'></div>
						  <div className={style.add_right}>
							  { /*修改部门*/}
						    <UpdateDepartment message={this.state.selectedList} ref="update"></UpdateDepartment>
							</div>
						</div>

					</CreateBody>
					<CreateFooter>
						<Button type="primary" 
										className={[this.state.canCreate ? 'confirm_btn' : 'disabled'].join(',')} 
										htmlType="submit" 
										onClick={this.handleSubmit}>确定</Button>
						<Button type="default" onClick={this.goBack}>取消</Button>
					</CreateFooter>
				</div>

				<AddDepartmentChildDlg visible={this.state.showAddDepartmentChild} 
				                       close={() => {
																 this.setState({showAddDepartmentChild: false});
																}}
															  message={{'parentId': this.state.selectedKeys, 'parentTitle': this.state.parentTitle, 'type': this.state.type}}
															 ></AddDepartmentChildDlg>
				
				<DeleteDepartmentDlg visible={this.state.showDeleteDlg} 
				                     close={() => {
															this.setState({showDeleteDlg: false});
														 }} 
															 message={
																{
																	'checkedKeys': this.state.checkedKeys,
																	'checkedList': this.state.checkedList
															   }
															 }
															 ></DeleteDepartmentDlg>
			</div>
		)
	}
}

export default AddDepartment;