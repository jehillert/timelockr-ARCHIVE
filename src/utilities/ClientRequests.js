/* eslint-disable camelcase */
import * as Debug from 'debug';

const axios = require('axios');

const debug = Debug('client:utilities:client-requests');

// https://www.npmjs.com/package/axios
// https://flaviocopes.com/axios/

export const deleteEntry = (entryId) => {
  const url = 'http://localhost:3000/api/keepsafe/entries';
  const data = { data: { entryId } };

  return axios.delete(url, data)
    .then(res => debug(res.data))
    .catch(err => debug(err));
};

export const createEntry = (entry) => {
  return axios.post('http://localhost:3000/api/keepsafe/entries', {
    userId: entry.userId,
    creationDate: entry.creationDate,
    releaseDate: entry.releaseDate,
    description: entry.description,
    content: entry.content,
  }).then(response => debug(response.data))
    .catch(err => debug(err));
};

export const createNewUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signup', {
    username: user,
    password: pass,
  })
    .then(response => response)
    .catch((err) => {
      if (err.statusCode === 409) {
        return { userCreated: false, message: 'Username taken.  Please select another' };
      }
      return debug(err);
    });
};

// For a PUT request: HTTP 200 or HTTP 204 should imply 'resource updated successfully'.
export const extendReleaseDate = (entryId, releaseDate) => {
  return axios.put('http://localhost:3000/api/keepsafe/entries', {
    data: { entryId, releaseDate },
  })
    .then(response => response)
    .catch((err) => {
      debug(err);
      if (err.statusCode === 400) {
        return { userCreated: false, message: 'Failed to update/extend releaseDate' };
      }
    });
};

export const getEntries = (user) => {
  return axios.get(`http://localhost:3000/api/keepsafe/entries?username=${user}`)
    .then((results) => {
      const entries = JSON.parse(results.request.response);
      return entries;
    })
    .catch(err => debug(err));
};

export const verifyUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signin', {
    username: user,
    password: pass,
  })
    .then((result) => {
      debug(`User authenticated.\nuserId: ${result.data.userId}`);
      const authData = {
        userId: result.data.userId,
        isAuthorized: true,
      };
      return authData;
    })
    .catch(err => debug(err));
};
