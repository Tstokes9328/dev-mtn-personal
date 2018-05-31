import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class StepThree extends Component {
    render(){
        return (
            <div>
                Picture<input type="text"/>
                Picture<input type="text"/>
                Picture<input type="text"/>
                <Link to="/update/userinfo/steptwo"><button>Previous</button></Link>
                <Link to="/profile"><button>Update</button></Link>
            </div>
        )
    }
}

export default StepThree;