var express = require("express");
var bodyParser = require("body-parser");
var request = require("request");
var app = express();
var helper = require('./helpers/apiHelpers.js')
var db = require('./models/movieModel.js')
// Sign up and get your moviedb API key here:
// https://www.themoviedb.org/account/signup

//Helpers
var apiHelpers = require("./helpers/apiHelpers.js");
const { postFavorite } = require("./models/movieModel.js");

//Middleware
app.use(express.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + "/../client/dist"));

//***********************************************************************************************************************

/*
Use the routes below to build your application:

|      URL         | HTTP Verb |  Result                                                     |
| :------------:   | :-------: |------------------------------------------------------:      |
|     /genres      |   GET     |  Respond with JSON of all genres                            |
|     /search      |   GET     |  Respond with JSON of all movies by the selected genre      |
|     /save        |   POST    |  Save selected movie as favorite                            |
|     /delete      |   POST    |  Remove selected movie as favorite                          |

*/

//TODO: Pick one of the two route options below:
//OPTION 1: Use regular routes, where endpoints are pre-defined on this page, you do NOT need to refer to /server/routes/movieRoutes.js file
//OPTION 2: Use Express Router, where the routes are defined under /server/routes/movieRoutes.js file

//***********************************************************************************************************************
//OPTION 1: Use regular routes;
//If you are using OPTION 1, you do not need routes>movieRoutes.js file

app.get("/genres", function(req, res) {
  // make an axios request to get the official list of genres from themoviedb
  // use this endpoint. you will need your API key from signup: https://api.themoviedb.org/3/genre/movie/list
  helper.getGenres((err, data) => {
    if (err) {
      console.log(err)
    } else {
      console.log(data.genres)
      var genresArray = data.genres;
      var finito = [];
      genresArray.forEach(genre => {
        var completed = db.postGenres(genre)
        finito.push(completed)
      })
      Promise.all(finito)
      .then(() => {
        res.send(genresArray)
      })
      .catch(err => {
        res.send(err)
      })
    }
  })
});

app.get("/search", function(req, res) {
  // use this endpoint to search for movies by genres (using API key): https://api.themoviedb.org/3/discover/movie
  // and sort them by votes (worst first) using the search parameters in themoviedb API
  // do NOT save the results into the database; render results directly on the page
  console.log('req body -----> ', req.body)
  var genreVar = req.body.genre;
  helper.getMoviesByKeyword(genreVar, (err, data) => {
    if (err) {
      console.log(err)
    } else {
      //var send = res.data.results.sort(vote_average)
      console.log('FRRRRR NOTICE MEMMEEMEMEEEEE ', data.results)

      var movies = data.results
      movies.sort((a, b) => {
        let movieA = a.vote_average;
        let movieB = b.vote_average;
        if (movieA < movieB) {
          return -1;
      }
      if (movieA > movieB) {
          return 1;
      }
      return 0;
      })
    }
    res.send(movies)
  })
});

app.post("/save", function(req, res) {
  //save movie as favorite into the database
  console.log(req.body.title)
  db.postFavorite(req.body.id, (err, response) => {
    if (err) {
      res.sendStatus(404).send('good ol error in post route-->  ', err)
    } else {
      console.log(`successfully added movie ${response} to favorites`)
      res.sendStatus(200).send(response)
    }
  }
  )
});

app.post("/delete", function(req, res) {
  //remove movie from favorites into the database

});

//***********************************************************************************************************************
// OPTION 2: Use Express Router

// IF you decide to go with this OPTION 2, delete OPTION 1 to continue

// Routes
// const movieRoutes = require("./routes/movieRoutes.js");

// //Use routes
// app.use("/movies", movieRoutes);

app.listen(3000, function() {
  console.log("listening on port 3000!");
});
