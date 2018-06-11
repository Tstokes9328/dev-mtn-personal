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
            <div className="inner-profile-container">
              <div className="personal-info-container">
                <div className="personal-pic-container">
                  <img src={this.state.profileInfo[0].profile_pic} alt="profile pic" />
                </div>
                <h1>{this.state.profileInfo[0].name}</h1>
                <h2>{this.state.profileInfo[0].location}</h2>
                <h3>{this.state.profileInfo[0].age} yrs</h3>
              </div>

              <div className="car-info-container">
                <div className="car-info-header">
                  <h1>CAR INFO</h1>
                </div>
                <div className="car-make-container">
                  <h1>{this.state.profileInfo[0].car_make}</h1>
                  <h2>{this.state.profileInfo[0].year}</h2>
                  <h3>{this.state.profileInfo[0].car_name}</h3>
                </div>

                <div className="car-pic-container">
                  <img src={this.state.profileInfo[0].pic_one} alt="car pic" />
                </div>
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
