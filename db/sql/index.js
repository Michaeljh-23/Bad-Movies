const mysql = require('mysql');
const mysqlConfig = require('../../config.js');
const { connect } = require('../../server/routes/movieRoutes.js');

const connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = connection;