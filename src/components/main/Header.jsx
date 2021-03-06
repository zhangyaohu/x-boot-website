import React, {Component} from 'react';
import style from './header.less';
import { Dropdown, Menu, Icon} from 'antd';

export default class Header extends Component {
  constructor(props) {
		super(props);
	}	

	handleSelected = (e) => {
    if(e.key === 'layout') {
			this.props.history.push('/login')
		}
	}
	
	handleFullScreen = (e) => {
		let isFullScreen = document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen,
		el = document.body ||document.documentElement;
		if(!isFullScreen) {
			(el.requestFullscreen&&el.requestFullscreen())||
			(el.mozRequestFullScreen&&el.mozRequestFullScreen())||
			(el.webkitRequestFullscreen&&el.webkitRequestFullscreen())||(el.msRequestFullscreen&&el.msRequestFullscreen());
		}else {
			if(document.exitFullscreen )
			 document.exitFullscreen() 
			 else if (document.mozCancelFullScreen)
				document.mozCancelFullScreen() 
			else  if(document.webkitExitFullscreen)
			  document.webkitExitFullscreen()
		}
	}

	render() {
		const {history} = this.props;
		const menu = (
			<Menu onClick={this.handleSelected}>
				<Menu.Item key="0">
					<a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
						1st menu item
					</a>
				</Menu.Item>
				<Menu.Item key="layout">
					退出
				</Menu.Item>
			</Menu>
		)
		return (
			<div className={style.header}>
				<div  className={style.header_left}></div>
				<div  className={style.header_right}
				      style={{'width': "calc(100% - 180px)"}}>
          <div className={style.header_right__left}></div>
					<div className={style.header_right__right}>
						<ul className={style.header_layout}>
							<li className={style.header_layout__item} onClick={this.handleFullScreen}>
						  	<Icon type="fullscreen" style={{fontSize: '16px', color: '#08c' }}/>
							</li>
							<li className={style.header_layout__item}>
							  <Icon type="global" />
							</li>
							<li className={style.header_layout__item}>
							  <Icon type="lock" />
							</li>
						</ul>
						<Dropdown overlay={menu} className={style.layout_content}>
						 <span className="ant-dropdown-link">
						   <Icon type="user" />
              </span>
						</Dropdown>
					</div>
				</div>
			</div>
		)
	}
}