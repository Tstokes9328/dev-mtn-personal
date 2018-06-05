import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

//Reducer Functions
import {getUser} from '../../ducks/users';

//Other Components
import Navbar from '../NavBar/Navbar';
import EventPageAttendess from '../EventPageAttendees/EventPageAttendees';
import EventWeather from '../EventWeather/EventWeather';

class EventPage extends Component {
    constructor(){
        super()

        this.state = {
            title: '',
            location: '',
            date: '',
            event_picture: '',
            host: '',
            host_pic: '',
            event_info: '',
            attendees: [],
            temperature: '',
            city_name: '',
            weather_description: '',
            temp_icon: '',

            attending: false
        }

        this.attendEvent = this.attendEvent.bind(this);
        this.getEventAttendees = this.getEventAttendees.bind(this);
    }

    componentWillMount(){
        let {id} = this.props.match.params;
        axios.get(`/event/page/${id}`).then((response) => {
            console.log(response.data)
            this.setState({
                title: response.data[0].title,
                location: response.data[0].location,
                date: response.data[0].date,
                event_picture: response.data[0].event_picture,
                host: response.data[0].host,
                host_pic: response.data[0].host_pic,
                event_info: response.data[0].event_info
            });
            const locationURL = response.data[0].location.split('').map((char) => {
                if(char === ' '){
                    return '+'
                }
                return char;
            }).join('')
            axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${locationURL}&units=imperial&APPID=842c61b381e00afe0c506a4d25dc158c`).then((response) => {
                console.log(response.data)
            this.setState({
                temperature: response.data.main.temp,
                city_name: response.data.name,
                temp_icon: response.data.weather[0].icon,
                weather_description: response.data.weather[0].description
            })
            }).catch((error) => console.log(error))
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
        }).catch(() => console.log('did not get attendents..'))
        this.setState({attending: true})
    }

    getEventAttendees(){
        let {id} = this.props.match.params;
        let {name} = this.props.user;
        console.log(name)
        axios.get(`/event/attendees/${id}`).then((response) => {
            const dataID = response.data.find((element) => {
                return element.name === name;
            })
            console.log(response.data)
            this.setState({
                attendees: response.data,
                attending: dataID ? true : false
            })
        })
    }

    render(){
        let {id} = this.props.match.params;
        let {user} = this.props;

        const mappedAttendees = this.state.attendees.map((element, index) => {
            return(
                <EventPageAttendess profile_pic={element.profile_pic} name={element.name}/>
            )
        })
        
        const weatherIcon = `http://openweathermap.org/img/w/${this.state.temp_icon}.png`

        console.log(this.state.attending)
        return(
            <div>
                <Navbar />
                Event Page
                <div>
                    <img src={weatherIcon} alt="icon image" />
                    <h1>{this.state.temperature} Degrees</h1>
                    <h1>{this.state.city_name}</h1>
                    <h1>{this.state.weather_decription}</h1>
                </div>

                <div>
                    <h1>Host: {this.state.host}</h1>
                    <img src={this.state.host_pic} alt="Host Pic" />
                </div>

                <div>
                    <img src={this.state.event_picture} alt="event picture" />
                    <h1>{this.state.title}</h1>
                    <h1>{this.state.location}</h1>
                    <h1>{this.state.date}</h1>
                    <h3>{this.state.event_info}</h3>

                    {
                    user.name == this.state.host ?
                    <Link to={`/update/event/${id}`}><button>Update Info</button></Link>
                    :
                    <div />
                    }
                </div>

                <div>
                    {
                    !this.state.attending ?
                    <div>
                    <h1>Are you Attending?</h1>
                    <button onClick={() => this.attendEvent()}>Yes</button>
                    </div>
                    :
                    <h1>You Are Attending!</h1>
                    }
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