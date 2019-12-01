import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import MainHeader from '../../components/main/Header';
import MainMenu from '../../components/main/MainMenu';
import  HomeRoute from '../../route/HomeRoute';
import style from './home.less';
import { Button } from 'antd';

export default class Home extends Component {
	constructor (props) {
		super(props);
	}

	render() {
   const {history, match} = this.props;
		return (
			<div  className={style.container}>
				<header className={style.header}>
          <MainHeader history={history}></MainHeader>
				</header>
				<aside className={style.aside}>
          <MainMenu history={history}></MainMenu>
				</aside>
				<section className={style.section} style={{"width": "calc(100% - 180px)"}}>
				    <HomeRoute history={history} match={match}></HomeRoute>
				</section>
			</div>
		)
	}
}