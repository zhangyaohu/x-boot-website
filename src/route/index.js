import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, Link} from 'react-router-dom';
import Login from '../views/login';
import Home from '../views/home';
import User from '../views/user/User.jsx';
import Department from '../views/user/User.jsx';

export default class RouteIndex extends Component{
  constructor(props) {
		super(props);
	}

	render() {
    const container = {
      "width": '100%',
      "min-height": '100%'
    }
		return (
			<Router>
          <Switch>
            <Route path='/main' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Redirect path="/*" to='/main'></Redirect>
          </Switch>
			</Router>
		)
	}
}