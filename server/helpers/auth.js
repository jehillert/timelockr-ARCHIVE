const Promise = require('bluebird');
const hash = require('pbkdf2-password')();

verifyUserAsync = Promise.promisify(
  (user) => {
    if (!user.username) {
      throw new Error('Invalid username.');
    }
    hash({ password: user.password, salt: user.salt }, function (err, pass, salt, hash) {
      if (err) {
        return fn(err);
      }
      if (hash !== user.hash) {
        throw new Error('Invalid password.');
      }
      return user;
    });
  }
);

const restrict = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({message: 'Access denied.'});
  }
}

module.exports = {
  verifyUserAsync,
  restrict
}