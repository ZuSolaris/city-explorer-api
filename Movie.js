'use strict';
const axios = require('axios');


async function getMovie(request,response,next){
  try {
    let { query } = request.query;
    let url = (`https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${query}`);
    console.log('looking up movies', url);
    let movieResults = await axios.get(url);
    let movieData = movieResults.data.results.map(show => new Showtime(show));
    console.log('found some movies', movieData.length);
    response.status(200).send(movieData);
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

module.exports = getMovie;

