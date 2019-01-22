const mysql = require('mysql');
const Promise = require('bluebird');
const mysqlConfig = require('./config');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);

var connection = mysql.createConnection(mysqlConfig);

// const connection = mysql.createConnection({.....});
// global.db  = Promise.promisifyAll(connection);
// db.queryAsync('SELECT * FROM users').then(function(rows){
// console.log(rows);});

connection.connect();

module.exports = connection;
