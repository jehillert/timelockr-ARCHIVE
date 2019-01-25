const mysql = require('mysql');
const Promise = require('bluebird');
const mysqlConfig = require('./config');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);

var connection = mysql.createConnection(mysqlConfig);

connection.connect();

module.exports = connection;
