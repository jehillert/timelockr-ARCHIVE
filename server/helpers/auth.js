require('dotenv').config();
const Promise = require('bluebird');
const debug = require('debug')('server:auth');
const session = require('express-session');
const hash = require('pbkdf2-password')();
const helpers = require('./index');

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this[0]));
};

const hashPassword = (req, res, next) => {
  hash({ password: req.body.password }, function (err, pass, salt, hash) {
    if (err) {
      next(err);
    }
    req.body.hash = hash;
    req.body.salt = salt;
    next();
  });
};

/*PROBLEM AREA*/
const restrict = (req, res, next) => {
  let sess = req.sessionID
  debug(req.session);
  if (sess) {
    next();
  } else {
    res.status(401).json({message: 'Access denied.'});
  }

  // let params = ['sessions', 'session_id', req.sessionId];
  // db.queryAsync(`SELECT * FROM ?? WHERE ?? = ?;`, params)
  //   .then(next)
  //   .catch(() => res.status(401).json({message: 'Access denied.'}))
};

module.exports = {
  hashPassword,
  restrict
};