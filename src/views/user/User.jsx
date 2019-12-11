import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input, Table, Pagination, Modal} from 'antd';
import PropTypes from 'prop-types';
import style from './user.less';
import  SerchBox from '../../components/searchbox/SearchBox';
import { show_create_detail } from '../../store/actions/menuAction';
import UserApi from './UserApi';
import { connect } from "react-redux";
import userAction from '../../store/actions/userAction';
import {formatDateTime, downFile} from '../../utils/utils';
import Dialog from '../../components/modal/Modal';
import ResetPasswordDlg from './components/ResetPasswordDlg';

class User extends Component {
	constructor (props) {
    super(props);
    this.state = {
      selectedRows: [],
      selectedRowKeys: [],
      showAdvice: false,
      status: '',
      phone: '',
      email: '',
      role: '',
      status: '',
      date: [],
      username:"",
      userData: [],
      batchSelect: [],
      visibleResetPsw: false,
      resetParam: {},
      searchConditionList: [
        {type: 'input', label: '手机号',  key: 'phone', value: ''},
        {type: 'input', label: '邮箱', key: 'email' , value: ''},
        {type: 'select', label: '性别', key: 'sex', value: [{label: '男', value: '0'}, {label: '女', value: '1'}]},
        {type: 'select', label: '用户类型', key: 'role', value: [{label: '普通用户', value: '0'}, {label: '管理员', value: '1'}]},
        {type: 'select', label: '用户状态', key: 'status', value: [{label: '正常', value: '0'}, {label: '禁用', value: '1'}]},
        {type: 'date', label: '创建日期', key: 'date', value: ''},
      ],
      columns: [
        {
          title: '用户名',
          dataIndex: 'username',
          key: 'username',
          ellipsis: true,
          sorter: true
        },
        {
          title: '头像',
          dataIndex: 'avatar',
          key: 'avatar',
          ellipsis: true
        },
        {
          title: '部门',
          dataIndex: 'department',
          key: 'department',
          ellipsis: true
        },
        {
          title: '手机',
          dataIndex: 'mobile',
          key: 'mobile',
          ellipsis: true,
          sorter: true
        },
        {
          title: '邮箱',
          dataIndex: 'email',
          key: 'email',
          ellipsis: true
        },
        {
          title: '性别',
          dataIndex: 'sex',
          key: 'sex',
          ellipsis: true
        },
        {
          title: '用户类型',
          dataIndex: 'role',
          key: 'role',
          ellipsis: true
        },
        {
          title: '状态',
          dataIndex: 'status',
          key: 'status',
          ellipsis: true
        },
        {
          title: '创建',
          dataIndex: 'create_time',
          key: 'create_time',
          render: text => formatDateTime(text, 'yyyy-MM-dd hh:mm:ss'),
          ellipsis: true,
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'actions',
          key: 'actions',
          ellipsis: true,
          fixed: 'right',
          width: 250,
          render: (text, rows) => (<div>
            <Button className={style.user_btn} 
                    icon={'edit'} 
                    type="primary" 
                    onClick={this.opreation.bind(this,'edit',rows)}>修改</Button>
            <Button className={style.user_btn} 
                    icon='delete' 
                    type="danger" 
                    onClick={this.opreation.bind(this,'delete',rows)}>删除</Button>
            <Button className={style.user_btn} 
                    icon='minus-circle' 
                    type="default" 
                    onClick={this.opreation.bind(this,'disable',rows)}>
                      {rows.status === 0 ? '禁用' : '启用'}
                    </Button>
          </div>)
        }
      ],
      loading: false,
      sortBy: 'create_time',
      sortDirection: '-',
      pageSize: 10,
      pageIndex: 1,
      total: 0,
      visible: false
    }
	}
  
