/* eslint-disable key-spacing */
const chalk = require('chalk');
const debug = require('debug')(`db:${process.env.DBMS}`);
const mysql = require('mysql');
const pg = require('pg-promise');
const Promise = require('bluebird');

Promise.promisifyAll(require('mysql/lib/Connection').prototype);

let connection;

if (process.env.DBMS === 'postgres') {
  debug('Database Status (PostgreSQL): %o', 'DEVELOPMENT MODE - Debugging enabled...');
  debug(chalk.white('Database Status (PostgreSQL):'), chalk.white.bold.bgRed(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

  const psqlConfig = {
    user               : process.env.PSQL_DB_USER,
    password           : process.env.PSQL_DB_PASS,
    database           : process.env.PSQL_DB_NAME,
    host               : process.env.PSQL_DB_HOST,
    port               : process.env.PSQL_DB_PORT,
    max                : process.env.PSQL_DB_MAX,
    idleTimeoutMillis  : process.env.PSQL_DB_IDLETIMEOUTMILLIS,
  };

  debug(psqlConfig);

  const pool = new pg.Pool(psqlConfig);
  pool.on('error', err => (debug('idle client error', err.message, err.stack)));
}

if (process.env.DBMS === 'mysql') {
  debug(chalk.white('Database Status (MySQL):'), chalk.white.bold.bgRed(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));
  const mysqlConfig = {
    host               : process.env.MYSQL_DB_HOST,
    user               : process.env.MYSQL_DB_USER,
    password           : process.env.MYSQL_DB_PASS,
    database           : process.env.MYSQL_DB_NAME,
  };

  debug(mysqlConfig);

  connection = mysql.createConnection(mysqlConfig);
  connection.connect();
}

module.exports = connection;
