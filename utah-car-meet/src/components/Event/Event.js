import React from 'react';
import {Link} from 'react-router-dom';

export default function event(props){
    return (
        <div className="event">
        
            <h6>{props.title}</h6>
            <h6>{props.location}</h6>
            <h6>{props.date}</h6>
            <img src={props.event_picture} alt="image" />
            <button onClick={() => props.remove(props.id)}>Delete</button>
            <Link to={`/event/page/${props.id}`}><button>event</button></Link>
            <hr />
        </div>
    )
}