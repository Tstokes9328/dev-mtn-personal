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

//StyleSheets
import './reset.css';
import './EventPage.css';

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

            attending: false,
            chatbox: false,

            chatboxInfo: [],
            chatboxInputMessage: ''
        }

        this.attendEvent = this.attendEvent.bind(this);
        this.getEventAttendees = this.getEventAttendees.bind(this);

        this.chatBoxSwitch = this.chatBoxSwitch.bind(this);
        this.getEventChat = this.getEventChat.bind(this);
        this.postChat = this.postChat.bind(this);
        this.handleChangeChatboxInput = this.handleChangeChatboxInput.bind(this);
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
        this.getEventChat();
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

    
    chatBoxSwitch(){
        this.setState({chatbox: !this.state.chatbox})
    }
    
    //ChatBox Functions
    getEventChat(){
        let {id} = this.props.match.params;
        setInterval( () => {
                axios.get(`/event/chat/${id}`).then((response) => {
                    this.setState({chatboxInfo: response.data})
                })
            }, 1000
        )
    }

    postChat(){
        let {id} = this.props.match.params;
        let {name} = this.props.user;
        let {chatboxInputMessage} = this.state;
        axios.post(`/event/chat/message/${id}`, {name, chatboxInputMessage, id}).then(() => {

        }).catch(error => console.log(error))
        this.setState({chatboxInputMessage: ''})
    }

    handleChangeChatboxInput(value){
        this.setState({chatboxInputMessage: value})
    }

    render(){
        let {id} = this.props.match.params;
        let {user} = this.props;
 
        const mappedAttendees = this.state.attendees.map((element, index) => {
            return(
                <EventPageAttendess profile_pic={element.profile_pic} name={element.name}/>
            )
        }).reverse();

        const chatboxUserMessage = this.state.chatboxInfo.map((element, index) => {
            console.log(element)
            return (
                <div className="chat-message-container">
                <h1>{element.name}:</h1>
                <p>{element.chatboxinputmessage}</p>
                </div>
            )
        }).reverse();
        

        const weatherIcon = `http://openweathermap.org/img/w/${this.state.temp_icon}.png`


        console.log(this.state.chatboxInputMessage)
        return(
            <div className="eventpage-container">
                <Navbar />
                <div className="event-info-container">
                    <h1>{this.state.title}</h1>
                    <h2>{this.state.location}</h2>
                    <h3>{this.state.date}</h3>
                    <h4>{this.state.event_info}</h4>
                </div>

                <div className="event-host-container">
                    <div className="host-title"><h1>Host</h1></div>
                    <div className="host-img-container"><img src={this.state.host_pic} alt="Host Pic" /></div>
                    <div className="host-name-container"><h1>{this.state.host}</h1></div>
                </div>

                <div className="attending-title">
                    <h1>Attending ({this.state.attendees.length})</h1>
                </div>
                    
                <div className="weather-container">
                    <div className="city-container-row-2">
                        <div className="icon-container"><img src={weatherIcon} alt="icon image" /></div>
                        <div className="temp-container"><h1>{this.state.temperature} &#176;F</h1></div>
                    </div>
                </div>



                    {
                    !this.state.attending ?
                    <div className="attend-btn-container">
                        {/* <div className="attending-container"><h1>Are you Attending?</h1></div> */}
                        <div className="attend-event-btn-container"><button onClick={() => this.attendEvent()}>Join</button></div>
                    </div>
                    :
                    <div className="attend-btn-container">
                        {/* <div className="you-are-attending-container">
                            <h1>You Are Attending!</h1>
                        </div> */}
                    </div>
                    }

                    {
                    user.name == this.state.host ?
                    <div className="update-container">
                    <Link to={`/update/event/${id}`}><button>Update</button></Link>
                    </div>
                    :
                    <div />
                    }

                <div className="attendees-container">
                    {mappedAttendees}
                </div>

                <div className="chat-btn-container">
                    <button onClick={() => this.chatBoxSwitch()}>Chat</button>
                </div>

                    {
                        this.state.chatbox ?
                        <div className="chat-box-container">
                            <div className="chat-box-title-container">
                                <h1>Chat Box</h1>
                            </div>

                            <div className="chat-box-message-container">
                                <h1>{chatboxUserMessage}</h1>
                            </div>


                            <form className="chat-box-input-container">
                                <input type="text" placeholder="Type a message.." value={this.state.chatboxInputMessage} onChange={(event) => this.handleChangeChatboxInput(event.target.value)}/>
                                <button onClick={() => this.postChat()} type="submit">Send</button>
                            </form>
                        </div>
                        :
                        <div />
                    }
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