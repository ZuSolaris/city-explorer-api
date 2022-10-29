'use strict';

//Requires Section
const express = require('express');
const app = express();
//Add Ons
require('dotenv').config();
const cors = require('cors');

//Enable Cors
app.use(cors());

//Modules
const getWeather = require('./modules/weather');
const getMovie = require('./modules/movie');

//Define Port
const PORT = process.env.PORT || 3002;

//ENDPOINTS

app.get('/', (request, response) => {
  console.log('Test');
  response.status(200).send('Server is operating correctly.');
});

//GET Requests
app.get('/weather', getWeather);


app.get('/movie', getMovie);

app.get('*', (request, response) => {
  response.status(404).send('This area does not exist.');
});

app.use((error, request, response) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`Server up on ${PORT}`));

