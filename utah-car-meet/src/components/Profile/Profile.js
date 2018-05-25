import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

//Material UI
import CssBaseline from "@material-ui/core/CssBaseline";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import Button from '@material-ui/core/Button';

//Reducer Functions
import { getUser, getUserCar, getUserCarPics } from "../../ducks/users";

//Style Sheets
import "./Profile.css";

class Profile extends Component {
  componentDidMount() {
    this.props.getUser();
    this.props.getUserCar();
    this.props.getUserCarPics();
  }

  render() {
    //MUI Theme
    const theme = createMuiTheme({
      palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: '#11cb5f' }, // This is just green.A700 as hex.
      },
    });

    let { name, location, age, profile_pic } = this.props.user;
    let [{ car_name, year, car_bio }] = this.props.userCar;
    let [
      { pic_one, pic_two, pic_three, pic_four, pic_five }
    ] = this.props.userCarPics;

    return (
      <MuiThemeProvider theme={theme}>
      <Fragment>
        <CssBaseline />
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="title" color="secondary">
              PROFILE
            </Typography>
          </Toolbar>
        </AppBar>
        <div className="navigation">
          <div className="nav-btns-container">
            <ul>
              <Link to="/dashboard" className="nav-btns">
                <li>Dashboard</li>
              </Link>
              <Link to="" className="nav-btns">
                <li>Sign Out</li>
              </Link>
            </ul>
          </div>
        </div>
        <div className="personal-info">
          {profile_pic ? (
            <div className="img-container">
              <img src={profile_pic} alt="user-pic" className="picture" />
            </div>
          ) : (
            <div className="img-container">
              <img
                src={require("../../images/noprofile.png")}
                alt="no-pic"
                className="picture"
              />
            </div>
          )}
          {name ? (
            <div className="name-container">
              <div className="name-content">
                <h1>{name}</h1>
              </div>
            </div>
          ) : (
            <div className="name-container">
              <div className="name-content">
                <h1>No Name</h1>
              </div>
            </div>
          )}
          {location ? (
            <div className="location-container">
              <div className="location-content">
                <h1>{location}</h1>
              </div>
            </div>
          ) : (
            <div className="location-container">
              <div className="location-content">
                <h1>No Location</h1>
              </div>
            </div>
          )}
          {age ? (
            <div className="age-container">
              <div className="age-content">
                <h1>{age}</h1>
              </div>
            </div>
          ) : (
            <div className="age-container">
              <div className="age-content">
                <h1>No Age</h1>
              </div>
            </div>
          )}
        </div>
        <hr className="section-break" />

        {/* Car Bio Part */}

        <div className="car-info-container">
          {car_bio ? (
            <div className="car-bio-container">
              <div className="car-bio-title">
                <h1>About My Car</h1>
              </div>
              <div className="car-bio-content">
                <h6>{car_bio}</h6>
              </div>
            </div>
          ) : (
            <div className="car-bio-container">
              <div className="car-bio-title">
                <h1>About My Car</h1>
              </div>
              <div className="car-bio-content">
                <h6>Please Write A Bio..</h6>
              </div>
            </div>
          )}
          {car_name ? (
            <div className="car-container">
              <div className="car-title">
                <h1>Car</h1>
              </div>
              <div className="car-content">
                <h1>{car_name}</h1>
              </div>
            </div>
          ) : (
            <div className="car-container">
              <div className="car-title">
                <h1>Car</h1>
              </div>
              <div className="car-content">
                <h1>Please Update Car...</h1>
              </div>
            </div>
          )}
          {year ? (
            <div className="year-container">
              <div className="year-title">
                <h1>Year</h1>
              </div>
              <div className="year-content">
                <h1>{year}</h1>
              </div>
            </div>
          ) : (
            <div className="year-container">
              <div className="year-title">
                <h1>Year</h1>
              </div>
              <div className="year-content">
                <h1>Update Car Year...</h1>
              </div>
            </div>
          )}
        </div>
        <hr className="section-break" />

        {/* Car Pics */}
        <div className="car-pics-container">
          {pic_one ? (
            <div>
              <img src={pic_one} alt="" />
            </div>
          ) : (
            <div>
              <h1>No Picture</h1>
            </div>
          )}
          {pic_two ? (
            <div>
              <img src={pic_two} alt="" />
            </div>
          ) : (
            <div>
              <h1>No Picture</h1>
            </div>
          )}
          {pic_three ? (
            <div>
              <img src={pic_three} alt="" />
            </div>
          ) : (
            <div>
              <h1>No Picture</h1>
            </div>
          )}
          {pic_four ? (
            <div>
              <img src={pic_four} alt="" />
            </div>
          ) : (
            <div>
              <h1>No Picture</h1>
            </div>
          )}
          {pic_five ? (
            <div>
              <img src={pic_five} alt="" />
            </div>
          ) : (
            <div>
              <h1>No Picture</h1>
            </div>
          )}
        </div>
        <Link to="/update/userinfo"><button>Update</button></Link>
      </Fragment>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userCar: state.userCar,
    userCarPics: state.userCarPics
  };
}

export default connect(mapStateToProps, {
  getUser,
  getUserCar,
  getUserCarPics
})(Profile);
