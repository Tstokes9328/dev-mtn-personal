import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';

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
        <Event id={element.id} title={element.title} location={element.location} date={element.date} event_picture={element.event_picture} remove={this.removeEvent}/>
      )
    })

    return (
      <div>
        <Navbar />
        
        {mappedEvents}
        
        <Link to="/createevent"><button>Create A Meet</button></Link>

        <Link to="/profile"><button>Profile</button></Link>      
      </div>
    );
  }
}

export default Dashboard;
