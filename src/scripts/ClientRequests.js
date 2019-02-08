var debug = require('debug')('client:requests');
const rp = require('request-promise');
const errors = require('request-promise/errors');
const Promise = require('bluebird');

module.exports.createNewUser = (state, props) => {
  var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/keepsafe/secrets', // uri:
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      username: this.state.username,
      password: this.state.password,
    },
    json: true
  };
  rp(options)
    .then(parsedBody => {
      debug(parsedBody);
      console.log('New user successfully created.');
    })
    .catch(error => error.console(error));
};

module.exports.retrieveEntries = username => {
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
        `ERROR @ function 'retrieveEntries().'\n${reason.statusCode}`
      );
    })
    .catch(errors.RequestError, reason => {
      console.error(`ERROR @ function 'retrieveEntries().'\n${reason.cause}`);
    });
};

module.exports.verifyUser = (username, password) => {
  console.log('CREDENTIALS -----------', username, password);
  var options = {
    method: 'POST',
    url: `http://localhost:3000/api/keepsafe/credentials`,
    headers: {
      'User-Agent': 'Request-Promise',
      'Content-Type': 'application/json'
    },
    body: {
      username: this.props.username,
      password: this.props.password
    },
    json: true
  };
  // need to add error handling for non-existant user
  return rp(options)
    .then(results => results)
    .catch(errors.StatusCodeError, reason => {
      console.error(
        `ERROR @ function 'verifyUser().'\n${reason.statusCode}`
      );
    })
    .catch(errors.RequestError, reason => {
      console.error(`ERROR @ function 'verifyUser().'\n${reason.cause}`);
    });
};

//https://stackoverflow.com/questions/18264601/how-to-send-a-correct-authorization-header-for-basic-authentication
// consider switching to htis in the future...
// module.exports.verifyUser = (user, password) => {
//   var base64encodedData = new Buffer(user + ':' + password).toString('base64');

//   requestPromise.get({
//     uri: 'https://example.org/whatever',
//     headers: {
//       'Authorization': 'Basic ' + base64encodedData
//     },
//     json: true
//   })
//   .then(function ok(jsonData) {
//     console.dir(jsonData);
//   })
//   .catch(function fail(error) {
//     // handle error
//   });
// }
// ———————————————————————————————————————————————————————————————————————————————
// module.exports.verifyUser = (username, password) => {
//   var options = {
//     url: 'http://localhost:3000/api/keepsafe/credentials',
//     headers: {
//       'User-Agent': 'Request-Promise',
//       'Content-Type': 'application/json'
//     },
//     auth: {
//       user: username,
//       pass: password
//     },
//     json: true
//   };
//   // need to add error handling for non-existant user
//   return rp(options)
//     .then(results => results)
//     .catch(errors.StatusCodeError, reason => {
//       console.error(
//         `ERROR @ function 'verifyUser().'\n${reason.statusCode}`
//       );
//     })
//     .catch(errors.RequestError, reason => {
//       console.error(`ERROR @ function 'verifyUser().'\n${reason.cause}`);
//     });
// }