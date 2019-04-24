/* eslint-disable key-spacing, import/order, import/no-extraneous-dependencies */
require('dotenv').config();

const c = require('../server/helpers/chalks');
const chalk = require('chalk');
const Promise = require('bluebird');

const debug = require('debug')(c.blueBlack('database:index'));
debug(c.error(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);

const connectionString = process.env.DATABASE_URL
const db = pgp(connectionString);

module.exports = db;

// const config = {
//   user               : process.env.PGUSER,
//   password           : process.env.PGPASSWORD,
//   database           : process.env.PGDATABASE || 'db',
//   host               : process.env.PGHOST || 'localhost',
//   port               : process.env.PGPORT || 5432,
//   max                : process.env.PG_MAX || 100,
//   idleTimeoutMillis  : process.env.PG_IDLETIMEOUTMILLIS || 30000,
//   ssl                : process.env.PG_SSL || true,
// };
//
// debug(config);
//
// const db = pgp(config);
//
// module.exports = db;
