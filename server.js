'use strict';

console.log('PoL');

//*** REQUIRES ***//
const express = require('express');
require('dotenv').config();
let weatherData = require('./data/weather.json');
const cors = require('cors');

const app = express();

//Enable Cors
app.use(cors());


const PORT = process.env.PORT || 3002;

//**ENDPOINTS**//

app.get('/', (request, response) => {
  console.log('Test');
  response.status(200).send('Verified and working.');
});


app.get('/weather', (request, response, next) => {
  try {
    let cityName = request.query.cityName;
    // let lat = request.query.lat;
    // let lon = request.query.lon;
    let city = weatherData.find(city => city.city_name === cityName);
    console.log(city);
    let weatherPush = city.data.map( day => new Forecast(day));
    console.log(weatherPush);
    response.status(200).send(weatherPush);
  } catch (error) {

    next(error);
  }
});

class Forecast {
  constructor(forecast) {
    this.date = forecast.valid_date;
    this.desc = forecast.weather.description;
  }


}



app.get('*', (request, response) => {
  response.status(404).send('This area does not exist.');
});





//**ERROR HANDLING**//

app.use('*', (error, request, response) => {
  response.status(500).send(error.message);
});

//****SERVER START***//
app.listen(PORT, () => console.log(`SUCCESS we are running on PORT: ${PORT}`));
