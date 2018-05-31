import React, {Component} from 'react';
import {connect} from 'react-redux';

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
                <div className="logo-container">
                    LOGO
                </div>
                <div className="image-container">
                    <img src={profile_pic} alt="Profile Picture"/>
                </div>
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