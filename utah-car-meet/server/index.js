require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');

const app = express();
app.use(bodyParser.json());

const {
    PORT,
    CONNECTION_STRING
} = process.env;

massive(CONNECTION_STRING).then(db => {
    console.log('Connected to Database')
    app.set('db', db);
})

app.listen(PORT, console.log(`Firing on ${PORT}`))