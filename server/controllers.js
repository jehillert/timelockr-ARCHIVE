const debug = require('debug')('server:controllers');
const hash = require('pbkdf2-password')();
const helpers = require('./helpers');
const models = require('./models');
const auth = require('./helpers/auth');
const util = require('util');

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports = {
  signin: {
    post: (req, res) =>
      models.credentials.get(['credentials', 'username', req.body.username])
        .then(user => {
          // debug(req);
          user = user.parseSqlResult();
          if (!user.username) throw new Error('Invalid username.');
          return user;
        })
        .then(user => {
          hash({ password: req.body.password, salt: user.salt }, function (err, pass, salt, hash) {
            if (err) throw err;
            if (hash !== user.hash) throw new Error('Invalid password.');
            req.session.regenerate(() => {
              req.session.user = user;
              req.session.save();
            });
          });
        })
        .then(() => res.sendStatus(202))
        .catch(error => console.error('Error', error))
  },

  logout: {
    get: (req, res) => req.session.destroy()
      .then(() => res.status(200).json({message: 'Logout successful.'}))
      .catch(error => console.error('Error', error))
  },

  credentials: {
    put: (req, res) => updateField(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  },

  secrets: {
    get: (req, res) =>
      models.secrets.get(['secrets', 'user_id', 'username', req.query.username])
        .then(results => helpers.filterAndFormatSecrets(results))
        .then(results => res.json(results))
        .catch(error => console.error('Error', error)),
    put: (req, res) => updateField(req, res),
    post: (req, res) => postToTable(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  },

  signup: {
    post: (req, res) =>
      models.credentials
        .post([ 'credentials',
                'username',
                'hash',
                'salt',
                req.body.username,
                req.body.hash,
                req.body.salt])
        .then(results => res.sendStatus(201))
        .catch(error => res.sendStatus(409))
        // .then(results => res.status(201).json({message: 'New user successfully created.'}))
  }
};

function deleteFromTable(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function postToTable(req, res) {
  let params = helpers.getQueryParams(req);
  debug(params);
  models[params[0]]
    .post(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function updateField(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .put(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

