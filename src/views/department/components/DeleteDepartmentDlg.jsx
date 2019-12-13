import React, {Component} from 'react';
import {Icon, message} from 'antd';
import Dialog from '../../../components/modal/Modal';
import DepartmentApi from '../departmentApi';

class DeleteDepartmentDlg extends Component {
	constructor(props) {
		super(props)
		this.state = {
			visible: false
		}
	}
	
	handleCanCel = () => {

	}
	
	hanleConfirm = () => {
		DepartmentApi.deleteDepartmentTree({ids: this.props.message.checkedKeys.join(',')})
		.then(() =>{
			message.info('删除成功')
			this.props.close();
		})
		.catch(() =>{
			message.error('删除失败')
			this.props.close();
		})
	}

	componentDidUpdate(prevProps) {
    if(this.props.visible !== prevProps.visible) {
      this.setState({
				visible: this.props.visible
			})
		}
	}

	render() {
		return (
			<Dialog title='删除部门' 
							visible={this.state.visible} 
							onClose={() => this.props.close()}
							close={() => this.setState({visible: false})}
							onOk={this.hanleConfirm}>
								<div className='confirm_description'>
									确定要删除以下{this.props.message.checkedKeys.length}条数据吗?
								</div>
								<div className='confirm_option_name'>
									{
										this.props.message.checkedList.map((it, index) => {
											return (
											<span className='confirm_option_name_item' key={index}>
												<Icon type="user"/>
											  <span className='confirm_option_name_item_title'>{it.props.title}</span>
											 </span>
											)
										})
									}
								</div>
							</Dialog>
		)
	}
}

export default DeleteDepartmentDlg;