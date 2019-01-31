const rp = require('request-promise');
const errors = require('request-promise/errors');
const Promise = require('bluebird');

module.exports.retrieveSecrets = username => {
  var options = {
    uri: `http://localhost:3000/api/keepsafe/secrets/`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json'
    },
    qs: {
      username: username
    },
    json: true
  };
  // .tap(results => {console.log(results)})
  return rp(options)
    .then(results => results)
    .catch(errors.StatusCodeError, reason => {
      console.error(
        `ERROR @ function 'retrieveSecrets().'\n${reason.statusCode}`
      );
    })
    .catch(errors.RequestError, reason => {
      console.error(`ERROR @ function 'retrieveSecrets().'\n${reason.cause}`);
    });
};
