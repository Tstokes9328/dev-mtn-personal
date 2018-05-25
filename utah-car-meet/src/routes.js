import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import UpdateDisplay from './components/Updates/UpdateDisplay';

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/update/userinfo" component={UpdateDisplay}/>
    </Switch>
)