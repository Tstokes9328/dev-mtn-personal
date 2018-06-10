import React from 'react';
import {Link} from 'react-router-dom';

//Style Sheet
import './EventPageAttendees.css';

export default function eventPageAttendees(props){
    let {profile_pic, name} = props;
    return (
        <div className="attendee-container">
            <div className="image-container">
                <img src={profile_pic} alt="attendee profile pic"/>
            </div>

            <div className="name-container">
                <Link to={`/profile/${props.attendent_id}`}><h1>{name}</h1></Link>
            </div>
        </div>
    )
}