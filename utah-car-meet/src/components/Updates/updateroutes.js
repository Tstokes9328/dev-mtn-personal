import React from 'react';
import {Switch, Route} from 'react-router-dom';

//Components
import StepOne from './update-comps/StepOne';
import StepTwo from './update-comps/StepTwo';
import StepThree from './update-comps/StepThree';

export default (
    <Switch>
        <Route exact path="/update/userinfo" component={StepOne}/>
        <Route path="/update/userinfo/steptwo" component={StepTwo}/>
        <Route path="/update/userinfo/stepthree" component={StepThree}/>
    </Switch>
)