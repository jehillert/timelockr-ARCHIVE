var debug = require('debug')('TimeLocker:server:controllers');
const Promise = require('bluebird');
const models = require('./models');
const moment = require('moment');
const helpers = require('./../lib/helpers.js');

module.exports = {

  credentials: {
    get: (req, res) => getData('credentials', req, res).then(results => res.json(results)),
    put: (req, res) => updateField('credentials', req, res),
    post: (req, res) => postToTable('credentials', req, res),
    delete: (req, res) => deleteFromTable('credentials', req, res)
  },

  secrets: {
    get: (req, res) => getData('secrets', req, res)
      .then(results => helpers.filterAndFormatSecrets(results))
      .then(results => res.json(results)),
    put: (req, res) => updateField('secrets', req, res),
    post: (req, res) => postToTable('secrets', req, res),
    delete: (req, res) => deleteFromTable('secrets', req, res)
  }

};

function deleteFromTable(tableName, req, res) {
  let params = helpers.getParams(tableName, req);
  models.general.delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

// 'GET' Request Helpers
function getData(tableName, req, res) {
  let params = helpers.getParams(tableName, req);

  if (req.query.username) {
    params.splice(1, 0, 'username', req.query.username);
  }

  return models[tableName].get(params)
    // .tap(results => {debug(results)})
    .catch(error => console.error('Error', error));
}

function postToTable(tableName, req, res) {
  let params = helpers.getParams(tableName, req);
  models[tableName].post(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

function updateField(tableName, req, res) {
  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);
  let params = [tableName].concat(fields[0], values[0], fields[1], values[1]);
  models.general.put(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}