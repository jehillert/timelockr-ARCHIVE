require('dotenv').config();
const cors = require('cors');
const debug = require('debug')('TimeLocker:server');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const router = require('./routes.js');

// initialize server
const app = module.exports = express();
const PORT = process.env.PORT || 3000;

// session
const options = {
  host            : process.env.DB_HOST,
  port            : process.env.DB_PORT,
  user            : process.env.DB_USER,
  password        : process.env.DB_PASS,
  database        : process.env.DB_NAME
};

const sessionStore = new MySQLStore(options);

// middleware
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
    maxAge: 24*60*60*1000,
    domain:'localhost:8080',
    path: '/',
    secure: false
  }
}));

// router
app.use('/api/keepsafe', router);

app.set('port', PORT);
app.listen(app.get('port'), function() {
  console.log(`Node app started. Listening on port ${PORT}`);
});

/*do not delete*/
// require('dotenv').config();
// const cors = require('cors');
// const debug = require('debug')('TimeLocker:server');
// const express = require('express');
// const bodyParser = require('body-parser');
// const router = require('./routes.js');
// const PORT = process.env.PORT || 3000;

// const app = express();
// module.exports.app = app;

// app.use(bodyParser.json());
// app.use(cors());
// app.use('/api/keepsafe', router);

// app.set('port', PORT);
// app.listen(app.get('port'), function() {
//   console.log(`Node app started.  Listening on port ${PORT}`);
// });