  handleSelected = (e) => {
    switch(e.key) {
      case 'refresh':
        this.refresh();
        break;
      case 'resetPsw':
        this.resetPsw();
        break;
      case 'export':
        this.export();
        break;
      case 'exportAll':
        this.exportAll();
        break;
    }
  }
  //重置密码
  resetPsw = () => {
    this.setState({
      visibleResetPsw: true,
      resetParam: this.state.selectedRows[0]
    })
  }
  //导出所选数据
  export = () => {
    let exportObj = `用户名,头像,部门,手机,邮箱,性别,用户类型,状态,创建\n`;
   this.state.selectedRows.forEach((it) => {
     exportObj +=`${it.username},${it.avatar},${it.department},${it.phone},${it.email},${it.sex},${it.type === 0 ? '管理员' :'普通用户'}, ${it.state}, ${formatDateTime(it.create_time, 'yyyy-MM-dd hh:mm:ss')}\n`
   })
   downFile(`user-${formatDateTime(new Date(), 'yyyy-MM-dd hh:mm:ss')}.csv`, exportObj);
  }
  //导出全部数据
  exportAll = () => {
    this.export();
  }
  //刷新
  refresh = () => {
    this.setState({
      pageIndex: 1,
    })
    this.queryList();
  }
  //展示高级设置
  handleShowAdvice = () => {
    this.setState({
      showAdvice: !this.state.showAdvice
    })
  }
  //或得搜索数据
  getSearchVal = (value, key) => {
    this.setState(async state => {
      state[key] = value;
      return  await {
        [key]: state[key]
      }
    });
  }
 //表格操作
  opreation = (type, rows, e) => {
    switch(type) {
      case 'delete':
        this.setState({
          selectedRows: [rows]
        })
        this.handleBatchDelete(e);
        break;
      case 'disable': 
       this.handleUpdateSstatus(rows);
       break;
       case 'edit':
        this.props.history.push('/main/add-user', {user: rows})
        this.props.setCreateOrDetail(true);
       break;
    }
  }
  
  //停用 启用
  handleUpdateSstatus = (rows) => {
    let updateParam = {id: rows.id};
    if(rows.status === 0) {
      updateParam['status'] = 1;
    }else {
      updateParam['status'] = 0;
    }
    UserApi.updateStatus(updateParam)
    .then((resp) => {
       this.props.updateStatus(resp.data);
       this.queryList();
    })
  }

