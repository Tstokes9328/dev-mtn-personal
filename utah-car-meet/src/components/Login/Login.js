import React, {Component} from 'react';
import {Link} from 'react-router-dom';

//StyleSheets
import './reset.css';
import './login.css';

//Particle JS
import Particles from 'react-particles-js';

class Login extends Component {
    render() {
        console.log(process.env.REACT_APP_LOGIN);
      return (
        <div>
            <Particles params={{
                "particles": {
                "number": {
                    "value": 100,
                    "density": {
                    "enable": true,
                    "value_area": 800
                    }
                },
                "color": {
                    "value": "#23abff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                    "width": 0,
                    "color": "#000000"
                    },
                    "polygon": {
                    "nb_sides": 5
                    },
                    "image": {
                    "src": "img/github.svg",
                    "width": 100,
                    "height": 100
                    }
                },
                "opacity": {
                    "value": 1,
                    "random": true,
                    "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0,
                    "sync": false
                    }
                },
                "size": {
                    "value": 2,
                    "random": true,
                    "anim": {
                    "enable": false,
                    "speed": 4,
                    "size_min": 0.3,
                    "sync": false
                    }
                },
                "line_linked": {
                    "enable": false,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 1,
                    "direction": "none",
                    "random": true,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 600
                    }
                }
                },
                "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                    "enable": true,
                    "mode": "bubble"
                    },
                    "onclick": {
                    "enable": true,
                    "mode": "repulse"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                    "distance": 400,
                    "line_linked": {
                        "opacity": 1
                    }
                    },
                    "bubble": {
                    "distance": 50,
                    "size": 0,
                    "duration": 2,
                    "opacity": 0,
                    "speed": 3
                    },
                    "repulse": {
                    "distance": 400,
                    "duration": 0.4
                    },
                    "push": {
                    "particles_nb": 4
                    },
                    "remove": {
                    "particles_nb": 2
                    }
                }
                },
                "retina_detect": true
            }}
            />
            <div className="container"> 
                <img src={require('../../images/real-logo.png')} className="logo" />
                <a href={process.env.REACT_APP_LOGIN}
                ><button className="btn-start">GET STARTED</button></a>
            </div>
        </div>
      );
    }
  }
  
  export default Login;
  