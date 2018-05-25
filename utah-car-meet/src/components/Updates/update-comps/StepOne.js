import React, { Component } from "react";
import {Link} from 'react-router-dom';

class StepOne extends Component {
  render() {
    return (
      <div className="stepone-container">
        Picture <input type="text" />
        Name <input type="text" />
        Location <input type="text" />
        Age <input type="number" />
        <button>Cancel</button>
        <Link to="/update/userinfo/steptwo"><button>Next Step</button></Link>
      </div>
    );
  }
}

export default StepOne;
