import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

//Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';

//Reducer Function
import { getUser } from "../../ducks/users";

//StyleSheet
import './reset.css';
import './navbar.css';

const style = {
    color: 'white',
    textDecoration: 'none'
}

class Navbar extends Component {
    constructor(){
        super()

        this.state = {
            logoutOpen: false,
            contactOpen: false
        }

        this.logoutHandleClickOpen = this.logoutHandleClickOpen.bind(this);
        this.logoutHandleClose = this.logoutHandleClose.bind(this);
        this.contactHandleClickOpen = this.contactHandleClickOpen.bind(this);
        this.contactHandleClose = this.contactHandleClose.bind(this);
    }

    componentDidMount(){
        this.props.getUser();
    }

    logoutHandleClickOpen = () => {
        this.setState({ logoutOpen: true });
    };
    
    logoutHandleClose = () => {
        this.setState({ logoutOpen: false });
    };

    contactHandleClickOpen = () => {
        this.setState({ contactOpen: true });
    };
    
    contactHandleClose = () => {
        this.setState({ contactOpen: false });
    };

    render(){
        let {profile_pic, id} = this.props.user
        return(
            <div className="nav-container">

            <div className="nav-picture">
                <Avatar alt="Navigation Picture" src={profile_pic}/>
                <Button><Link to={`/profile/${id}`} style={style}>Profile</Link></Button>
            </div>

            <div className="nav-list">
                <Button style={style}><Link to="/dashboard" style={style}>Dashboard</Link></Button>

                <Button onClick={this.contactHandleClickOpen} style={style}>Contact</Button>
                    <Dialog
                    open={this.state.contactOpen}
                    onClose={this.contactHandleClose}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title">Contact Us!</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        For any questions or concerns you can reach us via E-mail.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.contactHandleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.contactHandleClose} color="primary">
                        Subscribe
                        </Button>
                    </DialogActions>
                </Dialog>

                <Button onClick={this.logoutHandleClickOpen} style={style}>Logout</Button>
                    <Dialog
                    open={this.state.logoutOpen}
                    onClose={this.logoutHandleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                        Are You Sure You Want To Logout?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.logoutHandleClose} color="primary">
                        Cancel
                        </Button>
                        <Button onClick={this.logoutHandleClose} color="primary" autoFocus>
                        <Link to="/">Logout</Link>
                        </Button>
                    </DialogActions>
                </Dialog>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
   return   {
       user: state.users.user
   }
}

export default connect(mapStateToProps, {getUser})(Navbar);