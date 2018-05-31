import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Navbar from '../NavBar/Navbar';

//Reducer Functions
import { getUser } from "../../ducks/users";

//Style Sheets
import './reset.css';
import "./Profile.css";


class Profile extends Component {
  componentDidMount() {
    this.props.getUser();
  }

  render() {
    let { name, location, age, profile_pic, car_name, car_make, year, car_bio, pic_one, pic_two, pic_three } = this.props.user;
    
    console.log(this.props.user)

    return (
        <div>
          <Navbar />

        <div className="personal-info-container">
          <div className="personal-info-card">
          {profile_pic ? (
            <div className="img-container">
              <img src={profile_pic} alt="user-pic"/>
            </div>
          ) : (
            <div className="img-container">
              <img
                src={require("../../images/noprofile.png")}
                alt="no-pic"/>
            </div>
          )}
          <div className="car-pics-container">
            <div className="car-pics-inner-container">
              {pic_one ? (
                <div className="pic-container">
                  <img src={pic_one} alt="" />
                </div>
              ) : (
                <div className="pic-container">
                  <h1>No Picture</h1>
                </div>
              )}
              {pic_two ? (
                <div className="pic-container">
                  <img src={pic_two} alt="" />
                </div>
              ) : (
                <div className="pic-container">
                  <h1>No Picture</h1>
                </div>
              )}
              {pic_three ? (
                <div className="pic-container">
                  <img src={pic_three} alt="" />
                </div>
              ) : (
                <div className="pic-container">
                  <h1>No Picture</h1>
                </div>
              )}
            </div>
          </div>

          <div className="inner-info-container">
              <div className="inner-left-container">
                <div className="info-title">
                  <h2>INFO</h2>
                </div>
            {name ? (
              <div>
                <div className="name-content">
                  <h1>{name}</h1>
                </div>
              </div>
            ) : (
                <div className="name-content">
                  <h1>No Name</h1>
                </div>
            )}
            {location ? (
                <div className="location-content">
                  <h1>{location}</h1>
                </div>
            ) : (
                <div className="location-content">
                  <h1>No Location</h1>
                </div>
            )}
            {age ? (
                <div className="age-content">
                  <h1>{age}</h1>
                </div>
            ) : (
                <div className="age-content">
                  <h1>No Age</h1>
                </div>
            )}
            {car_name ? (
                <div className="car-content">
                  <h1>{car_name}</h1>
                </div>
            ) : (
                <div className="car-content">
                  <h1>Please Update Car...</h1>
                </div>
            )}
            {car_make ? (
                <div className="car-content">
                  <h1>{car_make}</h1>
                </div>
            ) : (
                <div className="car-content">
                  <h1>Please Update Car make..</h1>
                </div>
            )}
            {year ? (
                <div className="year-content">
                  <h1>{year}</h1>
                </div>
            ) : (
                <div className="year-content">
                  <h1>Update Car Year...</h1>
                </div>
            )}
            </div>

            <div className="inner-right-container">
              <div className="car-bio-title">
                <h2>CAR INFO</h2>
              </div>
                {car_bio ? (
                  <div className="car-bio-container">
                      <p>{car_bio}</p>
                  </div>
                ) : (
                  <div className="car-bio-container">
                      <p>Please Write A Bio..</p>
                  </div>
                )}
              </div>
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
