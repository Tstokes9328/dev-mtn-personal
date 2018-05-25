import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import UserInfo from './components/Updates/UserInfo';
import PicUpdate from './components/Updates/PicUpdate';
import CarInfo from './components/Updates/CarInfo';

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/userinfo" component={UserInfo}/>
        <Route path="/carinfo" component={CarInfo}/>
    </Switch>
)