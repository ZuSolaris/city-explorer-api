'use strict';
const axios = require('axios');


async function getWeather(request,response,next){
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
}

class Forecast {
  constructor(forecast) {
    this.date = forecast.valid_date;
    this.desc = forecast.weather.description;
  }
}

module.exports = getWeather;
