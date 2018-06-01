import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

//Reducer Functions
import {getUser} from '../../ducks/users';

//Other Components
import Navbar from '../NavBar/Navbar';
import EventPageAttendess from '../EventPageAttendees/EventPageAttendees';

class EventPage extends Component {
    constructor(){
        super()

        this.state = {
            title: '',
            location: '',
            date: '',
            event_picture: '',

            attendees: []
        }

        this.attendEvent = this.attendEvent.bind(this);
        this.getEventAttendees = this.getEventAttendees.bind(this);
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        axios.get(`/event/page/${id}`).then((response) => {
            this.setState({
                title: response.data[0].title,
                location: response.data[0].location,
                date: response.data[0].date,
                event_picture: response.data[0].event_picture
            });
        })
        this.getEventAttendees();
    }

    componentDidMount(){
        this.props.getUser();
    }

    attendEvent(){
        let {id} = this.props.match.params;
        let {profile_pic, name} = this.props.user;
        axios.post('event/attendees', {profile_pic, name, id}).then(() => {
            this.getEventAttendees();
        })
    }

    getEventAttendees(){
        let {id} = this.props.match.params;
        axios.get(`/event/attendees/${id}`).then((response) => {
            this.setState({attendees: response.data})
        })
    }

    render(){
        console.log(this.state.attendees)
        let {id} = this.props.match.params;
        let {user} = this.props;

        const mappedAttendees = this.state.attendees.map((element, index) => {
            return(
                <EventPageAttendess profile_pic={element.profile_pic} name={element.name}/>
            )
        })
        return(
            <div>
                <Navbar />
                Event Page
                <img src={this.state.event_picture} alt="event picture" />
                <h1>{this.state.title}</h1>
                <h1>{this.state.location}</h1>
                <h1>{this.state.date}</h1>
                <Link to={`/update/event/${id}`}><button>Update Info</button></Link>

                <div>
                    Are you Attending?<button onClick={() => this.attendEvent()}>Yes</button>
                </div>
                    {mappedAttendees}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        user: state.users.user
    }
}

export default connect(mapStateToProps, {getUser})(EventPage);