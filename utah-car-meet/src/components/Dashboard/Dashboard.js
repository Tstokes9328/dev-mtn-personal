import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';

//Reducer Functions
import {getUser} from '../../ducks/users';

//Other Components
import Navbar from '../NavBar/Navbar';
import Event from '../Event/Event';

//Style Sheets
import "./reset.css";
import "./dashboard.css";

//Other Technologies

class Dashboard extends Component {
  constructor(){
    super()

    this.state = {
      events: []
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getNewEvents = this.getNewEvents.bind(this);
    this.removeEvent = this.removeEvent.bind(this);
  }

  componentDidMount(){
    this.props.getUser();
    this.getNewEvents();
  }

  getNewEvents(){
    axios.get('/api/events').then((response) => {
      this.setState({events: response.data})
      console.log(this.state.events)
    })
  }

  removeEvent(id){
    axios.delete(`/api/event/${id}`).then((response) => {
      console.log(response)
      this.getNewEvents();
    })
  }

  render() {
    const mappedEvents = this.state.events.map((element, index) => {
      return (
        <Event id={element.id} title={element.title} location={element.location} date={element.date} event_picture={element.event_picture} host={element.host} host_pic={element.host_pic} event_info={element.event} remove={this.removeEvent}/>
      )
    })
    
    let {id} = this.props.user;
    console.log(this.props)

    return (
      <div className="dash-container">
        <Navbar />
        <div className="info-container">
          <img src={require('../../images/car-meet-logo.png')} />
          <div className="text-container">
            <p>Welcome to Utah Car Meet! A place where Utah car enthusiasts can create an easier way to host car meet ups to meet new people with the same passion. Click the button below and get started! </p>
            <div className="meet-btn-container">
            <Link to="/createevent"><button>Create A Meet</button></Link>
            </div>
          </div>
        </div>

        <div className="events-container">
          {mappedEvents}
        </div>   
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps, {getUser})(Dashboard);
