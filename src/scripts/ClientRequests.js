require('dotenv').config();
const axios = require('axios');
const Promise = require('bluebird');
const loggers = require('../../lib/loggers');

module.exports.createNewUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signup', {
    username: user,
    password: pass
  })
    .then((response) => response)
    .catch(err => {
      console.log(err);
      if (err.statusCode === 409) {
        return {userCreated: false, message: 'Username taken.  Please select another'};
      }
    });
};

module.exports.deleteEntry = (entryId) => {
  const url = 'http://localhost:3000/api/keepsafe/secrets'
  const data = { data: { entryId: entryId } };

  return axios.delete(url, data)
    .then(results => console.log(results))
    .catch(err => console.error(err));
}

module.exports.getEntries = (user) => {
  return axios.get(`http://localhost:3000/api/keepsafe/secrets?username=${user}`)
    .then((results) => {
      results = JSON.parse(results.request.response);
      return results;
    })
    .catch(err => console.log(err) );
};

module.exports.verifyUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signin', {
    username: user,
    password: pass
  })
    .then((results) => {
      console.log(results);
      return {userAuthenticated: true, message: 'User authenticated.'};
    })
    .catch(err => console.log(err));
};

module.exports.createEntry = (entry) => {
  return axios.post('http://localhost:3000/api/keepsafe/secrets', {
    username: entry.user_id,
    creation_date: entry.creation_date,
    release_date: entry.release_date,
    secret_label: entry.secret_label,
    secret_body: entry.secret_body
  }).then((response) => response)
    .catch(err => console.error(err));
};
