import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { update_menu } from '../../store/actions/menuAction';
import style from './menu.less';
import {Icon} from 'antd';

class Menu extends Component{
   constructor(props) {
		 super(props);
		 this.state = {
			menuList: []
		 }
	 }
	 
	 updateMenu = () => {

	 }
	 
	 changeRoute = (item) => {
		 if(item.type === 'button') return;
		 if(item.type === 'link') 
		 this.props.histroy.push(item.path);
	 }

	 getDom = (menuList) => {
		 return menuList.map((item, index) => {
			return  (<div key={index}>
					{ 
					item.children.length === 0 
					?
					(
				  item.type === 'button' ? 
					<div className={style[`menu_item_1`],style.menu_item}>
							<Icon type={item.icon}/>	
							 {item.title}
					</div> 
					: 
					<div onClick={this.changeRoute(item)} className={style[`menu_item_1`],style.menu_item}>
				   	<Icon type={item.icon}/>	 {item.title}
				   </div> 
					)
					: 
					this.getDom(item.children)}
			</div>)
		 })
	 }
	 render () {
		 let {menuList} = this.props;
		 return (
	     <div className={style.menu}>
				 {
           this.getDom(menuList)
				 }
			 </div>
		 )
	 }
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
    menuList: state.menuList
	}
}

const mapDispatchToProps = (dispatch) => {
  return {
		updateMenu: dispatch(update_menu('update_menu'))
	}
}

Menu.propTypes = {
  menuList: PropTypes.array.isRequired,
  updateMenu: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);