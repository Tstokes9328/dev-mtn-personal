import React, { Component } from "react";
import {Link} from 'react-router-dom';

//Style Sheets
import "./reset.css";
import "./dashboard.css";

//Other Technologies

class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="navbar">
          <div>
            <Link to="/profile">Profile</Link>
          </div>
        </div>
        {/* Line Break */}
          <div className="line-break1">
            <div className="line-break2" />
              <h3>About Us</h3>
            <div className="line-break2" />
          </div>
        {/* End Of Line Break */}
        <div className="about-container">
          <p>Utah Car Meets is a community of like minded indivuals who have a passion for cars that are based in Utah. Our purpose is to have a platform where Utah car enthusiasts can network with one another and create an easier to host and/or find local car meets. </p>
        </div>
        {/* Line Break */}
          <div className="line-break1">
            <div className="line-break2" />
              <h4>Create Event</h4>
            <div className="line-break2" />
          </div>
        {/* End Of Line Break */}
        <div className="event-btn-container">
          <button className="btn">Create Event</button>
        </div>
      </div>
    );
  }
}

export default Dashboard;
