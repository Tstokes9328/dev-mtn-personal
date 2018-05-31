//Top Level Middlware
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

//Controller
const controller = require('./controller');

//Destructering .ENV File
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL
} = process.env;

const app = express();
app.use(bodyParser.json());

//Massive Connection To Database
massive(CONNECTION_STRING).then(db => {
    console.log('Connected to Database')
    app.set('db', db);
})

//Auth0
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize());

app.use(passport.session());
passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToken, extraParams, profile, done) => {
    let db = app.get('db');
    let {displayName, picture, id} = profile;
    db.find_user([id]).then((foundUser) => {
        if(foundUser[0]){
            done(null, foundUser[0].id)
        } else {
            db.create_user([displayName, picture, id]).then((user) => {
                done(null, user[0].id)
            })
        }
    })
}))

passport.serializeUser((id, done) => {
    done(null, id);
})

passport.deserializeUser((id, done) => {
    app.get('db').find_session_user([id]).then((user) => {
        done(null, user[0]);
    })
})

//Auth0 End Points
app.get('/login', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard',
    failureRedirect: 'http://localhost:3000/#/'
}))

//End Points 
app.get('/auth/user', controller.getUser);

app.get('/api/events', controller.getEvents);
app.post('/api/newevent', controller.createEvent);
app.delete('/api/event/:id', controller.deleteEvent);
app.get('/event/page/:id', controller.getEventPage);

//Server Port
app.listen(SERVER_PORT, () => console.log(`Firing on ${SERVER_PORT}`))