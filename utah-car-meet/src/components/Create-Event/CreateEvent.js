import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

//Events Reducer Functions
import {updateTitle, updateLocation, updateDate, updatePicture, updateEventInfo, resetState} from '../../ducks/events';

//Other Components
import Navbar from '../NavBar/Navbar';

//Style Sheets
import './reset.css';
import './CreateEvent.css';

class CreateEvent extends Component {

    newEvent(){
        let {title, location, date, event_picture, id, host, host_pic, event_info} = this.props;
        axios.post('/api/newevent', {title, location, date, event_picture, id, host, host_pic, event_info}).then(() => {
            this.props.history.push('/dashboard');
        }).catch()
    }

    render(props){
        console.log(this.props)
        return (
            <div className="create-meet-container">
                <Navbar />
                <div className="head-container">
                        <h1>Create Event</h1>
                    </div>

                    <div className="inside-container">
                        
                        <div className="create-meet-title-container">
                            <h1>Title</h1>
                             <input type="text" onChange={(event) => {
                                this.props.updateTitle(event.target.value);
                            }} required/>
                        </div>

                        <div className="create-event-location-container">
                            <h1>Location</h1> 
                            <input type="text" onChange={(event) => {
                                this.props.updateLocation(event.target.value);
                            }} required/>
                        </div>

                        <div className="create-event-date-container">
                            <h1>Date</h1>
                            <input type="date" onChange={(event) => {
                                this.props.updateDate(event.target.value);
                            }} required/>
                        </div>
                        
                        <div className="create-event-info-container">
                            <h1>Event Info</h1> 
                            <textarea onChange={(event) => this.props.updateEventInfo(event.target.value)} required/>
                        </div>
                        
                        <div className="create-event-btn-container">
                            <button onClick={() => this.newEvent()}>Create Event</button>
                        </div>
                    </div>
                            
                    <div className="cancel-container">
                        <Link to="/dashboard"><button onClick={(event) => this.props.resetState()}>Cancel</button></Link>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    console.log(state)
    return {
        title: state.events.title,
        location: state.events.location,
        date: state.events.date,
        event_picture: state.events.event_picture,
        id: state.users.user.id,
        host: state.users.user.name,
        host_pic: state.users.user.profile_pic,
        event_info: state.events.event_info
    }
}

export default connect(mapStateToProps, {updateDate, updateLocation, updatePicture, updateTitle, updateEventInfo, resetState})(CreateEvent);