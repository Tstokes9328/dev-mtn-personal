import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//StyleSheet
import './navbar.css';

//Reducer Function
import { getUser } from "../../ducks/users";

class Navbar extends Component {
    componentDidMount(){
        this.props.getUser();
    }
    render(){
        let {profile_pic} = this.props.user
        return(
            <div className="nav-container">
                <Link to="/dashboard">
                <div className="logo-container">
                    <img src={require('../../images/car-meet-logo.png')} alt="UCM logo"/>
                </div>
                </Link>

                <Link to="/profile">
                <div className="image-container">
                    <img src={profile_pic} alt="Profile Picture"/>
                </div>
                </Link>
            </div>
        )
    }
}

function mapStateToProps(state){
   return   {
       user: state.users.user
   }
}

export default connect(mapStateToProps, {getUser})(Navbar);