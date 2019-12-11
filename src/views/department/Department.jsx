import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input, Table, Pagination} from 'antd';
import {connect} from 'react-redux';
import DepartmentApi from './departmentApi';
import DepartmentAction from '../../store/actions/departmentAction';
import { formatDateTime } from '../../utils/utils';
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
			total: 0,
			loading: false,
			pageIndex: 1,
			pageSize: 10,
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

	}

	resetSerch = () => {

	}
	 //查询表格数据
	 queryList = (param) => {
    this.setState({
      loading: true
    })
    DepartmentApi.getAllDepartment(Object.assign({}, param, {
      sort: `${this.state.sortDirection}${this.state.sortBy}`,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex
    }))
    .then((resp) => {
			this.props.queryDepartmentList(resp.data);
			this.props.departmentData.data.forEach(it => {
				DepartmentApi.getParent(it.parent_id)
				.then((parentResp) => {
					it.parent_id = parentResp.data.data[0].title
				})
				.then(() => {
					 this.setState({
          departmentData: this.props.departmentData.data,
          total:  this.props.departmentData.total,
          loading: false,
          selectedRowKeys: [],
         }) 
				})
			})
    })
	}
	
	componentDidMount() {
	  this.queryList();
	}

	render() {
		const {columns, departmentData, total, loading, pageIndex} = this.state;
		const menu = (
      <Menu >
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="resetPsw" >重置用户密码</Menu.Item>
        <Menu.Item key="export">导出所选数据</Menu.Item>
        <Menu.Item key="exportAll">导出全部数据</Menu.Item>
      </Menu>
		);
		
		return (
			<div className='page-container'>
			  <div className='page-toolbar'>
           <div className='page-toolbar-left'>
					    <Button type="primary" className='x-boot-btn'>
                <Icon type="plus"/>
                  <span>添加部门</span>
              </Button>
							<Button type="default" 
                      className='x-boot-btn'
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
				  <Table 
                 columns={columns} 
                 loading={loading} 
                 dataSource={departmentData} 
                 pagination={false} 
                ></Table>
          <div className='page-table-pagination'>
            <Pagination showSizeChanger
              
                        defaultCurrent={pageIndex}
                        total={total}></Pagination>
          </div>
        </div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		departmentData: state.departmentReducers
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		queryDepartmentList:  (payload) => dispatch(DepartmentAction.query_department_list(payload))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Department)