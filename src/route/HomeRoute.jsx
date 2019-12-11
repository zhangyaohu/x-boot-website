
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Department from '../views/department/Department.jsx';
import AddUser from '../views/user/addUser/AddUser.jsx';
import HomeIndex from '../views/home/HomeIndex';
import User from '../views/user/User.jsx';

export default class HomeRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {match, history} = this.props;
    debugger
    return (
      <Switch>
          <Route path={`${match.path}home`} component={HomeIndex}/>
          <Route path={`${match.path}main/department`} component={Department} match={match} history={history}></Route>
          <Route path={`${match.path}main/user`} component={User} match={match} history={history}></Route>
          <Route path={`${match.path}main/add-user`} component={AddUser} match={match} history={history}></Route>
      </Switch>
    )
  }
} 