'use strict';

console.log('PoL');

//*** REQUIRES ***//
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const getWeather = require('./Weather');
const getMovie = require('./Movie');

const app = express();

//Enable Cors
app.use(cors());


const PORT = process.env.PORT || 3002;

//**ENDPOINTS**//

app.get('/', (request, response) => {
  console.log('Test');
  response.status(200).send('Verified and working.');
});

//**Weather GET */
app.get('/weather', getWeather);

//**Movie GET*//
app.get('/Movie', getMovie);

app.get('*', (request, response) => {
  response.status(404).send('This area does not exist.');
});





//**ERROR HANDLING**//

app.use('*', (error, request, response) => {
  response.status(500).send(error.message);
});

//****SERVER START***//
app.listen(PORT, () => console.log(`SUCCESS we are running on PORT: ${PORT}`));
