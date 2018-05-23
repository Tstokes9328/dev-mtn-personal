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
        <Link to="/profile">Profile</Link>
          DASHBOARD
      </div>
    );
  }
}

export default Dashboard;
