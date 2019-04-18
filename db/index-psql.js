
import chalk from 'chalk';
import * as Debug from 'debug';
import Promise from 'bluebird';
import repos from './repos';

const debug = Debug(chalk.hex('#8ecfe3').bgHex('#08134A')('client:components:main-menu'));

debug('Database Status (PostgreSQL): %o', 'DEVELOPMENT MODE - Debugging enabled...');
debug(chalk.white('Database Status (PostgreSQL):'), chalk.white.bold.bgRed(' DEVELOPMENT MODE '), chalk.inverse(' Debugging Enabled '));

const initOptions = {
  promiseLib: Promise,

  extend(obj, dc) {
    obj.users = new repos.Users(obj, pgp);
    obj.products = new repos.Products(obj, pgp);
  },
};

const pgp = require('pg-promise')(initOptions);

const config = {
  user: process.env.PSQL_DB_USER,
  password: process.env.PSQL_DB_PASS,
  database: process.env.PSQL_DB_NAME,
  host: process.env.PSQL_DB_HOST,
  port: process.env.PSQL_DB_PORT,
  max: process.env.PSQL_DB_MAX,
  idleTimeoutMillis: process.env.PSQL_DB_IDLETIMEOUTMILLIS,
};

debug(config);

const db = pgp(config);

module.exports = db;
