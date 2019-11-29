import React, {Component} from 'react';
import Menu from '../menu/Menu';
import style from '../menu/menu.less'

export default class MainMenu extends Component {
  constructor(props) {
		super(props);
	}	
	
	render() {
		const {history} = this.props;
		console.log(this.props);
		return (
			<div className={style.menu}>
        <Menu histroy={history}></Menu>
			</div>
		)
	}
}