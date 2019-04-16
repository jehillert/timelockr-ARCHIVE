/* eslint-disable no-multi-assign */
/* eslint-disable key-spacing */
require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('server:app');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const router = require('./routes.js');

// initialize server for appropriate dbms
const app = module.exports = express();
const PORT = process.env.PORT || 3000;
const dbms = process.env.DBMS || 'mysql';

// session
const options = {
  host            : process.env.MYSQL_DB_HOST,
  port            : process.env.MYSQL_DB_PORT,
  user            : process.env.MYSQL_DB_USER,
  password        : process.env.MYSQL_DB_PASS,
  database        : process.env.MYSQL_DB_NAME,
};

debug('Server Status: %o', 'DEVELOPMENT MODE - Debugging enabled...');
debug(options);

if (dbms === 'mysql') {
  const sessionStore = new MySQLStore(options);

  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(cors());

  app.use(session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: true,
    rolling: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      domain: 'localhost:8080',
      path: '/',
      secure: false,
    },
  }));

  app.use('/api/keepsafe', router);
  app.set('port', PORT);
  app.listen(app.get('port'), () => (
    debug(`Node app started. Listening on port ${PORT}`)
  ));
}
