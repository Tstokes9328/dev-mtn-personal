import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class EventPage extends Component {
    constructor(){
        super()

        this.state = {
            title: '',
            location: '',
            date: '',
            event_picture: ''
        }
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        axios.get(`/event/page/${id}`).then((response) => {
            console.log(response.data)
            this.setState({
                title: response.data[0].title,
                location: response.data[0].location,
                date: response.data[0].date,
                event_picture: response.data[0].event_picture
            })
        })
    }

    render(){
        let {id} = this.props.match.params;
        console.log(this.state)
        return(
            <div>
                Event Page
                <img src={this.state.event_picture} alt="event picture" />
                <h1>{this.state.title}</h1>
                <h1>{this.state.location}</h1>
                <h1>{this.state.date}</h1>
                <Link to={`/update/event/${id}`}><button>Update Info</button></Link>
            </div>
        )
    }
}

export default EventPage;