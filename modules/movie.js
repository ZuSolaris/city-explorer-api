'use strict';
const axios = require('axios');

let cache = require('../cache.js');

module.exports = getMovie;


async function getMovie(request, response, next) {
  try {
    let { query } = request.query;
    //KEYS
    let key = query + 'movie';

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 20)) {
      console.log('Cache Hit, movie data re-sent');
      response.status(200).send(cache[key].data);

    } else {
      console.log('cache missed, no data present');
      let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
      console.log('looking up movies', url);
      let movieResults = await axios.get(url);
      let movieData = movieResults.data.results.map(show => new Showtime(show));
      //Adds API to return cache.
      cache[key] = {
        data: movieData,
        timestamp: Date.now()
      };
      console.log('found some movies', movieData.length);
      response.status(200).send(cache[key].data);
    }
  } catch (error) {

    next(error);
  }
}

class Showtime {
  constructor(showTime) {
    this.title = showTime.title;
    this.review = showTime.overview;
  }
}



