import React, {Component} from 'react';
import PropTypes from 'prop-types';
import style from './modal.less';
import { Icon } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ReactDOM from 'react-dom'

class Dialog extends Component {
	constructor(props) {
	 super(props);
	 this.state = {
		visible: false
	 }

	}
	
	componentDidMount() {
    this.setState({
			visible: this.props.visible
		})
	}
	
	componentDidUpdate(prevProps){
		if(prevProps.visible!==this.props.visible){
				this.setState({
					visible: this.props.visible,
				})
		}
	}


	render() {
		let {title, onClose, confirmText, cancleText, isDrag, children, width, onOk} = this.props,
		reactDOM = null
    if(this.state.visible) {
       reactDOM = <div className={style.dialog_container}>
			 <div className={style.dialog_wrapper}>
			 <ReactCSSTransitionGroup  
				 component="div"
				 transitionName="fadein"
				 transitionEnterTimeout={500}
				 transitionLeaveTimeout={500}
				 style={{'width': '100%'}}>
				 <div className={style.dialog_content} style={{'width': width ? width : '800px'}}>
					 <div className={style.el_dialog__header}>
						 <span className={style.dialog_title}>{title}</span>
						 <span className={style.dialog_close_icon} onClick={this.props.close}>
							 <Icon type="close" />
						 </span>
					 </div>
					 <div className={style.modal_body} style={{"overflow": "auto"}}>
						 {children}
					 </div>
					 <div className={style.dialog_footer}>
							<span className={style.confrim_btn} onClick={onOk}>{confirmText}</span>
							<span className={style.cancel_btn} onClick={onClose}>{cancleText}</span>
					 </div>
				 </div>
				 </ReactCSSTransitionGroup>
			 </div>
		 </div>
		}
		
	  return	ReactDOM.createPortal(reactDOM,document.querySelector('body'))
	}
}

Dialog.propTypes = {
	visible: PropTypes.bool.isRequired,
	title: PropTypes.string.isRequired,
	onClose: PropTypes.func,
	onOk: PropTypes.func,
	confirmText: PropTypes.string,
	cancleText: PropTypes.string,
	isDrag: PropTypes.bool,
	children: PropTypes.node,
	width: PropTypes.string,
	close: PropTypes.func.isRequired,
	showConfirm: PropTypes.bool,
	showCancel: PropTypes.bool
}

Dialog.defaultProps = {
	confirmText: '确定',
	cancleText: '取消',
	onClose: () => {},
	visible: false,
	showCancel: true,
	showConfirm: true,
	onOk: () => {}
}

export default Dialog;