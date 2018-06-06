import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

//Reducer Functions
import {updateTitle, updateLocation, updateDate, updatePicture, updateEventInfo, resetState} from '../../ducks/events';

class UpdateEvent extends Component {
    updateEvent(){
        let {id} = this.props.match.params;
        let {title, location, date, event_picture, event_info} = this.props;
        axios.put(`/api/event/${id}`, {title, location, date, event_picture, event_info, id}).then(() => {
            this.props.history.push(`/event/page/${id}`)
        })
    }

    render(){
        return(
            <div>
                Update page

                Title <input type="text" onChange={(event) => {
                    this.props.updateTitle(event.target.value);
                }}/>

                Location <input type="text" onChange={(event) => {
                    this.props.updateLocation(event.target.value);
                }}/>

                Date <input type="date" onChange={(event) => {
                    this.props.updateDate(event.target.value);
                }}/>

                Event Picture <input type="file" onChange={(event) => {
                    this.props.updatePicture(event.target.value);
                }}/>

                Event Info <input type="text" onChange={(event) => this.props.updateEventInfo(event.target.value)} />

                <button onClick={() => this.updateEvent()}>Submit Update</button>
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