import React, {Component} from 'react';
import MainHeader from '../../components/main/Header';
import MainMenu from '../../components/main/MainMenu';
import style from './home.less';
import { Button } from 'antd';

export default class Home extends Component {
	constructor (props) {
		super(props);
	}

	render() {
		return (
			<div  className={style.container}>
				<header className={style.header}>
          <MainHeader history={this.props.history}></MainHeader>
				</header>
				<aside className={style.aside}>
          <MainMenu history={this.props.history}></MainMenu>
				</aside>
				<section>
          
				</section>
			</div>
		)
	}
}