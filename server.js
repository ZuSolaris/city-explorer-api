'use strict';

console.log('PoL');

//*** REQUIRES ***//
const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const { response } = require('express');

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
app.get('/weather', async (request, response, next) => {
  try {
    let { searchQuery, lat, lon } = request.query;
    console.log(lat, lon);
    let results = await axios.get(`http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}`);
    console.log(results.data);
    let weatherData = results.data.data.map(day => new Forecast(day));
    response.status(200).send(weatherData);
  } catch (error) {

    next(error);
  }
});

//**Movie GET*//
app.get('/Movie', async (request, response, next) => {
  try {
    let {query} = request.query;
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
    console.log('looking up movies', url);
    let movieResults = await axios.get(url);
    let movieData = movieResults.data.results.map(show => new Showtime(show));
    console.log('found some movies',movieData.length);
    response.status(200).send(movieData);
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

class Showtime {
  constructor(showTime) {
    this.title = showTime.title;
    this.review = showTime.overview;


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
