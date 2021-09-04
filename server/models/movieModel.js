//Select one db to work with:

//For SQL
const sqlDb = require('../../db/sql');
const axios = require('axios')
//For Mongo
//const mongoDb = require('../../db/mongodb')

module.exports = {
  postGenres: ('/genres', (req, res) => {
    var queryString = 'INSERT INTO genres (genre_id, name) VALUES(?, ?);';
    sqlDb.query(queryString, [req.id, req.name], (err, response) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`successfully posted ${req.name} to db`)
      }
    })
  }),

  postFavorite: ('/save', (req, res) => {
    var queryString = 'INSERT INTO favorites (movie_id) VALUES (?);';
    sqlDb.query(queryString, [], (err, response) => {
      if(err) {
        console.log(err)
      } else {
        console.log(`successfully posted ${response} to db`)
        res.sendStatus(201)
      }
    })
  })
}