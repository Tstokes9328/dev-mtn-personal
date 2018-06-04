import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


function event(props){
    return (
        <div className="event">
            <div>
                <h6>{props.host}</h6>
                <img src={props.host_pic} alt="host pic"/>
            </div>

            <div>
            <h6>{props.title}</h6>
            <h6>{props.location}</h6>
            <h6>{props.date}</h6>
            <img src={props.event_picture} alt="image" />
            {
                props.user.name == props.host ?
                <button onClick={() => props.remove(props.id)}>Delete</button>
                :
                <div>
                </div>
            }
            <Link to={`/event/page/${props.id}`}><button>event</button></Link>
            </div>
            <hr />
        </div>
    )
}

function mapStateToProps(state){
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps)(event);