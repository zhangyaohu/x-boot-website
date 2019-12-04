
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch, Link } from 'react-router-dom';
import Department from '../views/department/Department.jsx';
import User from '../views/user/User.jsx';
import AddUser from '../views/user/addUser/AddUser.jsx';

export default class HomeRoute extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {match, history} = this.props;
    return (
      <Route>
          <Route path={`${match.path}/department`} component={Department} match={match} history={history}></Route>
          <Route path={`${match.path}/user`} component={User} match={match} history={history}></Route>
          <Route path={`${match.path}/add-user`} component={AddUser} match={match} history={history}></Route>
      </Route>
    )
  }
} 