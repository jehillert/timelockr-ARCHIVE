const debug = require('debug')('server:controllers');
const hash = require('pbkdf2-password')();
const helpers = require('./helpers');
const models = require('./models');
const auth = require('./helpers/auth');

module.exports = {
  login: {
    post: (req, res) =>
      models.credentials.get(['username', req.body.username])
        .then(user => auth.verifyUserAsync(user))
        .tap(user => { debug(user) })
        .tap(req => { helpers.debugReq(req) } )
        .tap(req.session.regenerate(() => { req.session.user = user }))
        .then(res.status(200).json({message: `Login successful.`}))
        .catch(error => console.error('Error', error))
  },

  logout: {
    get: (req, res) => req.session.destroy()
      .then(() => res.status(200).json({message: 'Logout successful.'}))
      .catch(error => console.error('Error', error))
  },

  credentials: {
    put: (req, res) => updateField(req, res),
    post: (req, res) => createUser(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  },

  secrets: {
    get: (req, res) =>
      getData(req, res)
        .then(results => helpers.filterAndFormatSecrets(results))
        .then(results => res.json(results)),
    put: (req, res) => updateField(req, res),
    post: (req, res) => postToTable(req, res),
    delete: (req, res) => deleteFromTable(req, res)
  }
};

function createUser(req, res) {
  hash({ password: req.body.password }, function (err, pass, salt, hash) {
    if (err) {
      throw err;
    }
    req.body.salt = salt;
    req.body.password = hash;
  });

  let params = helpers.getQueryParams(req);

  req => { helpers.debugReq(req) };
  models[params[0]]
    .post(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function deleteFromTable(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function getData(req, res) {
  let params = helpers.getQueryParams(req);
  // if (req.query.username) {
  //   params.splice(1, 0, 'username', req.query.username);
  // }
  return (
    models[params[0]]
      .get(params)
      .tap(req => { helpers.debugReq(req) })
      .tap(results => { debug(results) })
      .catch(error => console.error('Error', error))
  );
}

function postToTable(req, res) {
  let params = helpers.getQueryParams(req);
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
