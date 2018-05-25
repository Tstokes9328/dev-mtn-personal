import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import updateroutes from './updateroutes';

//Reducer Functions

class UpdateDisplay extends Component {

  render() {

    return (
      {updateroutes}
    );
  }
}

export default UpdateDisplay;
