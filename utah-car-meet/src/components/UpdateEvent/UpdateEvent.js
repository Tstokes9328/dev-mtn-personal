import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//Reducer Functions
import {updateTitle, updateLocation, updateDate, updatePicture, updateEventInfo, resetState} from '../../ducks/events';

//Material-UI Componenets
import Navbar from '../NavBar/Navbar';

//StyleSheets
import './reset.css';
import './UpdateEvent.css';

class UpdateEvent extends Component {
    updateEvent(){
        let {id} = this.props.match.params;
        let {title, location, date, event_picture, event_info} = this.props;
        axios.put(`/api/event/${id}`, {title, location, date, event_picture, event_info, id}).then(() => {
            this.props.history.push(`/event/page/${id}`)
        }).catch(error => console.log(error))
    }

    render(){
        return(
            <div className="update-event-container">
                <Navbar />
                    <div className="update-event-center-container">
                        
                        <div className="update-event-title-container">
                            Title <input type="text" onChange={(event) => {
                                this.props.updateTitle(event.target.value);
                            }}/>
                        </div>

                        <div className="update-event-location-container">
                            Location <input type="text" onChange={(event) => {
                                this.props.updateLocation(event.target.value);
                            }}/>
                        </div>

                        <div className="update-event-date-container">
                            Date <input type="date" onChange={(event) => {
                                this.props.updateDate(event.target.value);
                            }}/>
                        </div>
                        
                        <div className="update-event-info-container">
                            Event Info <input type="text" onChange={(event) => this.props.updateEventInfo(event.target.value)} />
                        </div>
                        
                        <div className="update-event-btn-container">
                            <button onClick={() => this.updateEvent()}>Submit Update</button>
                        </div>
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        title: state.events.title,
        location: state.events.location,
        date: state.events.date,
        event_picture: state.events.event_picture,
        event_info: state.events.event_info
    }
}

export default connect(mapStateToProps, {updateDate, updateLocation, updatePicture, updateTitle, updateEventInfo ,resetState})(UpdateEvent);