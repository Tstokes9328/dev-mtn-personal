import React, { Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from '../NavBar/Navbar';

//Reducer Functions
import { getUser } from "../../ducks/users";

//Style Sheets
import './reset.css';
import "./Profile.css";


class Profile extends Component {
  constructor(){
    super()

    this.state = {
      profileInfo: [{}]
    }
  }
  componentDidMount(){
    this.getUserById();
  }

  //Function to get profiel info
  getUserById(){
    let {id} = this.props.match.params;
    axios.get(`/users/profile/${id}`).then((response) => {
      this.setState({profileInfo: response.data})
    })
  }

  render() {
    console.log(this.state.profileInfo)
    return (
        <div className="profile-container">
          <Navbar />

          <div className="profile-pic-container">
            <img src={this.state.profileInfo[0].profile_pic} alt="profile pic" />
          </div>

          <div className="inner-profile-container">
            <div className="cover-photo-container">
              <img src={this.state.profileInfo[0].pic_one} alt="cover photo"/>
            </div>

            <div className="profile-name-container">
              <h1>{this.state.profileInfo[0].name}</h1>
            </div>

            <div className="profile-user-info-container">
              <h1>{this.state.profileInfo[0].location}</h1>
              <h2>{this.state.profileInfo[0].age}</h2>
            </div>

          </div>
          <Link to="/update/userinfo"><button>Update</button></Link>
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.users.user
  };
}

export default connect(mapStateToProps, {
  getUser
})(Profile);
