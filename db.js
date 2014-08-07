var mysql = require('mysql'),
	config = require('./config').config;

var connection = mysql.createConnection(config.db);

module.exports = connection;