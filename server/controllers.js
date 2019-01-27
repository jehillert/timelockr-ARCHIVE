var debug = require('debug')('TimeLocker:server:controllers');
const models = require('./models');
const Promise = require('bluebird');
const moment = require('moment');
// const ntpClient = Promise.promisifyAll(require('ntp-client'));

module.exports = {

  credentials: {
    get: (req, res) => getData('credentials', req, res),
    put: (req, res) => updateField('credentials', req, res),
    post: (req, res) => postToTable('credentials', req, res),
    delete: (req, res) => deleteFromTable('credentials', req, res)
  },

  secrets: {
    get: (req, res) => getData('secrets', req, res),
    put: (req, res) => updateField('secrets', req, res),
    post: (req, res) => postToTable('secrets', req, res),
    delete: (req, res) => deleteFromTable('secrets', req, res)
  }

};

function deleteFromTable(tableName, req, res) {
  let params = getParams(tableName, req);
  models.general.delete(params)
    .then(results => res.sendStatus(201))
    .catch(error => console.error('Error', error));
}

// 'GET' Request Helpers
function getData(tableName, req, res) {
  let params = getParams(tableName, req);

  if (req.query.username) {
    params.splice(1, 0, 'username', req.query.username);
  }

  debug(`username: ${req.query.username}, params: ${params}\n`);
  models[tableName].get(params)
    .then(results => res.json(results))
    .catch(error => console.error('Error', error));
}

function postToTable(tableName, req, res) {
  let params = getParams(tableName, req);
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

// HELPERS
function getParams(tableName, req) {
  fields = Object.keys(req.body);
  values = Object.keys(req.body).map(key => req.body[key]);
  return params = [tableName].concat(fields, values);
}

function getTime() {
  return ntpClient
    .getNetworkTimeAsync("time1.google.com", 123)
    .then(date => moment(date).format('YYYY-MM-DD HH:mm:ss'))
    .then(date => {
      console.log(`Retrieved current network time: ${date}`);
      return date;
    })
    .catch(error => console.error(`${error}\nNote: Error indicates that getTime() failed to retrieve internet time.`));
};
