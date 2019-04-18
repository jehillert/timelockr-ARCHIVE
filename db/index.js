/* eslint-disable key-spacing */
const chalk = require('chalk');
const debug = require('debug')(chalk.hex('#8ecfe3').bgHex('#08134A')(`db:${process.env.DB}`));
const Promise = require('bluebird');

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);

debug('Database Status (PostgreSQL): %o', 'DEVELOPMENT MODE - Debugging enabled...');
debug(chalk.white('Database Status (PostgreSQL):'), chalk.white.bold.bgRed(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

const config = {
  user               : process.env.PSQL_DB_USER,
  password           : process.env.PSQL_DB_PASS,
  database           : process.env.PSQL_DB_NAME,
  host               : process.env.PSQL_DB_HOST,
  port               : process.env.PSQL_DB_PORT,
  max                : process.env.PSQL_DB_MAX,
  idleTimeoutMillis  : process.env.PSQL_DB_IDLETIMEOUTMILLIS,
};

debug(config);

const db = pgp(config);

module.exports = db;
