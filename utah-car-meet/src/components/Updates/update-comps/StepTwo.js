import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class StepTwo extends Component {
    render(){
        return (
            <div>
                Car<input type="text"/>
                Year<input type="text"/>
                Car-Bio<input type="text"/>
                <Link to="/update/userinfo"><button>previous</button></Link>
                <Link to="/update/userinfo/stepthree"><button>next step</button></Link>
            </div>
        )
    }
}

export default StepTwo;