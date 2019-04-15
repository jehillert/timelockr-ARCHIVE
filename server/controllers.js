const debug = require('debug')('server:controllers');
const chalk = require('chalk');
const hash = require('pbkdf2-password')();
const helpers = require('./helpers/helpers');
const models = require('./models');
const auth = require('./helpers/auth');

Object.prototype.parseSqlResult = function() {
  return JSON.parse(JSON.stringify(this[0]));
};

module.exports = {
  signin: {
    post: (req, res) =>
      models.users.get(['users', 'username', req.body.username])
        .then(user => {
          user = user.parseSqlResult();
          if (!user.username) throw new Error('Invalid username.');
          return user;
        })
        .tap(user => {
          hash({ password: req.body.password, salt: user.salt }, function (err, pass, salt, hash) {
            if (err) throw err;
            if (hash !== user.hash) throw new Error('Invalid password.');
            req.session.regenerate(() => {
              req.session.user = user;
              req.session.save();
            });
          });
        })
        .then((user) => res.status(202).send({ userId: user.user_id }))
        .catch(error => console.error('Error', error))
  },

  logout: {
    get: (req, res) => req.session.destroy()
      .then(() => res.status(200).json({message: 'Logout successful.'}))
      .catch(error => console.error('Error', error))
  },

  users: {
    put: (req, res) => updateField(req, res),

    delete: (req, res) => deleteFromTable(req, res)
  },

  entries: {
    get: (req, res) => models.entries.get([
        'entries',
        'users',
        'user_id',
        'username',
        req.query.username,
        'release_date'
      ])
        .then(results => helpers.sortEntries(results))
        .then(results => res.send(results))
        .catch(error => console.error('Error', error)),

    put: (req, res) => models.general.put([
        'entries',
        'release_date',
        req.body.data.releaseDate,
        'entry_id',
        req.body.data.entryId,
    ])
      .then(() => res.sendStatus(201))
      .catch(error => console.error('Error', error)),

    post: (req, res) => models.entries.post([
      'entries',
      'user_id',
      'creation_date',
      'release_date',
      'description',
      'content',
      req.body.userId,
      req.body.creationDate,
      req.body.releaseDate,
      req.body.description,
      req.body.content,
    ])
      .then(results => res.sendStatus(201))
      .catch(error => console.error('Error', error)),

    delete: (req, res) => {
      return models.general
        .delete(['entries', 'entry_id', req.body.entryId])
        .then(results => res.sendStatus(201))
        .catch(error => console.error('Error', error));
    }
  },

  signup: {
    post: (req, res) => models.users
      .post(['users', 'username', 'hash', 'salt', req.body.username, req.body.hash, req.body.salt])
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

function updateField(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .put(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}
