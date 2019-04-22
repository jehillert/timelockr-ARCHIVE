/* eslint-disable key-spacing, import/order, import/no-extraneous-dependencies */
require('dotenv').config();

const c = require('../server/helpers/chalks');
const chalk = require('chalk');
const Promise = require('bluebird');

const initOptions = { promiseLib: Promise };
const pgp = require('pg-promise')(initOptions);
const debug = require('debug')(c.blueBlack('database:index'));

debug(c.error(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

const config = {
  user               : process.env.PGUSER,
  password           : process.env.PGPASSWORD,
  database           : process.env.PGDATABASE,
  host               : process.env.PGHOST,
  port               : process.env.PGPORT,
  max                : process.env.PG_MAX,
  idleTimeoutMillis  : process.env.PG_IDLETIMEOUTMILLIS,
};

debug(config);

const db = pgp(config);

module.exports = db;
/*
Ubuntu Configuration:
  https://help.ubuntu.com/stable/serverguide/postgresql.html
*/
