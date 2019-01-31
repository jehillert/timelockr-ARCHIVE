const debug = require('debug')('TimeLocker:server:controllers');
const Promise = require('bluebird');
const models = require('./models');
const moment = require('moment');
const helpers = require('./../lib/helpers.js');

module.exports = {
  credentials: {
    get: (req, res) => getData(req, res).then(results => res.json(results)),
    put: (req, res) => updateField(req, res),
    post: (req, res) => postToTable(req, res),
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

function deleteFromTable(req, res) {
  let params = helpers.getQueryParams(req);
  models.general
    .delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function getData(req, res) {
  let params = helpers.getQueryParams(req);
  if (req.query.username) {
    params.splice(1, 0, 'username', req.query.username);
  }
  return (
    models[params[0]]
      .get(params)
      // .tap(results => {debug(results)})
      // .tap(debug(req))
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
