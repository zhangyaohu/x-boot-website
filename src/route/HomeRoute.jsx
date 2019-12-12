
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Department from '../views/department/Department.jsx';
import AddDepartment from '../views/department/AddDepartment.jsx';
import AddUser from '../views/user/addUser/AddUser.jsx';
import HomeIndex from '../views/home/HomeIndex';
import User from '../views/user/User.jsx';

export default class HomeRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {match, history} = this.props;
    return (
      <Switch>
          <Route path={`${match.path}/home`} component={HomeIndex}/>
          <Route path={`${match.path}/department`} component={Department} match={match} history={history}></Route>
          <Route path={`${match.path}/user`} component={User} match={match} history={history}></Route>
          <Route path={`${match.path}/add-user`} component={AddUser} match={match} history={history}></Route>
          <Route path={`${match.path}/add-department`} component={AddDepartment} match={match} history={history}></Route>
          <Redirect path='*' to="/main/home"/>
      </Switch>
    )
  }
} 