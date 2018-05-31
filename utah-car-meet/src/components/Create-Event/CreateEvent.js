import React, {Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

//Events Reducer Functions
import {updateTitle, updateLocation, updateDate, updatePicture, resetState} from '../../ducks/events';

//Other Components
import Navbar from '../NavBar/Navbar';

class CreateEvent extends Component {

    newEvent(){
        let {title, location, date, event_picture, id} = this.props;
        axios.post('/api/newevent', {title, location, date, event_picture, id}).then(() => {
            this.props.history.push('/dashboard');
        }).catch()
    }

    render(props){
        return (
            <div>
                <Navbar />
                Title<input type="text" onChange={(event) => this.props.updateTitle(event.target.value)}/>

                Location<input type="text" onChange={(event) => {this.props.updateLocation(event.target.value)}}/>

                Date<input type="date"
                onChange={(event) => this.props.updateDate(event.target.value)}/>

                Picture<input type="text" onChange={(event) => this.props.updatePicture(event.target.value)}/>

                <button onClick={() => this.newEvent()}>Complete</button>

                <Link to="/dashboard"><button onClick={(event) => this.props.resetState()}>Cancel</button></Link>
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
        id: state.users.user.id
    }
}

export default connect(mapStateToProps, {updateDate, updateLocation, updatePicture, updateTitle, resetState})(CreateEvent);