  componentDidMount(){
    this.queryList();
  }
  //查询表格数据
  queryList = (param) => {
    this.setState({
      loading: true
    })
    UserApi.queryUserList(Object.assign({}, param,{
      sort: `${this.state.sortDirection}${this.state.sortBy}`,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex
    }))
    .then((resp) => {
      this.props.queryUserList(resp.data);
      this.setState({
        userData: this.props.userData.data,
        total:  this.props.userData.total,
        loading: false,
        selectedRowKeys: [],
      })
    })
  }
  //多选操作
  handleSelection = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRows: selectedRows,
      batchSelect: selectedRows,
      selectedRowKeys: selectedRowKeys
    })
  }
  //批量删除用户
  handleBatchDelete = (e) => {
    e.stopPropagation();
    this.setState({
      visible: true
    })
  }
  //取消弹框
  handleCancel = (e) => {
    e.stopPropagation();
    this.setState({
      visible: false
    })
  }
  //确定删除提示
  handleConfirm = (e) => {

    e.stopPropagation();
    let idParams = this.state.selectedRows.map(it => {
      return it.id;
    })
    UserApi.deleteUsers(idParams.join(','))
    .then((resp) => {
      this.setState({
        visible: false
      })
      this.props.deleteUser(resp.data);
      this.queryList();
    })
  }

  handleSearch = (e) => {
    let searchParam = {
      'username': this.state.username,
      'phone': this.state.phone,
      'email': this.state.email,
      'sex': this.state.sex == 0 ? '男' : this.state.sex == 1 ? '女' : '',
      'start_time': this.state.date[0],
      'end_time': this.state.date[1],
      'role': this.state.role,
      'status': this.state.status
    }
    this.queryList(searchParam);
  }
 
  resetSerch = (e) => {
    this.setState({
      username:''
    })
    this.refs.search.handleReset(e);
    this.queryList();
  }
  
  handleTableChange = (pagination, filters, sorter) => {
   let {order, field, columnKey} = sorter;
   this.setState({
     sortDirection: order === "ascend" ? '-' : '+',
     sortBy: columnKey
   })
   this.queryList();
  }
 
  handleAddUser = () => {
    this.props.history.push('/main/add-user')
    this.props.setCreateOrDetail(true);
  }

	render() {
    const { loading, selectedRowKeys } = this.state;
    const menu = (
      <Menu onClick={this.handleSelected}>
        <Menu.Item key="refresh">刷新</Menu.Item>
        <Menu.Item key="resetPsw" disabled={this.state.selectedRows.length !== 1}>重置用户密码</Menu.Item>
        <Menu.Item key="export">导出所选数据</Menu.Item>
        <Menu.Item key="exportAll">导出全部数据</Menu.Item>
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
              <Button type="primary" className='x-boot-btn' onClick={this.handleAddUser}>
                <Icon type="plus"/>
                  <span>添加用户</span>
              </Button>
              <Button type="default" 
                      className='x-boot-btn'
                      onClick={this.handleBatchDelete.bind(this)} 
                      disabled={this.state.batchSelect.length<=0}>
                <Icon type="delete"/>
                  <span>批量删除用户</span>
              </Button>
              <Dropdown overlay={menu} 
                        disabled={this.state.selectedRows.length<=0}>
                <Button>
                  <Icon type="dash"/>
                  <span>更多操作</span>
                  <Icon type="caret-down"/>
                </Button>
              </Dropdown>
           </div>
           <div className='page-toolbar-right'>
              <span style={{'paddingRight': '10px'}}>用户名称  </span> 
              <Input type="text" 
                     className={style.user_input} 
                     placeholder='请输入用户名称' 
                     value={this.state.username} 
                     onChange={(e) => this.setState({username: e.target.value})}/>
              <Button icon="search" 
                      type='primary' 
                      className='x-boot-btn' 
                      style={{'marginLeft': '10px'}} 
                      onClick={this.handleSearch}>搜索</Button>
              <Button className='x-boot-btn' onClick={this.resetSerch}>重置</Button>
              <Button onClick={this.handleShowAdvice}>
                <span>
                高级搜索  
                </span>
                <Icon type="double-right" className={this.state.showAdvice ? style.advice_up : style.advice_down}/>
              </Button>
           </div>
        </div>
        <div className={['page-advice-search', `${this.state.showAdvice ? style.show : style.hidden}`].join(' ')}>
          <SerchBox searchConditionList={this.state.searchConditionList} 
                    setSearchVal={this.getSearchVal.bind(this)} 
                    ref='search'
                    ></SerchBox>
        </div>

        <div className='page-table-contaienr'>
          <Table rowSelection={rowSelection} 
                 columns={this.state.columns} 
                 loading={loading} 
                 dataSource={this.state.userData} 
                 pagination={false} 
                 onChange={this.handleTableChange}></Table>
          <div className='page-table-pagination'>
            <Pagination showSizeChanger
                        onShowSizeChange={this.handleSizeChange}
                        defaultCurrent={this.pageIndex}
                        total={this.state.total}></Pagination>
          </div>
        </div>
        <Dialog visible={this.state.visible} 
                title={'提示'} 
                close={() => this.setState({visible: false})}
                onOk={this.handleConfirm} 
                onClose={this.handleCancel}>
            <div className={style.description}>
              确定要删除以下{this.state.selectedRows.length}条数据吗?
            </div>
            <div className={style.confirm_option_name}>
              {
                this.state.selectedRows.map((it, index) => {
                  return (
                   <span className={style.confirm_option_name_item} key={index}><Icon type="user"/>{it.username}</span>
                  )
                })
              }
            </div>
        </Dialog>

        <ResetPasswordDlg visible={this.state.visibleResetPsw} 
                          onClose={() => this.setState({visibleResetPsw: false})} 
                          param={this.state.resetParam}></ResetPasswordDlg>
			</div>
		)
	}
}

User.propTypes = {
  userData: PropTypes.object,
  queryUserList: PropTypes.func
}

const mapStateToProps = (state) => {
  return {
   userData: state.userData,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryUserList: (payload) => dispatch(userAction.query_user_list(payload)),
    deleteUser: (payload) => dispatch(userAction.user_delete(payload)),
    updateStatus: (payload) => dispatch(userAction.user_update_status(payload)),
    setCreateOrDetail: (payload) => dispatch(show_create_detail(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);