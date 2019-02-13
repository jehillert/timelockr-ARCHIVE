require('dotenv').config();
const axios = require('axios');
const Promise = require('bluebird');

module.exports.createNewUser = (user, pass) => {
  return axios.post('http://localhost:3000/api/keepsafe/signup', {
      username: user,
      password: pass
    })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      if (error.statusCode === 409) {
        return {userCreated: false, message: 'Username taken.  Please select another'};
      }
    });
};

module.exports.retrieveEntries = (user) => {
  return axios.get(`http://localhost:3000/api/keepsafe/secrets?username=${user}`)
    .then((results) => results)
    .catch((error) => {
      console.log(error);
    });
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
  .catch((error) => {
    console.log(error);
  });
};
