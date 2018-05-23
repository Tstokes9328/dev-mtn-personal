import React, {Component} from 'react';
import {connect} from 'react-redux';

//Reducer Functions
import {getUser} from '../../ducks/users';

//Style Sheets
import './reset.css';
import './Profile.css';
class Profile extends Component {

    componentDidMount(){
        this.props.getUser();
    }

    render() {
        let {name, location, age, profile_pic,} = this.props.user;
      return (
        <div>
            <div className="navigation">
            </div>
            <div className="personal-info">
            {
                profile_pic ?
                <div className="img-container">
                    <img src={profile_pic} alt="user-pic" className="picture"/>
                </div>
                :
                <div className="img-container">
                    <img src={require('../../images/noprofile.png')} alt="no-pic" className="picture"/>
                </div>
            }  
            {
                name ?
                <div className="name-container">
                    <div className="name-title">
                        <h1>Name</h1>
                    </div>
                    <div className="name-content">
                        <h1>{name}</h1>
                    </div>
                </div>
                :
                <div className="name-container">
                    <div className="name-title">
                        <h1>Name</h1>
                    </div>
                    <div className="name-content">
                        <h1>Please Choose a Name...</h1>
                    </div>
                </div>
            }
            {
                location ?
                <div className="location-container">
                    <div className="location-title">
                        <h1>Location:</h1>
                    </div>
                    <div className="location-content">
                        <h1>{location}</h1>
                    </div>
                </div>
                :
                <div className="location-container">
                    <div className="location-title">
                        <h1>Location</h1>
                    </div>
                    <div className="location-content">
                        <h1>Please Choose a Location...</h1>
                    </div>
                </div>
            }
            {
                age ?
                <div className="age-container">
                    <div className="age-title">
                        <h1>Age:</h1>
                    </div>
                    <div className="age-content">
                        <h1>{age}</h1>
                    </div>
                </div>
                :
                <div className="age-container">
                    <div className="age-title">
                        <h1>Age</h1>
                    </div>
                    <div className="age-content">
                        <h1>Please Choose an Age...</h1>
                    </div>
                </div>
            }
            </div>
            <hr className="section-break"/>
        </div>
      );
    }
  }

  function mapStateToProps(state){
    return {
        user: state.user
    }
  }
  
  export default connect(mapStateToProps, {getUser})(Profile);