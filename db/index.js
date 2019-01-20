const mysql = require('mysql');
var Promise = require("bluebird");
const mysqlConfig = require('./config');

// Promise.promisifyAll(require("mysql/lib/Connection").prototype);

var connection = mysql.createConnection(mysqlConfig);

connection = Promise.promisifyAll(connection);

connection.connect();

module.exports = connection;
