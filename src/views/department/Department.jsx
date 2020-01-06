import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input, Table, Pagination} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DepartmentApi from './departmentApi';
import dbAction from '../../store/actions/dbAction';
import { formatDateTime } from '../../utils/utils';
import Dialog from '../../components/modal/Modal';
import style from './department.less'

class Department extends Component {
	constructor (props) {
		super(props);
		this.state = {
			showAdvice: false,
			title:  '',
			sortDirection: '-',
			sortBy: 'create_time',
			departmentData: [],
			selectedRowKeys: [],
			selectedRow: [],
			total: 0,
			loading: false,
			pageIndex: 1,
			pageSize: 10,
			visible: false,
			columns: [
				{
          title: '部门名称',
          dataIndex: 'title',
          key: 'title',
					ellipsis: true,
					sorter: true
				},
				{
          title: '父部门',
          dataIndex: 'parent_id',
          key: 'parent_id',
					ellipsis: true
				},
				{
          title: '创建时间',
          dataIndex: 'create_time',
          key: 'create_time',
					ellipsis: true,
					sorter: true,
					render: text => formatDateTime(text, 'yyyy-MM-dd hh:mm:ss')
        },
			]
		}
	}

	handleSearch = () => {
		let searchParam = {
      'title': this.state.title
    }
    this.queryList(searchParam);
	}

	resetSerch = () => {
    this.setState({
			"title": ''
		}, () => {
			this.queryList();
		})
	}
	 //查询表格数据
	 queryList = (param) => {
    this.setState({
			loading: true,
			selectedRowKeys: [],
			selectedRow: [],
    })
    DepartmentApi.getAllDepartment(Object.assign({}, param, {
      sort: `${this.state.sortDirection}${this.state.sortBy}`,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex
    }))
    .then((resp) => {
			this.props.queryDepartmentList({
				tableName: 'department',
				list: resp.data.data
			})
				this.props.departmentData.forEach(it => {
					DepartmentApi.getParent(it.parent_id)
					.then((parentResp) => {
						it.parent_id = parentResp.data.data[0].title
					})
					.then(() => {
						this.setState({
							departmentData: this.props.departmentData,
							total:  this.props.departmentData.total,
							loading: false,
							selectedRowKeys: [],
						})
					})
				})
    })
	}
	
	handleSizeChange = (current, size) => {
   this.setState({
		 pageSize: size
	 }, () => {
		 this.queryList()
	 })
	}
	
	handlePageIndexChange = (current, size) => {
		this.setState({
			pageIndex: current
		}, () => {
			this.queryList()
		})
	}

	componentDidMount() {
	  this.queryList();
	}

  //多选操作
  handleSelection = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRow: selectedRows,
      selectedRowKeys: selectedRowKeys
    })
  }
	
	//更多操作根据key值来做相应的操作
	handleSelected = (e) => {
		switch(e.key) {
      case 'refresh':
        this.refresh();
        break;
    }
	}
  //刷新
	refresh = () => {
		this.setState({
			pageIndex: 1
		}, () => {
			this.queryList()
		})
	}
	
	//弹框确定按钮
	handleConfirm = () => {
		let ids = this.state.selectedRow.map(it => {
			return it.id;
		})
		DepartmentApi.deleteDepartment({ids: ids.join(',')})
		.then(() => {
			this.queryList();
		})
		this.handleCancel();
	}
	//打开弹框
	handleBatchDelete = () => {
		this.setState({
			visible: true
		})
	}

	handleCancel = () => {
   this.setState({
		 visible: false
	 })
	}
	
	//跳转到添加页面
	handleAdd = () => {
		debugger;
    this.props.history.push(`/main/add-department`)
	}

	handleTableChange = (pagination, filters, sorter) => {
		let {order, field, columnKey} = sorter;
		this.setState({
			sortDirection: order === "ascend" ? '-' : '+',
			sortBy: columnKey
		})
		this.queryList();
	 }

	render() {
		const {
			     columns,
			     departmentData, 
					 total, 
					 loading, 
					 pageIndex, 
					 selectedRowKeys, 
					 selectedRow,
					 visible} = this.state;
		const menu = (
      <Menu onClick={this.handleSelected}>
        <Menu.Item key="refresh">刷新</Menu.Item>
      </Menu>
		);
		
		const rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        this.handleSelection(selectedRowKeys, selectedRows); 
      }
    };
		return (
			<div className='page-container'>
			  <div className='page-toolbar'>
           <div className='page-toolbar-left'>
							<Button type="primary" 
											className='x-boot-btn' 
											onClick={this.handleAdd}>
                <Icon type="plus"/>
                  <span>添加部门</span>
              </Button>
							<Button type="default" 
											className='x-boot-btn'
											onClick={this.handleBatchDelete}
											disabled={selectedRow.length<=0}
                      >
                <Icon type="delete"/>
                  <span>批量删除部门</span>
              </Button>
              <Dropdown overlay={menu} >
                <Button>
                  <Icon type="dash"/>
                  <span>更多操作</span>
                  <Icon type="caret-down"/>
                </Button>
              </Dropdown>
           </div>
           <div className='page-toolbar-right'>
					  <span style={{'paddingRight': '10px'}}>部门名称  </span> 
              <Input type="text" 
                     className={style.user_input} 
                     placeholder='请输入部门名称' 
                     value={this.state.title} 
                     onChange={(e) => this.setState({title: e.target.value})}/>
              <Button icon="search" 
                      type='primary' 
                      className='x-boot-btn' 
                      style={{'marginLeft': '10px'}} 
                      onClick={this.handleSearch}>搜索</Button>
              <Button className='x-boot-btn' onClick={this.resetSerch}>重置</Button>
           </div>
        </div>

        <div className='page-table-contaienr'>
				  <Table rowSelection={rowSelection} 
                 columns={columns} 
                 loading={loading} 
								 dataSource={departmentData}
								 onChange={this.handleTableChange}
                 pagination={false} 
                ></Table>
          <div className='page-table-pagination'>
            <Pagination showSizeChanger
                         onShowSizeChange={this.handleSizeChange}
												 current={pageIndex}
												onChange={this.handlePageIndexChange}
                        total={total}></Pagination>
          </div>
        </div>
    
       {/*弹框*/}
			 <Dialog visible={visible} 
                title={'提示'} 
                close={() => this.setState({visible: false})}
                onOk={this.handleConfirm} 
                onClose={this.handleCancel}>
            <div className='confirm_description'>
              确定要删除以下{selectedRow.length}条数据吗?
            </div>
            <div className='confirm_option_name'>
              {
                selectedRow.map((it, index) => {
                  return (
                   <span className='confirm_option_name_item' key={index}><Icon type="user"/>{it.title}</span>
                  )
                })
              }
            </div>
        </Dialog>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		departmentData: state.dbObject.department
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
    queryDepartmentList: (payload) => {
				dispatch(dbAction.UPDATE_DB_OBJ(payload))
			}
		}
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)