// eslint-disable-next-line no-unused-vars
const debug = require('debug')('TimeLocker:database');
const mysql = require('mysql');
const Promise = require('bluebird');
Promise.promisifyAll(require('mysql/lib/Connection').prototype);

const mysqlConfig = {
  host               : process.env.MYSQL_DB_HOST,
  user               : process.env.MYSQL_DB_USER,
  password           : process.env.MYSQL_DB_PASS,
  database           : process.env.MYSQL_DB_NAME,
};

const connection = mysql.createConnection(mysqlConfig);
connection.connect();

if (process.env.DB_DBMS === 'postgres') {
  const psqlConfig = {
    user               :process.env.PSQL_DB_USER,
    password           :process.env.PSQL_DB_PASS,
    database           :process.env.PSQL_DB_NAME,
    host               :process.env.PSQL_DB_HOST,
    port               :process.env.PSQL_DB_PORT,
    max                :process.env.PSQL_DB_MAX,
    idleTimeoutMillis  :process.env.PSQL_DB_IDLETIMEOUTMILLIS,
  }

  const pool = new pg.Pool(psqlConfig)
  pool.on('error', err => (console.log('idle client error', err.message, err.stack)))
}

module.exports = connection;
