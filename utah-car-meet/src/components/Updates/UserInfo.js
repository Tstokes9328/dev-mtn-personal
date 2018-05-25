import React, { Component } from "react";
import { connect } from "react-redux";

//StyleSheet CSS
import './userinfo.css';

//Materil UI
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

//Colors    
import purple from "@material-ui/core/colors/purple";
import Button from "@material-ui/core/Button";

//App Bar
    import AppBar from '@material-ui/core/AppBar';
    import Toolbar from '@material-ui/core/Toolbar';
    import Typography from '@material-ui/core/Typography';
    import IconButton from '@material-ui/core/IconButton';
    import MenuIcon from '@material-ui/icons/Menu';
    import AccountCircle from '@material-ui/icons/AccountCircle';
    import Switch from '@material-ui/core/Switch';
    import FormControlLabel from '@material-ui/core/FormControlLabel';
    import FormGroup from '@material-ui/core/FormGroup';
    import MenuItem from '@material-ui/core/MenuItem';
    import Menu from '@material-ui/core/Menu';

    const styles = {
        root: {
          flexGrow: 1,
        },
        flex: {
          flex: 1,
        },
        menuButton: {
          marginLeft: -12,
          marginRight: 20,
        },
      };
    



//Reducer Functions

class UserInfo extends Component {
    constructor(props){
        super(props)

        this.state = {
            auth: true,
            anchorEl: null
        }
    }

    //App Bar Functions
    handleChange = (event, checked) => {
        this.setState({ auth: checked });
      };
    
      handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

  render(props) {
    //MUI Theme
    const theme = createMuiTheme({
      palette: {
        primary: { main: purple[500] }, // Purple and green play nicely together.
        secondary: { main: "#11cb5f" } // This is just green.A700 as hex.
      }
    });
    //App Bar
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              UTAH CAR MEET
            </Typography>
            {auth && (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                </Menu>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </div>
        <div>
          <Button color="primary">Primary</Button>
          <Button color="secondary">Secondary</Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

UserInfo.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(UserInfo);
