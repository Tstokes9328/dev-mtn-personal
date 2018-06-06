import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


//Style Sheets
import './reset.css';
import './Event.css';

function event(props){
    return (
        <div className="event">
            <div className="host-container">
                <h1>Hosted By</h1>
                <h6>{props.host}</h6>
            </div>

            <div className="title-container">
                <h1>{props.title}</h1>
                <h2>{props.location}</h2>
                <h3>{props.date}</h3>
            </div>

            <div className="location-container">
                {
                    props.user.name === props.host ?
                    <button onClick={() => props.remove(props.id)}>Delete</button>
                    :
                    <div />
                }
            </div>
            
            <div className="btn-container">
                <Link to={`/event/page/${props.id}`}><button>event</button></Link>
            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps)(event);