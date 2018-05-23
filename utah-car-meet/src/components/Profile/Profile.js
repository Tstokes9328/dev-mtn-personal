import React, {Component} from 'react';
import {connect} from 'react-redux';

//Reducer Functions
import {getUser} from '../../ducks/users';
import {getUserCar} from '../../ducks/users';

//Style Sheets
import './reset.css';
import './Profile.css';
class Profile extends Component {

    componentDidMount(){
        this.props.getUser();
        this.props.getUserCar();
    }

    render() {
        let {name, location, age, profile_pic} = this.props.user;
        // let {userCar} = this.props.userCar;
        let [{car_name, year, car_bio}] = this.props.userCar;
        console.log(this.props.userCar)
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

                     {/* Car Bio Part */}

             <div className="car-info-container">
                {
                    car_name ?
                    <div>
                        <h1>{car_name}</h1>
                    </div>
                    :
                    <div>
                        <h1>Please Update Car...</h1>
                    </div>
                }
                {
                    year ?
                    <div>
                        <h1>{year}</h1>
                    </div>
                    :
                    <div>
                        <h1>Update Car Year...</h1>
                    </div>
                }
                {
                    car_bio ?
                    <div>
                        <p>{car_bio}</p>
                    </div>
                    :
                    <div>
                        <p>Please Write A Bio..</p>
                    </div>
                }
             </div>
        </div>
      );
    }
  }

  function mapStateToProps(state){
    return {
        user: state.user,
        userCar: state.userCar
    }
  }
  
  export default connect(mapStateToProps, {getUser, getUserCar})(Profile);