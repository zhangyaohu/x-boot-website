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
      "height": '100%'
    }
		return (
			<Router>
				<div style={container}>
          <Switch>
            <Route path='/home' component={Home}></Route>
            <Route path='/login' component={Login}></Route>
            <Redirect path="/*" to='/home'></Redirect>
          </Switch>
        </div>
			</Router>
		)
	}
}