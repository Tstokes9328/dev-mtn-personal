import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import UpdateDisplay from './components/Updates/UpdateDisplay';
import CreateEvent from './components/Create-Event/CreateEvent';
import EventPage from './components/EventPage/EventPage';
import UpdateEvent from './components/UpdateEvent/UpdateEvent';

export default (
    <Switch>
        <Route exact path="/" component={Login}/>
        <Route path="/dashboard" component={Dashboard}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/update/userinfo" component={UpdateDisplay}/>
        <Route path="/createevent" component={CreateEvent}/>
        <Route path="/event/page/:id" component={EventPage}/>
        <Route path="/update/event/:id" component={UpdateEvent}/>
    </Switch>
)