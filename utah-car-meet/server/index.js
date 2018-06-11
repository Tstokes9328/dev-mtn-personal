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
const stripe = require("stripe")(process.env.STRIPE_SECRET);



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
    EMAIL_PASSWORD,
    SUCCESS_REDIRECT,
    FAILURE_REDIRECT
} = process.env;

const app = express();
app.use(bodyParser.json());

//Massive Connection To Database
massive(CONNECTION_STRING).then(db => {
    console.log(chalk.blue('Connected to Database'))
    app.set('db', db);
})

//Static Build
app.use( express.static( `${__dirname}/../build` ) );

//Stripe
app.post('/api/payment', function(req, res, next){
    // convert amount to pennies
    const amountArray = req.body.amount.toString().split('');
    const pennies = [];
    for (var i = 0; i < amountArray.length; i++) {
      if(amountArray[i] === ".") {
        if (typeof amountArray[i + 1] === "string") {
          pennies.push(amountArray[i + 1]);
        } else {
          pennies.push("0");
        }
        if (typeof amountArray[i + 2] === "string") {
          pennies.push(amountArray[i + 2]);
        } else {
          pennies.push("0");
        }
          break;
      } else {
          pennies.push(amountArray[i])
      }
    }
    const convertedAmt = parseInt(pennies.join(''));
  
    const charge = stripe.charges.create({
        amount: convertedAmt, // amount in cents, again
        currency: 'usd',
        source: req.body.token.id,
        description: 'Test charge from react app'
    }, function(err, charge) {
        if (err) return res.sendStatus(500)
        return res.sendStatus(200);
        // if (err && err.type === 'StripeCardError') {
        //   // The card has been declined
        // }
    });
  });

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
        to: 'utahcarmeet@gmail.com',
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
    successRedirect: SUCCESS_REDIRECT,
    failureRedirect: FAILURE_REDIRECT
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


//Event_Chatbox End Points
app.get('/event/chat/:id', controller.getEventChat);
app.post('/event/chat/message/:id', controller.postChatMessage);

//Profile End Points
app.get('/users/profile/:id', controller.getUserProfile);

//Server Port
app.listen(SERVER_PORT, () => console.log(chalk.blue(`Firing on ${SERVER_PORT}`)))