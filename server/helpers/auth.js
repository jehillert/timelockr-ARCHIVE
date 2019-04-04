const debug = require('debug')('server:auth');
const hash = require('pbkdf2-password')();

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

function restrict(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.session.error = 'Access denied!';
    res.redirect('/login');
  }
}

module.exports = {
  hashPassword,
  restrict
};