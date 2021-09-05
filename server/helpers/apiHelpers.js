const request = require('request');
const axios = require('axios');
const { API_KEY } = require('../../config.js');

// write out logic/functions required to query TheMovieDB.org
// https://api.themoviedb.org/3/movie/550?api_key=b940a5e10fb325c0791b0cea3dad5b51
// FOR REFERENCE:
// https://www.themoviedb.org/account/signup
// https://developers.themoviedb.org/3/discover/movie-discover
// Get your API Key and save it in your config file
let getMoviesByKeyword = (keyword, callback) => {
  console.log('genre provided to helper ---> ', keyword)

  let options = {
    url: `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${keyword}&page=1`,
    headers: {
      'User-Agent': 'request',
      //'Authorization': `token ${config.TOKEN}`
    }
  }
  axios.request(options)
  .then(res => {
    console.log('CALLBACK NOTICE ME')
    callback (null, res.data)
  })
  .catch(err => {
    console.log(err)
  })
}


let getGenres = (callback) => {
  let options = {
    url: `https://api.themoviedb.org/3/genre/movie/list?api_key=b940a5e10fb325c0791b0cea3dad5b51&language=en-US`,

    headers: {
      'User-Agent': 'request',
      //'Authorization': `token ${config.TOKEN}`
    }
  }
  axios.request(options)
  .then(res => {
    console.log('CALLBACK NOTICE ME')
    callback (null, res.data)
  })
  .catch(err => {
    console.log(err)
  })
}
// Don't forget to export your functions and require them within your server file
module.exports = {getMoviesByKeyword: getMoviesByKeyword, getGenres: getGenres};