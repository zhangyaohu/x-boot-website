import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { update_menu, reload_menu } from '../../store/actions/menuAction';
import style from './menu.less';
import {Icon} from 'antd';

class Menu extends Component{
   constructor(props) {
		 super(props);
		 this.state = {
			menuList: []
		 }
	 }
	 
	 
	 changeRoute = (item, event) => {
     event.stopPropagation() 
		 if(item.type === 'link') {
      this.props.histroy.push(item.path);
     }
     this.props.updateMenu(item);
     let newMenuList = this.props.menuList;
     this.setState({
      menuList: newMenuList
    })
	 }
	 
	 isActive = (item) => {
	  return this.props.histroy.location.pathname ===  item.path
	 }

	 getDom = (menuList) => {
		 return menuList.map((item, index) => {
			return (
			  <ul key={index} className={style.menu_item}>
				{
          item.children.length === 0
          ?
          <li onClick={this.changeRoute.bind(this,item)} className={[style.menu_item_1,`${this.isActive(item) ? style.active : style.no_active}`].join(' ')}>
            <Icon type={item.icon} className={style.icon}/>
            <h4 className={style.menu_item_title}>{item.title}</h4>
          </li>
          : 
          (
            item.type === 'button'
            ?
            <div>
              <li className={[style.menu_item_children,style.menu_item_1,`${item.isActive ? style.active : style.no_active}`].join(' ')} 
                onClick={this.changeRoute.bind(this,item)}>
                <Icon type={item.icon} className={style.icon}/>
                <h4 className={style.menu_item_title}>{item.title}</h4>
                <Icon type={item.isCollpse ? 'up' : 'down'} className={style.down_up}/>
              </li>
              <li className={item.isCollpse ? style.show : style.hidden} style={{'paddingLeft': '15px'}}>
               { this.getDom(item.children)}
              </li>
            </div>
            :
            null
          )
				}
			  </ul>
			)
		 })
   }
  
   componentDidMount() {
    this.props.reloadMenu(this.props.histroy.location.pathname);
     this.setState({
       menuList: this.props.menuList
     })
   } 
	 render () {
		 return (
	     <div className={style.menu}>
				 {
           this.getDom(this.state.menuList)
				 }
			 </div>
		 )
	 }
}

const mapStateToProps = (state) => {
	return {
    menuList: state.menuList
	}
}

const mapDispatchToProps = (dispatch, ownerProps) => {
  return {
    updateMenu: (item) => dispatch(update_menu({type: 'update_menu', item})),
    reloadMenu: (item) => dispatch(reload_menu({type: 'reload_menu', item}))
	}
}

Menu.propTypes = {
  menuList: PropTypes.array.isRequired,
  updateMenu: PropTypes.func,
  reloadMenu: PropTypes.func
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);