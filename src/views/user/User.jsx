import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input, Table, Pagination} from 'antd';
import PropTypes from 'prop-types';
import style from './user.less';
import  SerchBox from '../../components/searchbox/SearchBox';
import UserApi from './UserApi';
import { connect } from "react-redux";
import userAction from '../../store/actions/userAction';
import {formatDateTime} from '../../utils/utils';

class User extends Component {
	constructor (props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
      showAdvice: false,
      status: '',
      phone: '',
      email: '',
      role: '',
      status: '',
      date: '',
      userData: [],
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
          ellipsis: true
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
          ellipsis: true
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
          ellipsis: true
        },
        {
          title: '操作',
          dataIndex: 'actions',
          key: 'actions',
          ellipsis: true
        }
      ],
      loading: false,
      sortBy: 'create_time',
      sortDirection: '-',
      pageSize: 10,
      pageIndex: 1,
      total: 0
    }
	}
  
  handleSelected = () => {

  }
  
  handleShowAdvice = () => {
    this.setState({
      showAdvice: !this.state.showAdvice
    })
  }

  getSearchVal = (value, key) => {
    this.setState(async state => {
      state[key] = value;
      return  await {
        [key]: state[key]
      }
    });
  }

  handleSelection = () => {

  }
  
  componentDidMount(){
    UserApi.queryUserList({
      sort: `${this.state.sortDirection}${this.state.sortBy}`,
      pageSize: this.state.pageSize,
      pageIndex: this.state.pageIndex
    })
    .then((resp) => {
      this.props.queryUserList(resp.data);
      debugger;
      this.setState({
        userData: this.props.userData.data,
        total:  this.props.userData.total
      })
    })
  }

	render() {
    const { loading, selectedRowKeys } = this.state;
    console.log(this.props.userData)
    const menu = (
      <Menu onClick={this.handleSelected}>
        <Menu.Item key="1">刷新</Menu.Item>
        <Menu.Item key="2">重置用户密码</Menu.Item>
        <Menu.Item key="3">导出所选数据</Menu.Item>
        <Menu.Item key="4">导出全部数据</Menu.Item>
      </Menu>
    );
    const columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
      },
      {
        title: '所属部门',
        key: 'department',
        dataIndex: 'department',
      },
      {
        title: '手机',
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action'
      },
    ]
    const rowSelection = {
      selectedRowKeys,
      onChange: this.handleSelection,
    };
		return (
			<div className='page-container'>
			  <div className='page-toolbar'>
           <div className='page-toolbar-left'>
              <Button type="primary" className='x-boot-btn'>
                <Icon type="plus"/>
                  <span>添加用户</span>
              </Button>
              <Button type="default" className='x-boot-btn'>
                <Icon type="delete"/>
                  <span>删除用户</span>
              </Button>
              <Dropdown overlay={menu}>
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
                     className={style.user_input} placeholder='请输入用户名称'/>
              <Button icon="search" 
                      type='primary' 
                      className='x-boot-btn' 
                      style={{'marginLeft': '10px'}}>搜索</Button>
              <Button className='x-boot-btn'>重置</Button>
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
                    setSearchVal={this.getSearchVal.bind(this)}></SerchBox>
        </div>

        <div className='page-table-contaienr'>
          <Table rowSelection={rowSelection} columns={this.state.columns} loading={loading} dataSource={this.state.userData} bordered></Table>
        </div>
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
   userData: state.userData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    queryUserList: (payload) => dispatch(userAction.query_user_list(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);