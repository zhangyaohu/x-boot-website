import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input, Table, Pagination} from 'antd';
import style from './user.less';
import Search from 'antd/lib/input/Search';

export default class User extends Component {
	constructor (props) {
    super(props);
    this.state = {
      showAdvice: false,
      dataSource:[],
    }
	}
  
  handleSelected = () => {

  }
  
  handleShowAdvice = () => {
    this.setState({
      showAdvice: !this.state.showAdvice
    })
  }

  handleSizeChange = () => {

  }

  handleCurrentPageChange = () => {

  }

	render() {
    const menu = (
      <Menu onClick={this.handleSelected}>
        <Menu.Item key="1">刷新</Menu.Item>
        <Menu.Item key="2">重置用户密码</Menu.Item>
        <Menu.Item key="3">导出所选数据</Menu.Item>
        <Menu.Item key="3">导出全部数据</Menu.Item>
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
              <span className={style.input_label}>用户名称</span> 
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
			  <div className="advice-search" className={this.state.showAdvice ? style.show : style.hidden}>
           <div className={style.advice_search_content}>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>部门</span>
               <Input className={style.advice_search_input}/>
             </div>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>邮箱</span>
               <Input className={style.advice_search_input}/>
             </div>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>用户类型</span>
               <Input className={style.advice_search_input}/>
             </div>
           </div>
           <div className={style.advice_search_content}>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>邮箱</span>
               <Input className={style.advice_search_input}/>
             </div>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>手机号</span>
               <Input className={style.advice_search_input}/>
             </div>
             <div className={style.advice_search_item}>
               <span className={style.input_label}>性别</span>
               <Input className={style.advice_search_input}/>
             </div>
           </div>
           <div className={style.advice_search_content}>
              <div className={style.advice_search_item}>
                <span className={style.input_label}>创建时间</span>
                <Input className={style.advice_search_input}/>
             </div>
           </div>
        </div>
        <div className='page-table-content'>
          <div>
           <Table columns={columns} dataSource={this.state.dataSource}/>
          </div>
          <div class="page-table-pagination">
            <Pagination
              showSizeChanger
              onShowSizeChange={this.handleSizeChange}
              current={3}
              total={500}
              onChange={this.handleCurrentPageChange}
            />
          </div>
        </div>
      </div>
		)
	}
}