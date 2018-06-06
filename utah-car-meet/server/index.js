//Top Level Middlware
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const chalk = require('chalk');
const nodemailer = require('nodemailer');

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
    CALLBACK_URL,
    EMAIL_PASSWORD
} = process.env;

const app = express();
app.use(bodyParser.json());

//Massive Connection To Database
massive(CONNECTION_STRING).then(db => {
    console.log(chalk.blue('Connected to Database'))
    app.set('db', db);
})

//NodeMailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
        user: 'utahcarmeet@gmail.com',
        pass: EMAIL_PASSWORD
    },
    tls: {
        rejectUnauthorized: false
    }
});
//NodeMailer End Point
app.post('/send/email', (req, res) => {
    let {email, subject, message} = req.body;
    let mail = {
        from: email,
        to: email,
        subject: subject,
        html: "Email: " + email + "<br/> Subject:" + subject + "<br/> Message: " + message + "<br/> "
    }
    transporter.sendMail(mail, (error, info) => {
        if(error){
            return console.log(chalk.red('error sending email'))
        }
        console.log(chalk.green('The message has been sent!'));
        console.log(chalk.blue(info)); 
        transporter.close();
    })
    res.sendStatus(201);
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

//User End Points 
app.get('/auth/user', controller.getUser);

//Event End Points
app.get('/api/events', controller.getEvents);
app.post('/api/newevent', controller.createEvent);
app.delete('/api/event/:id', controller.deleteEvent);
app.get('/event/page/:id', controller.getEventPage);
app.put('/api/event/:id', controller.updateEvent);

//Event_Attendees End Points
app.get('/event/attendees/:id', controller.getEventAttendees);
app.post('/event/attendees', controller.attendEvent);


//Server Port
app.listen(SERVER_PORT, () => console.log(chalk.blue(`Firing on ${SERVER_PORT}`)))