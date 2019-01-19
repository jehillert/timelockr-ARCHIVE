const mysql = require('mysql');
const mysqlConfig = require('./config');

var connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = connection;
