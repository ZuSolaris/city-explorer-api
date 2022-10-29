'use strict';
const axios = require('axios');

let cache = require('../cache.js');

module.exports = getWeather;

async function getWeather(request, res, next) {
  try {
    //user submission
    let { query, lat, lon } = request.query;
    //keys
    const key = query + lat + lon;


    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 20)) {
      console.log('Cache hit, weather data resent');
      res.status(200).send(cache[key].data);

    } else {
      console.log('Cache miss, no weather data present');
      const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHERBIT_API_KEY}&lat=${lat}&lon=${lon}&days=5`;
      console.log(url);
      let response = await axios.get(url);
      let weatherArr = parseWeather(response.data);
      cache[key] = {
        timestamp: Date.now(),
        data: weatherArr
      };
      res.status(200).send(cache[key].data);
    }
  }
  catch (error) {

    next(error);
  }
}


function parseWeather(weatherData) {

  try {
    const weatherSummaries = weatherData.data.map(day => {
      return new Weather(day);
    });
    return weatherSummaries;
  } catch (error) {
    return (error);
  }
}

class Weather {
  constructor(day) {
    this.desc = day.weather.description;
    this.date = day.datetime;
  }
}

