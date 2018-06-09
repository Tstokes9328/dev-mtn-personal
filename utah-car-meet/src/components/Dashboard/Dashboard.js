import React, { Component } from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';

//Reducer Functions
import {getUser} from '../../ducks/users';

//Other Components
import Navbar from '../NavBar/Navbar';
import Event from '../Event/Event';

//M-UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

//Style Sheets
import "./reset.css";
import "./dashboard.css";


const style2 = {
  color: "#23abff"
}

class Dashboard extends Component {
  constructor(){
    super()

    this.state = {
      events: [],
      open: false,
      price: 0
    }

    this.componentDidMount = this.componentDidMount.bind(this);
    this.getNewEvents = this.getNewEvents.bind(this);
    this.removeEvent = this.removeEvent.bind(this);

    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

  //Material-UI Functions

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  ////////////////////////////////

  componentDidMount(){
    this.props.getUser();
    this.getNewEvents();
  }

  getNewEvents(){
    axios.get('/api/events').then((response) => {
      this.setState({events: response.data})
      console.log(this.state.events)
    })
  }

  removeEvent(id){
    axios.delete(`/api/event/${id}`).then((response) => {
      console.log(response)
      this.getNewEvents();
    })
  }

  //Stripe Functions
  onToken = (token) => {
    token.card = void 0;
    axios.post('/api/payment', { token, amount: this.state.price /* the amount actually charged*/ } ).then(response => {
      
      alert('Thank you for the donation!')
    });
}

  handleChangePrice(val){
    val *= 100;
    this.setState({price: val})
  }
//////////////////////////////

  render() {
    const mappedEvents = this.state.events.map((element, index) => {
      return (
        <Event id={element.id} title={element.title} location={element.location} date={element.date} event_picture={element.event_picture} host={element.host} host_pic={element.host_pic} event_info={element.event} remove={this.removeEvent}/>
      )
    }).reverse();
    
    let {id} = this.props.user;
    console.log(this.props)

    return (
      <div className="dash-container">
        <Navbar />
        <div className="info-container">
          <img src={require('../../images/car-meet-logo.png')} />
          <div className="text-container">
            <p>Welcome to Utah Car Meet! A place where Utah car enthusiasts can create an easier way to host car meet ups to meet new people with the same passion. Click the button below and get started! </p>
            <div className="meet-btn-container">
            <Link to="/createevent"><button>Create A Meet</button></Link>
            </div>
          </div>
        </div>

        <div className="events-container">
          {mappedEvents}
        </div> 

        <div className="donation-container">
          <div className="donation-sentence">
            <h1>Help Support Utah Car Meets By</h1>
          </div>

          <div className="donation-btn">
          <Button onClick={this.handleClickOpen} size="small" style={style2}>Donating!</Button>
          <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Thank You!</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Utah Car Meet deeply appreciates your donation as it helps keep the site alive!
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Donation Amount"
                type="number"
                fullWidth
                onChange={(event) => this.handleChangePrice(event.target.value)}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="secondary">
                Cancel
              </Button>
              <StripeCheckout
                    token={this.onToken}
                    stripeKey={ 'pk_test_gj2aU1XjTqAocH35XS5o9HAc' }
                    amount={this.state.price} // The amount displayed at the bottom of the payment form
                />
            </DialogActions>
          </Dialog>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
    user: state.users.user
  }
}

export default connect(mapStateToProps, {getUser})(Dashboard);
