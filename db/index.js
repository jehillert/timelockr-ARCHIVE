const debug = require('debug')('TimeLocker:database');
const mysql = require('mysql');
const Promise = require('bluebird');
Promise.promisifyAll(require('mysql/lib/Connection').prototype);

const mysqlConfig = {
  host               : process.env.DB_HOST,
  user               : process.env.DB_USER,
  password           : process.env.DB_PASS,
  database           : process.env.DB_NAME,
};

var connection = mysql.createConnection(mysqlConfig);
connection.connect();

module.exports = connection;