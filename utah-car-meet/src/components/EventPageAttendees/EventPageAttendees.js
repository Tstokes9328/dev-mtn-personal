import React from 'react';

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
                <h1>{name}</h1>
            </div>
        </div>
    )
}