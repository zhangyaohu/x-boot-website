import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import Login from '../views/login';
import Home from '../views/home';

export default class RouteIndex extends Component{
  constructor(props) {
		super(props);
	}

	render() {
		return (
			<Router>
				<Switch>
				  <Route path='/home' component={Home}></Route>
          <Route path='/login' component={Login}></Route>
				</Switch>
			</Router>
		)
	}
}