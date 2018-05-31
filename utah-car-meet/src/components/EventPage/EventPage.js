import React, {Component} from 'react';
import axios from 'axios';

class EventPage extends Component {
    constructor(){
        super()

        this.state = {
            event: []
        }
    }
    componentDidMount(){
        let {id} = this.props.match.params;
        axios.get(`/event/page/${id}`).then((response) => {
            this.setState({event: response.data})
        })
    }
    render(){
        console.log(this.state.event)
        return(
            <div>
                Event Page
                <h1>{this.state.event.title}</h1>
                <h1>{this.state.event.location}</h1>
                <h1>{this.state.event.date}</h1>
                <img src={this.state.event.event_picture} alt="event picture" />
                <button>Update Info</button>
            </div>
        )
    }
}

export default EventPage;