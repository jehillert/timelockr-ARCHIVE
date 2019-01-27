const debug = require('debug')('app:ClientRequests');
const rp = require('request-promise');
const errors = require('request-promise/errors');

// DEBUG ==> https://developer.ibm.com/node/2016/10/12/the-node-js-debug-module-advanced-usage/
module.exports.retrieveSecrets = (username) => {
  var options = {
    uri: `http://localhost:3000/api/keepsafe/secrets/`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json'
    },
    qs: {
        username: username
    },
    json: false
  };
  debug(options);
  return rp(options)
    .then(results => results)
    .catch(errors.StatusCodeError, reason => {
      console.error(`ERROR @ function 'retrieveSecrets().'\n${reason.statusCode}`)})
    .catch(errors.RequestError, reason => {
      console.error(`ERROR @ function 'retrieveSecrets().'\n${reason.cause}`)});
};