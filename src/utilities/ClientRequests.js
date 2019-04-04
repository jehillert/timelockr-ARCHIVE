/* eslint-disable camelcase */
const axios = require('axios');
const Promise = require('bluebird');

// https://www.npmjs.com/package/axios
// https://flaviocopes.com/axios/

module.exports.deleteEntry = (entryId) => {
  const url = 'http://localhost:3000/api/keepsafe/entries';
  const data = { data: { entryId } };

  return axios.delete(url, data)
    .then(results => console.log(results))
    .catch(err => console.error(err));
};

module.exports.createEntry = (entry) => {
  return axios.post('http://localhost:3000/api/keepsafe/entries', {
    userId: entry.userId,
    creationDate: entry.creationDate,
    releaseDate: entry.releaseDate,
    description: entry.description,
    content: entry.content,
  }).then(response => console.log(response))
    .catch(err => console.error(err));
};

module.exports.createNewUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signup', {
    username: user,
    password: pass,
  })
    .then(response => response)
    .catch((err) => {
      if (err.statusCode === 409) {
        return { userCreated: false, message: 'Username taken.  Please select another' };
      }
      return console.log(err);
    });
};

// For a PUT request: HTTP 200 or HTTP 204 should imply 'resource updated successfully'.
module.exports.extendReleaseDate = (entryId, releaseDate) => {
  return axios.put('http://localhost:3000/api/keepsafe/entries', {
    data: { entryId, releaseDate },
  })
    .then(response => response)
    .catch((err) => {
      console.log(err);
      if (err.statusCode === 400) {
        return { userCreated: false, message: 'Failed to update/extend releaseDate' };
      }
    });
};

module.exports.getEntries = (user) => {
  return axios.get(`http://localhost:3000/api/keepsafe/entries?username=${user}`)
    .then((results) => {
      const entries = JSON.parse(results.request.response);
      return entries;
    })
    .catch(err => console.log(err));
};

module.exports.verifyUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signin', {
    username: user,
    password: pass,
  })
    .then((result) => {
      console.log(`User authenticated.\nuserId: ${result.data.userId}`);
      const authData = {
        userId: result.data.userId,
        viewState: true,
      };
      return authData;
    })
    .catch(err => console.log(err));
};