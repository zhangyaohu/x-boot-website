import React, {Component} from 'react';
import { Button, Icon, Dropdown, Menu, Input } from 'antd';
import style from './user.less';

export default class User extends Component {
	constructor (props) {
    super(props);
    this.state = {
      showAdvice: false
    }
	}
  
  handleSelected = () => {

  }
  
  handleShowAdvice = () => {
    this.setState({
      showAdvice: !this.state.showAdvice
    })
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
                  <Icon type="caret-down" />
                </Button>
              </Dropdown>
           </div>
           <div className='page-toolbar-right'>
              <span>用户名称:</span> 
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
			</div>
		)
	}
}